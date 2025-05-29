/**
 * Utility functions for product-related operations
 * Centralizes common logic for locale handling, image validation, and API operations
 */

import { StaticImageData } from 'next/image';
import {
  Product,
  LocalizedContent,
  LocalizedNames,
  SupportedLocale,
  ImageSource,
  ProductError,
} from '@/types/product';

/**
 * Maps route locale to data locale format
 * Handles the 'ua' -> 'uk' mapping for Ukrainian content
 */
export const mapLocaleToDataFormat = (routeLocale: string): string => {
  return routeLocale === 'ua' ? 'uk' : routeLocale;
};

/**
 * Gets localized content with fallback to English
 */
export const getLocalizedContent = (
  content: LocalizedContent | undefined,
  locale: string
): string => {
  if (!content) return '';

  const dataLocale = mapLocaleToDataFormat(locale);
  return content[dataLocale] || content.en || '';
};

/**
 * Gets localized product name with multiple fallbacks
 */
export const getLocalizedProductName = (
  productNames: LocalizedNames | undefined,
  locale: string,
  fallbackName?: string
): string => {
  if (!productNames) return fallbackName || 'Default Product Name';

  const dataLocale = mapLocaleToDataFormat(locale);

  // Try current locale first, then English, then fallback name, then default
  return (
    (productNames[dataLocale] && productNames[dataLocale][0]) ||
    (productNames.en && productNames.en[0]) ||
    fallbackName ||
    'Default Product Name'
  );
};

/**
 * Validates and formats image URLs for Next.js Image component
 * Returns fallback image for invalid URLs
 */
export const validateImageUrl = (
  imageUrl: string | undefined,
  fallbackImage: StaticImageData
): ImageSource => {
  // Return fallback for null, undefined, or empty strings
  if (!imageUrl || imageUrl.trim() === '') {
    console.warn('Empty or undefined image URL, using fallback');
    return fallbackImage;
  }

  const trimmedUrl = imageUrl.trim();

  // Check for valid HTTP/HTTPS URLs
  try {
    const url = new URL(trimmedUrl);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      // Additional check for image file extensions
      const isImageUrl = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(
        url.pathname
      );
      if (isImageUrl) {
        return trimmedUrl;
      } else {
        console.warn(`URL doesn't appear to be an image: ${trimmedUrl}`);
        return fallbackImage;
      }
    }
  } catch (e) {
    // Not a valid absolute URL, continue with other checks
  }

  // Check if it's a valid relative path starting with /
  if (trimmedUrl.startsWith('/')) {
    // Validate that it looks like an image path
    const isImagePath = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(
      trimmedUrl
    );
    if (isImagePath) {
      return trimmedUrl;
    } else {
      console.warn(
        `Relative path doesn't appear to be an image: ${trimmedUrl}`
      );
      return fallbackImage;
    }
  }

  // Check for data URLs (base64 encoded images)
  if (trimmedUrl.startsWith('data:image/')) {
    return trimmedUrl;
  }

  // If it's just a filename without proper path, use fallback
  if (
    trimmedUrl &&
    !trimmedUrl.includes('/') &&
    /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(trimmedUrl)
  ) {
    console.warn(
      `Invalid image URL detected (filename only): ${trimmedUrl}, using fallback image`
    );
    return fallbackImage;
  }

  // For any other invalid format, use fallback
  console.warn(`Invalid image URL format: ${trimmedUrl}, using fallback image`);
  return fallbackImage;
};

/**
 * Gets the main image from product images with fallback
 */
export const getMainProductImage = (
  images: Product['images'] | undefined,
  fallbackImage: StaticImageData
): ImageSource => {
  if (!images || images.length === 0) return fallbackImage;

  const mainImageUrl =
    images.find((img) => img.isMain)?.imageUrl || images[0]?.imageUrl;
  return validateImageUrl(mainImageUrl, fallbackImage);
};

/**
 * Sorts product images with main image first
 */
export const sortProductImages = (
  images: Product['images']
): Product['images'] => {
  if (!images || images.length === 0) return [];

  const sortedImages = [...images];
  const mainImageIndex = sortedImages.findIndex((img) => img.isMain);

  // If we found a main image and it's not already first, move it to the front
  if (mainImageIndex > 0) {
    const mainImage = sortedImages.splice(mainImageIndex, 1)[0];
    sortedImages.unshift(mainImage);
  }

  return sortedImages;
};

/**
 * Checks if the given locale corresponds to Ukrainian
 */
export const isUkrainianLocale = (locale: string): boolean => {
  const dataLocale = mapLocaleToDataFormat(locale);
  return dataLocale === 'uk';
};

/**
 * Creates a standardized error object
 */
export const createProductError = (
  code: string,
  message: string,
  details?: any
): ProductError => ({
  code,
  message,
  details,
});

/**
 * Validates if a string is a supported locale
 */
export const isSupportedLocale = (
  locale: string
): locale is SupportedLocale => {
  return ['en', 'uk', 'ua'].includes(locale);
};

/**
 * Safely parses API response with error handling
 */
export const parseApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw createProductError(
      'API_ERROR',
      `API request failed: ${response.status} ${response.statusText}`,
      { status: response.status, statusText: response.statusText }
    );
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw createProductError(
      'PARSE_ERROR',
      'Failed to parse API response',
      error
    );
  }
};

/**
 * Builds product URL with proper slug and ID
 */
/**
 * Builds URL for product pages compatible with Next.js internationalization
 * The locale will be handled automatically by Next.js routing
 */
export const buildProductUrl = (
  productName: string,
  productId: string
): string => {
  const slugifiedName = productName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  // Return relative URL - Next.js will handle locale prefix automatically
  return `/${slugifiedName}/${productId}`;
};
