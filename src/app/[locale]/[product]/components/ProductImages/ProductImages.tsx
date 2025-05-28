'use client';

import s from './ProductImages.module.scss';
import { useState } from 'react';
import Image from 'next/image';

interface Product {
  name?: string;
  images: { id: string; imageUrl: string; isMain?: boolean }[];
}

export default function ProductImages({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product || !product.images || product.images.length === 0) {
    return <div>Images not found</div>;
  }

  // Find the main image or default to the first image
  const mainImageIndex = product.images.findIndex(img => img.isMain) || 0;
  const sortedImages = [...product.images];

  // If we found a main image and it's not already first, move it to the front
  if (mainImageIndex > 0) {
    const mainImage = sortedImages.splice(mainImageIndex, 1)[0];
    sortedImages.unshift(mainImage);
  }

  return (
    <div className={s.product_images}>
      <div className={s.main_image}>
        {sortedImages[currentImageIndex] && (
          <Image
            src={sortedImages[currentImageIndex].imageUrl}
            alt={product.name || 'Product image'}
            width={500}
            height={500}
            layout="responsive"
            className={s.main_image__inner}
          />
        )}
      </div>

      <div className={s.thumbnails}>
        {sortedImages.map((image, index) => (
          <div
            key={image.id}
            className={`${s.thumbnail} ${currentImageIndex === index ? s.active : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image.imageUrl}
              alt={`${product.name || 'Product'} thumbnail ${index + 1}`}
              width={100}
              height={100}
              layout="responsive"
              className={s.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}