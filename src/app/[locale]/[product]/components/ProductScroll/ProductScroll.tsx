'use client';

import { useState, useEffect } from 'react';
import s from './ProductScroll.module.scss';
import Modal from '@/UI/Modal';
import EmailForm from '@/components/EmailForm';
import { Product } from '@/types/product';
import {
  getLocalizedContent,
  getLocalizedProductName,
  isUkrainianLocale
} from '@/utils/productUtils';

interface ProductScrollProps {
  product: Product;
}

export default function ProductScroll({ product }: ProductScrollProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Log product data for debugging
  useEffect(() => {
    console.log('ProductScroll received product:', product);
    console.log('ProductScroll product locale:', product?.locale);
    console.log(
      'ProductScroll available HTML content locales:',
      product?.htmlContent ? Object.keys(product.htmlContent) : 'none'
    );
  }, [product]);

  if (!product) {
    return (
      <div className={s.productScroll}>
        <div className={s.error}>Product not found</div>
      </div>
    );
  }

  const locale = product.locale || 'en';

  // Get localized content using utility functions
  const localizedContent = getLocalizedContent(product.htmlContent, locale);
  const productName = getLocalizedProductName(product.productNames, locale, product.name);
  const isUkrainian = isUkrainianLocale(locale);

  console.log('ProductScroll - Using locale:', locale);
  console.log('ProductScroll - Content:', localizedContent ? 'available' : 'missing');
  console.log('ProductScroll - Selected content language:', locale);

  return (
    <div className={s.productScroll}>
      <div className={s.productContent}>
        <div />

        <div className={s.productTitle}>{productName}</div>

        <div className={s.divider} />

        {localizedContent ? (
          <div
            className={s.productDescription}
            dangerouslySetInnerHTML={{ __html: localizedContent }}
          />
        ) : (
          <div className={s.noContent}>
            {isUkrainian ? 'Контент недоступний' : 'Content not available'}
          </div>
        )}
      </div>

      <div className={s.productButtons}>
        <a
          href="https://cdn.shopify.com/s/files/1/0664/4275/6332/files/24X30CASEV5.00A4_1.pdf?v=1664743615"
          className={s.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isUkrainian ? 'Завантажити PDF' : 'Download PDF'}
        </a>

        <button
          onClick={openModal}
          className={s.button__blue}
          type="button"
        >
          {isUkrainian ? "Зв'язатися з нами" : 'Contact Us'}
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EmailForm selectedValue={productName} />
        </Modal>

        <button
          className={s.accordion}
          type="button"
        >
          {isUkrainian ? 'Характеристики' : 'Specifications'}
        </button>
        <button
          className={s.accordion}
          type="button"
        >
          {isUkrainian ? 'Інформація про доставку' : 'Shipping Info'}
        </button>

        <div className={s.social}>
          <a
            href="#"
            className={s.share}
            onClick={(e) => e.preventDefault()}
          >
            {isUkrainian ? 'Поширити' : 'Share'}
          </a>
          <a
            href="#"
            className={s.pin}
            onClick={(e) => e.preventDefault()}
          >
            {isUkrainian ? 'Закріпити' : 'Pin'}
          </a>
        </div>
      </div>
    </div>
  );
}
