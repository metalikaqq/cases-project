'use client';

import { useState, useEffect } from 'react';
import s from './ProductScroll.module.scss';
import Modal from '@/UI/Modal';
import ContactForm from '@/components/ContactForm';
import { Product } from '@/types/product';
import {
  getLocalizedContent,
  getLocalizedProductName,
  isUkrainianLocale,
} from '@/utils/productUtils';
import { prepareHtmlContent } from '@/utils/htmlUtils';

// Import new components
import { AccordionItem } from './AccordionItem';
import { SpecificationsSection } from './SpecificationsSection';
import { ShippingSection } from './ShippingSection';
import { SocialShare } from './SocialShare';

interface ProductScrollProps {
  product: Product;
}

export default function ProductScroll({ product }: ProductScrollProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Log product data for debugging
  useEffect(() => {
    console.log('ProductScroll received product:', product);
    // console.log('ProductScroll product locale:', product?.locale);
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
  const productName = getLocalizedProductName(
    product.productNames,
    locale,
    product.name
  );
  const processedContent = localizedContent
    ? prepareHtmlContent(localizedContent, productName)
    : null;
  const isUkrainian = isUkrainianLocale(locale);

  console.log('ProductScroll - Using locale:', locale);
  console.log(
    'ProductScroll - Content:',
    localizedContent ? 'available' : 'missing'
  );
  console.log('ProductScroll - Selected content language:', locale);

  return (
    <div className={s.productScroll}>
      <div className={s.productContent}>
        <div />

        <div className={s.productTitle}>{productName}</div>

        <div className={s.divider} />

        {processedContent ? (
          <div
            className={s.productDescription}
            dangerouslySetInnerHTML={{
              __html: processedContent,
            }}
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
          {isUkrainian
            ? 'Завантажити специфікацію продукту'
            : 'Download Product Spec Sheet'}
        </a>

        <button onClick={openModal} className={s.button__blue} type="button">
          {isUkrainian ? "Зв'язатися з нами" : 'Contact Us For A Quote'}
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ContactForm
            locale={locale}
            productName={productName}
            onClose={closeModal}
          />
        </Modal>

        <AccordionItem
          title={isUkrainian ? 'Характеристики' : 'Specifications'}
          isActive={activeAccordion === 'specifications'}
          onToggle={() => toggleAccordion('specifications')}
        >
          <SpecificationsSection isUkrainian={isUkrainian} />
        </AccordionItem>

        <AccordionItem
          title={
            isUkrainian ? 'Інформація про доставку' : 'Shipping Information'
          }
          isActive={activeAccordion === 'shipping'}
          onToggle={() => toggleAccordion('shipping')}
        >
          <ShippingSection isUkrainian={isUkrainian} />
        </AccordionItem>

        {/* <SocialShare isUkrainian={isUkrainian} /> */}
      </div>
    </div>
  );
}
