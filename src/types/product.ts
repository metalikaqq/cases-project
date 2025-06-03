/**
 * Shared types for product-related components
 * Centralizes type definitions to ensure consistency across the application
 */

import { StaticImageData } from 'next/image';

export interface ProductImage {
  id: string;
  imageUrl: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

export interface ProductType {
  id: string;
  name: string;
  description?: string;
}

export interface LocalizedContent {
  uk: string;
  en: string;
  [key: string]: string;
}

export interface LocalizedNames {
  uk: string[];
  en: string[];
  [key: string]: string[];
}

export interface Product {
  id: string;
  name: string;
  productNames: LocalizedNames;
  htmlContent: LocalizedContent;
  images: ProductImage[];
  productTypeId: string;
  productType: ProductType;
  createdAt: string;
  updatedAt?: string;
  locale?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error: string | null;
  message: string | null;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedProductData {
  data: Product[];
  pagination: PaginationInfo;
}

export interface ProductApiResponse extends ApiResponse<PaginatedProductData> {}

export interface SingleProductApiResponse extends ApiResponse<Product> {}

// Utility types for component props
export interface ProductComponentProps {
  product: Product;
}

export interface ProductPageParams {
  locale: string;
  language?: string;
  product: string; // This is the dynamic [product] segment
  id: string;
  [key: string]: any;
}

// Constants for supported locales
export const SUPPORTED_LOCALES = ['en', 'uk', 'ua'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Helper type for image sources that can be either string or StaticImageData
export type ImageSource = string | StaticImageData;

// Error types
export interface ProductError {
  code: string;
  message: string;
  details?: any;
}
