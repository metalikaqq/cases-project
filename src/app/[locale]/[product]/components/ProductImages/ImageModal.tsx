'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import s from './ImageModal.module.scss';
import { validateImageUrl } from '@/utils/productUtils';
import caseImage from '@/assets/image/thumbnail1.webp'; // Fallback image

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, alt }: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset zoom and position when opening modal
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setImageLoading(true);
      setImageError(false);
    }
  }, [isOpen]);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle zoom with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.5, scale + delta), 4); // Limit scale between 0.5x and 4x
    setScale(newScale);
  };

  // Handle image drag
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  // Reset zoom and position
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div
        className={s.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
      >
        <div className={s.controls}>
          <button
            className={s.zoomButton}
            onClick={(e) => {
              e.stopPropagation();
              setScale(prev => Math.min(prev + 0.2, 4));
            }}
            aria-label="Zoom in"
          >
            <span>+</span>
          </button>
          <button
            className={s.zoomButton}
            onClick={(e) => {
              e.stopPropagation();
              setScale(prev => Math.max(prev - 0.2, 0.5));
            }}
            aria-label="Zoom out"
          >
            <span>−</span>
          </button>
          <button
            className={s.resetButton}
            onClick={(e) => {
              e.stopPropagation();
              handleResetZoom();
            }}
            aria-label="Reset zoom"
          >
            <span>↺</span>
          </button>
          <div className={s.zoomLevel}>{Math.round(scale * 100)}%</div>
          <button
            className={s.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close modal"
          >
            <span>×</span>
          </button>
        </div>

        <div className={s.imageContainer}>
          {imageLoading && (
            <div className={s.loadingIndicator}>Loading...</div>
          )}

          {imageError ? (
            <div className={s.errorMessage}>
              <span>Failed to load image</span>
            </div>
          ) : (
            <div
              className={s.zoomableContainer}
              style={{
                transform: `scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              <div
                className={s.panContainer}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`
                }}
              >
                <Image
                  src={validateImageUrl(imageUrl, caseImage)}
                  alt={alt}
                  fill
                  sizes="100vw"
                  className={s.zoomableImage}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            </div>
          )}
        </div>

        <div className={s.instructions}>
          <span>Scroll to zoom • Drag to move • Double-click to reset</span>
        </div>
      </div>
    </div>
  );
}
