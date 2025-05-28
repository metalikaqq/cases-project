'use client';

import { useState, useEffect } from 'react';
import s from './ProductScroll.module.scss';
import Modal from '@/UI/Modal';
import EmailForm from '@/components/EmailForm';

interface Product {
  locale?: string;
  htmlContent?: { [key: string]: string };
  productNames?: { [key: string]: string[] };
  name?: string;
}

export default function ProductScroll({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Додаємо useEffect для кращого відстеження props
  useEffect(() => {
    console.log('ProductScroll received product:', product);
    console.log('ProductScroll product locale:', product?.locale);
    console.log('ProductScroll available HTML content locales:',
      product?.htmlContent ? Object.keys(product.htmlContent) : 'none');
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Map locale from route to product data format
  // If locale is 'ua' in route, we need to use 'uk' in product data
  const routeLocale = product.locale || 'en';
  const dataLocale = routeLocale === 'ua' ? 'uk' : routeLocale;

  // Get the correct locale version of content with fallback to English
  const localizedContent = product.htmlContent?.[dataLocale] || product.htmlContent?.en || '';

  // Get product name based on locale with fallback
  const productNames = product.productNames || {};
  const productName = (productNames[dataLocale] && productNames[dataLocale][0]) ||
    (productNames.en && productNames.en[0]) ||
    product.name ||
    'Default Product Name';

  console.log('ProductScroll - Using locale:', routeLocale, 'mapped to:', dataLocale);
  console.log('ProductScroll - Content:', localizedContent ? 'available' : 'missing');
  console.log('ProductScroll - Selected content language:', dataLocale);

  // Determine if we're showing Ukrainian content
  const isUkrainian = dataLocale === 'uk';

  return (
    <div className={s.productScroll}>
      {/* Додано маркер для візуальної перевірки
      <div style={{ padding: '5px', background: '#f0f0f0', color: 'black', fontSize: '12px' }}>
        Current locale: {routeLocale} → Data locale: {dataLocale}
      </div> */}

      <div className={s.productContent}>
        <div />

        <div className={s.productTitle}>{productName}</div>

        <div className={s.divider} />

        <div
          className={s.productDescription}
          dangerouslySetInnerHTML={{ __html: localizedContent }}
        />
      </div>

      <div className={s.productButtons}>
        <a
          href="https://cdn.shopify.com/s/files/1/0664/4275/6332/files/24X30CASEV5.00A4_1.pdf?v=1664743615"
          className={s.link}
        >
          {isUkrainian ? 'Завантажити PDF' : 'Download PDF'}
        </a>

        <button onClick={openModal} className={s.button__blue}>
          {isUkrainian ? 'Зв\'язатися з нами' : 'Contact Us'}
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EmailForm selectedValue={productName} />
        </Modal>

        <button className={s.accordion}>
          {isUkrainian ? 'Характеристики' : 'Specifications'}
        </button>
        <button className={s.accordion}>
          {isUkrainian ? 'Інформація про доставку' : 'Shipping Info'}
        </button>
        <div className={s.social}>
          <a href="#" className={s.share}>
            {isUkrainian ? 'Поширити' : 'Share'}
          </a>
          <a href="#" className={s.pin}>
            {isUkrainian ? 'Закріпити' : 'Pin'}
          </a>
        </div>
      </div>
    </div>
  );
}