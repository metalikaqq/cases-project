import React from 'react';
import s from './ProductScroll.module.scss';
import Modal from '@/UI/Modal';
import ContactForm from '@/components/ContactForm';

interface ProductActionsProps {
  isUkrainian: boolean;
  locale: string;
  productName: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  isUkrainian,
  locale,
  productName,
  isModalOpen,
  openModal,
  closeModal
}) => {
  return (
    <>
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
        {isUkrainian
          ? "Зв'язатися для отримання котирування"
          : 'Contact Us For A Quote'}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm
          locale={locale}
          productName={productName}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};
