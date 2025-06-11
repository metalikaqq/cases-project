// MainSelectionItem.tsx
'use client';

import Image, { StaticImageData } from 'next/image';
import s from './MainSelectionItem.module.scss';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { Link } from '@/navigation';
import { MainSelectionItemProps } from './SelectionItemType';

export default function MainSelectionItem({
  linkHref,
  imageSrc,
  imageAlt,
  text,
  width = 500,
  height = 300,
  animationDelay = 0,
}: MainSelectionItemProps) {
  const [itemRef, isItemVisible] = useScrollAnimation<HTMLAnchorElement>({
    animationType: 'scaleIn',
    delay: animationDelay,
    threshold: 0.2
  });

  return (
    <Link
      ref={itemRef}
      className={`${s.case} ${isItemVisible ? s.scaleIn : ''}`}
      href={linkHref}
    >
      <div className={`${s.image__container} ${s.hover_container}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          className={s.case__image}
          width={width}
          height={height}
          priority={false}
          loading="lazy"
        />
      </div>
      <span className={s.case__text}>{text}</span>
    </Link>
  );
}
