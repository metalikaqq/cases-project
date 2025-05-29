'use client';

import { useEffect } from 'react';
import s from './page.module.scss';
import ProductImages from '../components/ProductImages/ProductImages';
import ProductScroll from '../components/ProductScroll/ProductScroll';
import { LoadingDisplay } from '@/components/LoadingDisplay/LoadingDisplay';
import { ErrorDisplay } from '@/components/ErrorDisplay/ErrorDisplay';
import { useProduct } from '@/hooks/useProduct';
import { ProductPageParams } from '@/types/product';

interface PageProps {
  params: ProductPageParams;
}

export default function Page({ params }: PageProps) {
  const productId = params.id;
  const productSlug = params.product; // The dynamic [product] segment
  const locale = params.locale || params.language || 'en';

  console.log('Page params:', params);
  console.log(
    'Product ID:',
    productId,
    'Product slug:',
    productSlug,
    'Locale from params:',
    locale
  );

  // Use custom hook for product fetching
  const { product, loading, error, refetch } = useProduct({
    productId,
    locale,
  });

  // Debug logging
  useEffect(() => {
    if (product) {
      console.log('Fetched product with locale:', product);
    }
  }, [product]);

  if (loading) {
    return (
      <div className={s.product}>
        <LoadingDisplay message="Loading product..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.product}>
        <ErrorDisplay error={error} onRetry={refetch} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={s.product}>
        <ErrorDisplay error="Product not found" onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={s.product}>
      <ProductImages product={product} />
      <ProductScroll product={product} />
    </div>
  );
}
