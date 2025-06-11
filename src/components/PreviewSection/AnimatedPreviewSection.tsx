'use client';

import s from './AnimatedPreviewSection.module.scss';
import previewStyles from '../PreviewSection/PreviewSection.module.scss';
import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useTranslations } from 'next-intl';

export enum TextPosition {
  Left = 'left',
  Right = 'right',
}

export type AnimatedPreviewSectionProps = {
  textPosition: TextPosition;
  titleText: string;
  description: string;
  more?: string;
  onButtonClick?: () => void;
  imgSrc: StaticImageData;
  blockQuote?: string;
  imgScale?: number;
};

export default function AnimatedPreviewSection({
  textPosition,
  titleText,
  description,
  more = '',
  onButtonClick,
  imgSrc,
  blockQuote = '',
  imgScale = 1,
}: AnimatedPreviewSectionProps) {
  const t = useTranslations('PreviewSection');

  // Separate animations for text and image with different delays
  const [textRef, isTextVisible] = useScrollAnimation<HTMLDivElement>({
    animationType:
      textPosition === TextPosition.Left ? 'slideInLeft' : 'slideInRight',
    delay: 200,
    threshold: 0.2,
  });

  const [imageRef, isImageVisible] = useScrollAnimation<HTMLDivElement>({
    animationType:
      textPosition === TextPosition.Left ? 'slideInRight' : 'slideInLeft',
    delay: 400,
    threshold: 0.2,
  });

  const [quoteRef, isQuoteVisible] = useScrollAnimation<HTMLHeadingElement>({
    animationType: 'fadeInDown',
    delay: 100,
    threshold: 0.3,
  });

  const textSideClass =
    textPosition === TextPosition.Left
      ? previewStyles.preview_section__main_text__order_left
      : previewStyles.preview_section__main_text__order_right;

  const imageSideClass =
    textPosition === TextPosition.Left
      ? previewStyles.preview_section__image__order_left
      : previewStyles.preview_section__image__order_right;

  return (
    <section
      className={`${previewStyles.preview_section} ${s.animated_section}`}
    >
      <div
        ref={textRef}
        className={classNames(
          previewStyles.preview_section__main_text,
          textSideClass,
          {
            [s.slideInLeft]:
              isTextVisible && textPosition === TextPosition.Left,
            [s.slideInRight]:
              isTextVisible && textPosition === TextPosition.Right,
          }
        )}
      >
        {blockQuote && (
          <h2
            ref={quoteRef}
            className={`${previewStyles.preview_section__section_quote} ${isQuoteVisible ? s.fadeInDown : ''}`}
          >
            {blockQuote}
          </h2>
        )}

        <h1 className={previewStyles.preview_section__title}>{titleText}</h1>

        <p className={previewStyles.preview_section__subtitle}>{description}</p>

        {more !== '' && (
          <button
            className={`${previewStyles.preview_section__button} ${s.hover_button}`}
            onClick={onButtonClick}
            aria-label={more}
          >
            {more}
          </button>
        )}
      </div>

      <div
        ref={imageRef}
        className={classNames(
          previewStyles.preview_section__image,
          imageSideClass,
          {
            [s.slideInRight]:
              isImageVisible && textPosition === TextPosition.Left,
            [s.slideInLeft]:
              isImageVisible && textPosition === TextPosition.Right,
          }
        )}
      >
        <Image
          src={imgSrc}
          alt={'preview image'}
          className={`${previewStyles.preview_section__image__img} ${s.hover_image}`}
          style={{ transform: `scale(${imgScale})` }}
        />
      </div>
    </section>
  );
}
