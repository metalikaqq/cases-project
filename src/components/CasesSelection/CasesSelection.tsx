'use client';

import { useEffect, useState } from 'react';
import s from './CasesSelection.module.scss';
import MainSelectionItem from '../MainSelection/components/MainSelectionItem';
import { LoadingDisplay } from '@/components/LoadingDisplay/LoadingDisplay';
import { ErrorDisplay } from '@/components/ErrorDisplay/ErrorDisplay';
import { useProducts } from '@/hooks/useProduct';
import {
  getMainProductImage,
  getLocalizedProductName,
  buildProductUrl,
} from '@/utils/productUtils';
import caseImage from '@/assets/image/thumbnail1.webp';

export default function CasesSelection() {
  const [language, setLanguage] = useState<'en' | 'uk'>('en');
  const { products, loading, error, refetch } = useProducts({
    productType: 'Cases',
  });

  useEffect(() => {
    const currentRoute = window.location.pathname;
    const pathLanguage = currentRoute.split('/')[1] as 'en' | 'uk';
    if (pathLanguage === 'en' || pathLanguage === 'uk') {
      setLanguage(pathLanguage);
    }
  }, []);

  if (loading) {
    return (
      <div className={s.selection_cases}>
        <LoadingDisplay message="Loading cases..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.selection_cases}>
        <ErrorDisplay error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className={s.selection_cases}>
      {products.length > 0 ? (
        products.map((product) => {
          const productName = getLocalizedProductName(
            product.productNames,
            language,
            product.name
          );

          const validImageSrc = getMainProductImage(product.images, caseImage);

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
          No Cases products available at the moment.
        </div>
      )}
    </div>
  );
}
