import React from 'react';
import s from './Modal.module.scss';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={s.overlay} onClick={onClose} />
      <div className={s.modal}>
        <div className={s.header}>
          <h1 className={s.title}>{title}</h1>
          <button className={s.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
