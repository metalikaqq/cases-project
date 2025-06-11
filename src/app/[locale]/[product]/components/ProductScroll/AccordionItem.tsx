import React from 'react';
import s from './ProductScroll.module.scss';

interface AccordionItemProps {
  title: string;
  isActive: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isActive,
  onToggle,
  children,
}) => {
  return (
    <div>
      <button
        className={`${s.accordion} ${isActive ? s.active : ''}`}
        type="button"
        onClick={onToggle}
      >
        {title}
      </button>
      <div className={`${s.accordionContent} ${isActive ? s.open : ''}`}>
        <div className={s.accordionInner}>{children}</div>
      </div>
    </div>
  );
};
