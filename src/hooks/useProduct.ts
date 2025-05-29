/**
 * Custom hook for product data fetching and management
 * Provides consistent product loading logic with error handling and caching
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Product,
  ProductError,
  SingleProductApiResponse,
} from '@/types/product';
import { parseApiResponse, createProductError } from '@/utils/productUtils';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: ProductError | null;
  refetch: () => void;
}

interface UseProductOptions {
  productId: string;
  locale?: string;
  baseUrl?: string;
}

export const useProduct = ({
  productId,
  locale = 'en',
  baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
}: UseProductOptions): UseProductResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ProductError | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setError(createProductError('INVALID_ID', 'Product ID is required'));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/products/${productId}`);
      const apiResponse =
        await parseApiResponse<SingleProductApiResponse>(response);

      // Check if API response is successful
      if (!apiResponse.success) {
        throw createProductError(
          'API_FAILURE',
          apiResponse.error || 'API returned unsuccessful response',
          apiResponse
        );
      }

      // Add locale information to the product data
      const productWithLocale: Product = {
        ...apiResponse.data,
        locale: locale,
      };

      setProduct(productWithLocale);
    } catch (err) {
      const productError =
        err instanceof Error
          ? createProductError('FETCH_ERROR', err.message, err)
          : createProductError(
              'UNKNOWN_ERROR',
              'An unknown error occurred',
              err
            );

      setError(productError);
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  }, [productId, locale, baseUrl]);

  const refetch = useCallback(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch,
  };
};

// Hook for fetching multiple products (used in CasesSelection)
interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: ProductError | null;
  refetch: () => void;
}

interface UseProductsOptions {
  productType?: string;
  locale?: string;
  baseUrl?: string;
}

export const useProducts = ({
  productType,
  locale = 'en',
  baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
}: UseProductsOptions = {}): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ProductError | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/products`);
      const apiResponse = await parseApiResponse<any>(response);

      // Check if API response is successful
      if (!apiResponse.success) {
        throw createProductError(
          'API_FAILURE',
          apiResponse.error || 'API returned unsuccessful response',
          apiResponse
        );
      }

      let filteredProducts = apiResponse.data;

      // Filter by product type if specified
      if (productType) {
        filteredProducts = apiResponse.data.filter(
          (product: Product) => product.productType?.name === productType
        );
      }

      setProducts(filteredProducts);
    } catch (err) {
      const productError =
        err instanceof Error
          ? createProductError('FETCH_ERROR', err.message, err)
          : createProductError(
              'UNKNOWN_ERROR',
              'An unknown error occurred',
              err
            );

      setError(productError);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [productType, baseUrl]);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch,
  };
};
