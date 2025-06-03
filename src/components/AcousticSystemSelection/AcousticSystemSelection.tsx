'use client';

import { useEffect, useState } from 'react';
import s from './AcousticSystemSelection.module.scss';
import MainSelectionItem from '../MainSelection/components/MainSelectionItem';
import { LoadingDisplay } from '@/components/LoadingDisplay/LoadingDisplay';
import { ErrorDisplay } from '@/components/ErrorDisplay/ErrorDisplay';
import { useProducts } from '@/hooks/useProduct';
import {
  getMainProductImage,
  getLocalizedProductName,
  buildProductUrl,
} from '@/utils/productUtils';
import acousticSystemImage from '@/assets/image/thumbnail3.webp'; // Fallback image for acoustic systems

export default function AcousticSystemSelection() {
  const [language, setLanguage] = useState<'en' | 'uk'>('en'); // Default language

  // Use custom hook for fetching products filtered by "Acoustic System" type
  const { products, loading, error, refetch } = useProducts({
    productType: 'Acoustic System',
  });

  useEffect(() => {
    // This code only runs on the client side
    const currentRoute = window.location.pathname;
    const pathLanguage = currentRoute.split('/')[1] as 'en' | 'uk';
    if (pathLanguage === 'en' || pathLanguage === 'uk') {
      setLanguage(pathLanguage);
    }
  }, []);

  if (loading) {
    return (
      <div className={s.selection_acoustic_systems}>
        <LoadingDisplay message="Loading acoustic systems..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.selection_acoustic_systems}>
        <ErrorDisplay error={error} onRetry={refetch} />
      </div>
    );
  }

  console.log('Filtered Acoustic Systems for rendering:', products);

  return (
    <div className={s.selection_acoustic_systems}>
      {products.length > 0 ? (
        products.map((product) => {
          // Get the product name in the current language using utility function
          const productName = getLocalizedProductName(
            product.productNames,
            language,
            product.name
          );

          // Get main image with validation and fallback
          const validImageSrc = getMainProductImage(product.images, acousticSystemImage);

          // Build product URL with proper slug (Next.js handles locale automatically)
          const productUrl = buildProductUrl(productName, product.id);

          return (
            <MainSelectionItem
              key={product.id}
              linkHref={productUrl}
              imageSrc={validImageSrc}
              imageAlt={productName}
              text={productName}
              width={500}
              height={300}
            />
          );
        })
      ) : (
        <div className={s.no_products}>
          No Acoustic System products available at the moment.
        </div>
      )}
    </div>
  );
}
