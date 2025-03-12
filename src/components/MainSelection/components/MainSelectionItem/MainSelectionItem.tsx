// MainSelectionItem.tsx
'use client';

import Image, { StaticImageData } from 'next/image';
import s from './MainSelectionItem.module.scss';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Link } from '@/navigation';

export type MainSelectionItemProps = {
  linkHref: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
  text: string;
  width?: number;
  height?: number;
};

export default function MainSelectionItem({
  linkHref,
  imageSrc,
  imageAlt,
  text,
  width = 500, // Default width
  height = 300, // Default height
}: MainSelectionItemProps) {
  const [imageRef, isImageVisible] = useIntersectionObserver();

  return (
    <Link className={s.case} href={linkHref}>
      <div
        ref={imageRef}
        className={`${s.image__container} ${isImageVisible ? s.fadeIn : ''}`}
      >
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
