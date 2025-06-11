import React from 'react';
import s from './ProductScroll.module.scss';

interface ShippingSectionProps {
  isUkrainian: boolean;
}

export const ShippingSection: React.FC<ShippingSectionProps> = ({
  isUkrainian,
}) => {
  return (
    <>
      {isUkrainian ? (
        <>
          <div className={s.shippingGrid}>
            <div className={s.shippingCard}>
              <h4>Стандартна доставка</h4>
              <p>
                5-7 робочих днів
                <br />
                Безкоштовно від 500€
              </p>
            </div>
            <div className={s.shippingCard}>
              <h4>Експрес доставка</h4>
              <p>
                2-3 робочих дні
                <br />
                Додаткова плата 50€
              </p>
            </div>
            <div className={s.shippingCard}>
              <h4>Міжнародна доставка</h4>
              <p>
                10-15 робочих днів
                <br />
                Розрахунок індивідуально
              </p>
            </div>
            <div className={s.shippingCard}>
              <h4>Самовивіз</h4>
              <p>
                Можливий з наших складів
                <br />
                Безкоштовно
              </p>
            </div>
          </div>

          <h3>Умови упаковки</h3>
          <ul>
            <li>Професійна упаковка для захисту від пошкоджень</li>
            <li>Відстеження посилки в режимі реального часу</li>
            <li>Страхування на повну вартість товару</li>
            <li>Спеціальна упаковка для хрупких предметів</li>
          </ul>

          <div className={s.highlight}>
            <p>Гарантуємо безпечну доставку у будь-яку точку світу</p>
          </div>
        </>
      ) : (
        <>
          <div className={s.shippingGrid}>
            <div className={s.shippingCard}>
              <h4>Standard Shipping</h4>
              <p>
                5-7 business days
                <br />
                Free over $500
              </p>
            </div>
            <div className={s.shippingCard}>
              <h4>Express Shipping</h4>
              <p>
                2-3 business days
                <br />
                Additional $50 fee
              </p>
            </div>
            <div className={s.shippingCard}>
              <h4>International Shipping</h4>
              <p>
                10-15 business days
                <br />
                Calculated individually
              </p>
            </div>
            <div className={s.shippingCard}>
              <h4>Pick-up</h4>
              <p>
                Available from our warehouses
                <br />
                Free of charge
              </p>
            </div>
          </div>

          <h3>Packaging Details</h3>
          <ul>
            <li>Professional packaging for damage protection</li>
            <li>Real-time package tracking</li>
            <li>Full value insurance coverage</li>
            <li>Special packaging for fragile items</li>
          </ul>

          <div className={s.highlight}>
            <p>We guarantee safe delivery worldwide</p>
          </div>
        </>
      )}
    </>
  );
};
