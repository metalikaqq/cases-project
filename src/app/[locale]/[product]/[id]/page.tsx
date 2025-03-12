'use client';

import { useEffect, useState } from 'react';
import s from './page.module.scss';
import ProductImages from '../components/ProductImages/ProductImages';
import ProductScroll from '../components/ProductScroll/ProductScroll';

export default function Page({ params }: { params: { language: string, productName: string, id: string } }) {
  console.log('Page params:', params); // This will show language, productName, and id

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The ID is directly available in params
    const productId = params.id;
    console.log('Product ID:', productId);

    if (productId) {
      fetch(`http://localhost:3000/products/${productId}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch product');
          return response.json();
        })
        .then(data => {
          setProduct(data);
          console.log('Fetched product:', data);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className={s.product}>
      <ProductImages product={product} />
      <ProductScroll product={product} />
    </div>
  );
}