'use client';
import s from './AnimationPreview.module.scss';
import previewSection from '../PreviewSection.module.scss';
import Image, { StaticImageData } from 'next/image';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { TextPosition } from '../PreviewSection';

export type AnimationPreviewProps = {
  imgSrc: StaticImageData;
  textPosition: TextPosition;
  imgScale?: number;
};

export default function AnimationPreview({
  imgSrc,
  textPosition,
  imgScale = 1,
}: AnimationPreviewProps) {
  const [imageRef, isImageVisible] = useIntersectionObserver();

const imageSideClass =
  textPosition === TextPosition.Left
    ? previewSection.preview_section__image__order_left
    : previewSection.preview_section__image__order_right;

  return (
    <div
      ref={imageRef}
      className={`${previewSection.preview_section__image} ${isImageVisible ? s.fadeIn : ''} ${imageSideClass}`}
    >
      <Image
        src={imgSrc}
        alt={'deliveryImage'}
        className={`${previewSection.preview_section__image__img}`}
        style={{ transform: `scale(${imgScale})`, }}
      />
    </div>
  );
}
