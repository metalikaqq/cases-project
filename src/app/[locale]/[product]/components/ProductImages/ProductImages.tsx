'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import s from './ProductImages.module.scss';
import { Product } from '@/types/product';
import { sortProductImages, validateImageUrl } from '@/utils/productUtils';
import caseImage from '@/assets/image/thumbnail1.webp'; // Fallback image
import ImageModal from './ImageModal';

interface ProductImagesProps {
  product: Product;
}

export default function ProductImages({ product }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle image loading errors
  const handleImageError = useCallback((imageUrl: string) => {
    console.warn(`Failed to load image: ${imageUrl}`);
    setImageErrors((prev) => new Set(prev).add(imageUrl));
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageUrl);
      return newSet;
    });
  }, []);

  // Handle image load start
  const handleImageLoadStart = useCallback((imageUrl: string) => {
    setImageLoading((prev) => new Set(prev).add(imageUrl));
  }, []);

  // Handle image load complete
  const handleImageLoadComplete = useCallback((imageUrl: string) => {
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageUrl);
      return newSet;
    });
  }, []);

  // Get image source with error handling
  const getImageSrc = useCallback(
    (imageUrl: string) => {
      if (imageErrors.has(imageUrl)) {
        return caseImage;
      }
      return validateImageUrl(imageUrl, caseImage);
    },
    [imageErrors]
  );

  // Handle zoom on main image click
  const handleMainImageClick = useCallback((e: React.MouseEvent) => {
    // Prevent click from triggering other events
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  // Handle modal close
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (!product || !product.images || product.images.length === 0) {
    return (
      <div className={s.product_images}>
        <div className={s.main_image}>
          <Image
            src={caseImage}
            alt={product?.name || 'Product image'}
            fill
            className={s.main_image__inner}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 500px"
          />
        </div>
        <div className={s.no_images}>No additional images available</div>
      </div>
    );
  }

  // Sort images with main image first using utility function
  const sortedImages = sortProductImages(product.images);

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleImageSelect(index);
    }
  };

  const handleNextImage = () => {
    if (sortedImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
    }
  };

  const handlePrevImage = () => {
    if (sortedImages.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + sortedImages.length) % sortedImages.length
      );
    }
  };

  const handleMainImageKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrevImage();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNextImage();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsModalOpen(true);
    }
  };

  // Get current image URL
  const currentImageUrl = sortedImages[currentImageIndex]?.imageUrl || '';

  return (
    <div className={s.product_images}>
      {/* Main Image with click to zoom */}
      <div
        className={s.main_image}
        tabIndex={0}
        onKeyDown={handleMainImageKeyPress}
        role="button"
        aria-label={
          sortedImages.length > 1
            ? 'Click to zoom. Use arrow keys to navigate images'
            : 'Click to zoom image'
        }
        onClick={handleMainImageClick}
      >
        {sortedImages[currentImageIndex] && (
          <>
            {imageLoading.has(sortedImages[currentImageIndex].imageUrl) && (
              <div className={s.image_loading}>Loading...</div>
            )}
            <Image
              src={getImageSrc(sortedImages[currentImageIndex].imageUrl)}
              alt={product.name || 'Product image'}
              fill
              className={s.main_image__inner}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 500px"
              onError={() =>
                handleImageError(sortedImages[currentImageIndex].imageUrl)
              }
              onLoadStart={() =>
                handleImageLoadStart(sortedImages[currentImageIndex].imageUrl)
              }
              onLoad={() =>
                handleImageLoadComplete(
                  sortedImages[currentImageIndex].imageUrl
                )
              }
            />

            {/* Zoom indicator */}
            <div className={s.zoom_indicator}>
              <span className={s.zoom_icon}>🔍</span>
              <span className={s.zoom_text}>Click to zoom</span>
            </div>

            {/* Navigation arrows for multiple images */}
            {sortedImages.length > 1 && (
              <>
                <button
                  className={`${s.nav_arrow} ${s.nav_arrow_left}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering zoom
                    handlePrevImage();
                  }}
                  aria-label="Previous image"
                  type="button"
                >
                  ‹
                </button>
                <button
                  className={`${s.nav_arrow} ${s.nav_arrow_right}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering zoom
                    handleNextImage();
                  }}
                  aria-label="Next image"
                  type="button"
                >
                  ›
                </button>

                {/* Image counter */}
                <div className={s.image_counter}>
                  {currentImageIndex + 1} / {sortedImages.length}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div className={s.thumbnails}>
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              className={`${s.thumbnail} ${currentImageIndex === index ? s.active : ''}`}
              onClick={() => handleImageSelect(index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              tabIndex={0}
              role="button"
              aria-label={`View image ${index + 1} of ${sortedImages.length}`}
            >
              <div className={s.thumbnail_image}>
                {imageLoading.has(image.imageUrl) && (
                  <div className={s.thumbnail_loading}></div>
                )}
                <Image
                  src={getImageSrc(image.imageUrl)}
                  alt={`${product.name || 'Product'} thumbnail ${index + 1}`}
                  fill
                  className={s.image}
                  sizes="90px"
                  onError={() => handleImageError(image.imageUrl)}
                  onLoadStart={() => handleImageLoadStart(image.imageUrl)}
                  onLoad={() => handleImageLoadComplete(image.imageUrl)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal for zooming */}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          imageUrl={currentImageUrl}
          alt={product.name || 'Product image'}
        />
      )}
    </div>
  );
}
