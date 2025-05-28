'use client';

import { useEffect, useState } from 'react';
import s from './page.module.scss';
import ProductImages from '../components/ProductImages/ProductImages';
import ProductScroll from '../components/ProductScroll/ProductScroll';

export default function Page({
  params,
}: {
  params: {
    [x: string]: any; language: any; productName: string; id: string
  };
}) {
  console.log('Page params:', params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Перевіряємо, чи params.locale або params.language доступні
    // Ваші логи показують, що ви використовуєте params.locale
    const productId = params.id;
    const locale = params.locale || params.language || 'en';

    console.log('Product ID:', productId, 'Locale from params:', locale);

    if (productId) {
      fetch(`http://localhost:3000/products/${productId}`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch product');
          return response.json();
        })
        .then((data) => {
          // Add locale information to the product data
          const productWithLocale = {
            ...data,
            locale: locale // Використовуємо locale з params
          };
          setProduct(productWithLocale);
          console.log('Fetched product with locale:', productWithLocale);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params]); // Залежність від всього params об'єкта

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className={s.product}>
      <ProductImages product={product} />
      <ProductScroll product={product} />
    </div>
  );
}