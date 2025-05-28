'use client';

import { useEffect, useState } from 'react';
import { slugify } from '@/utils/slugify';
import s from './CasesSelection.module.scss';
import MainSelectionItem from '../MainSelection/components/MainSelectionItem';

interface Image {
  id: string;
  imageUrl: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

interface Product {
  id: string;
  name: string;
  productNames: {
    uk: string[];
    en: string[];
  };
  htmlContent: {
    uk: string;
    en: string;
  };
  images: Image[];
  createdAt: string;
}

export default function CasesSelection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'uk'>('en'); // Default language

  useEffect(() => {
    // This code only runs on the client side
    const currentRoute = window.location.pathname;
    const pathLanguage = currentRoute.split('/')[1] as 'en' | 'uk';
    if (pathLanguage === 'en' || pathLanguage === 'uk') {
      setLanguage(pathLanguage);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className={s.loading}>Loading...</div>;
  if (error) return <div className={s.error}>{error}</div>;

  return (
    <div className={s.selection_cases}>
      {products.map((product) => {
        // Get the product name in the current language
        const productName = product.productNames[language]?.[0] || product.name;
        // Get the main image (or the first image if no main image is found)
        const mainImage =
          product.images.find((img) => img.isMain)?.imageUrl ||
          product.images[0]?.imageUrl;

        return (
          <MainSelectionItem
            key={product.id}
            linkHref={`/${slugify(productName)}/${product.id}`} // Include ID in the path
            imageSrc={mainImage}
            imageAlt={productName}
            text={productName}
            width={500}
            height={300}
          />
        );
      })}
    </div>
  );
}
