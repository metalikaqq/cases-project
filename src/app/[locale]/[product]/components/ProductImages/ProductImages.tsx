'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import s from './ProductImages.module.scss';
import { Product } from '@/types/product';
import { sortProductImages, validateImageUrl } from '@/utils/productUtils';
import caseImage from '@/assets/image/thumbnail1.webp'; // Fallback image

interface ProductImagesProps {
  product: Product;
}

export default function ProductImages({ product }: ProductImagesProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Minimum distance to trigger swipe
  const minSwipeDistance = 30;

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

  // Sort images or use empty array
  const sortedImages = product?.images ? sortProductImages(product.images) : [];

  // Navigation functions with animation
  const handleNextImage = useCallback(() => {
    if (sortedImages.length > 1 && !isAnimating) {
      setIsAnimating(true);
      setSwipeDirection('left');

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
        setTimeout(() => {
          setIsAnimating(false);
          setSwipeDirection(null);
        }, 100);
      }, 200);
    }
  }, [sortedImages.length, isAnimating]);

  const handlePrevImage = useCallback(() => {
    if (sortedImages.length > 1 && !isAnimating) {
      setIsAnimating(true);
      setSwipeDirection('right');

      setTimeout(() => {
        setCurrentImageIndex(
          (prev) => (prev - 1 + sortedImages.length) % sortedImages.length
        );
        setTimeout(() => {
          setIsAnimating(false);
          setSwipeDirection(null);
        }, 100);
      }, 200);
    }
  }, [sortedImages.length, isAnimating]);

  const handleImageSelect = useCallback((index: number) => {
    if (!isAnimating) {
      const direction = index > currentImageIndex ? 'left' : 'right';
      setIsAnimating(true);
      setSwipeDirection(direction);

      setTimeout(() => {
        setCurrentImageIndex(index);
        setTimeout(() => {
          setIsAnimating(false);
          setSwipeDirection(null);
        }, 100);
      }, 200);
    }
  }, [currentImageIndex, isAnimating]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isAnimating) {
        handleImageSelect(index);
      }
    }
  }, [handleImageSelect, isAnimating]);

  const handleMainImageKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrevImage();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNextImage();
    }
  }, [handlePrevImage, handleNextImage]);

  // Handle touch events for swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    // Prevent default behavior to avoid conflicts with browser scrolling
    if (sortedImages.length > 1) {
      e.preventDefault();
    }
  }, [sortedImages.length]);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || isAnimating) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && sortedImages.length > 1) {
      handleNextImage();
    }
    if (isRightSwipe && sortedImages.length > 1) {
      handlePrevImage();
    }

    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, minSwipeDistance, sortedImages.length, handleNextImage, handlePrevImage, isAnimating]);

  // Handle mouse events for drag (desktop)
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (sortedImages.length > 1) {
      setIsDragging(true);
      setMouseStart(e.clientX);
      e.preventDefault();
    }
  }, [sortedImages.length]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !mouseStart || sortedImages.length <= 1) return;

    const currentX = e.clientX;
    const distance = mouseStart - currentX;

    // Add visual feedback during drag
    e.preventDefault();
  }, [isDragging, mouseStart, sortedImages.length]);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !mouseStart || sortedImages.length <= 1 || isAnimating) {
      setIsDragging(false);
      setMouseStart(null);
      return;
    }

    const distance = mouseStart - e.clientX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }

    setIsDragging(false);
    setMouseStart(null);
  }, [isDragging, mouseStart, minSwipeDistance, sortedImages.length, handleNextImage, handlePrevImage, isAnimating]);

  const onMouseLeave = useCallback(() => {
    setIsDragging(false);
    setMouseStart(null);
  }, []);

  // Early return for no images case
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

  return (
    <div className={s.product_images}>
      {/* Main Image with swipe support */}
      <div
        className={`${s.main_image} ${isAnimating ? s.animating : ''} ${swipeDirection ? s[`swipe_${swipeDirection}`] : ''}`}
        tabIndex={0}
        onKeyDown={handleMainImageKeyPress}
        role="button"
        aria-label={
          sortedImages.length > 1
            ? 'Swipe or use arrow keys to navigate images'
            : 'Product image'
        }
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : sortedImages.length > 1 ? 'grab' : 'default' }}
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
              onClick={() => !isAnimating && handleImageSelect(index)}
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
    </div>
  );
}
