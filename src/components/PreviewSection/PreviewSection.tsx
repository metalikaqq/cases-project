import s from './PreviewSection.module.scss';
import classNames from 'classnames';
import AnimationPreview from './AnimationPreview';
import { useTranslations } from 'next-intl';
import { StaticImageData } from 'next/image';

export enum TextPosition {
  Left = 'left',
  Right = 'right',
}

export type PreviewSectionProps = {
  textPosition: TextPosition;
  titleText: string;
  description: string;
  more?: string;
  onButtonClick?: () => void;
  imgSrc: StaticImageData;
  blockQuote?: string;
  imgScale?: number;
};

export default function PreviewSection({
  textPosition,
  titleText,
  description,
  more = "",
  onButtonClick,
  imgSrc,
  blockQuote = "",
  imgScale = 1,
}: PreviewSectionProps) {
  const t = useTranslations('PreviewSection');

  const textSideClass =
    textPosition === TextPosition.Left
      ? s.preview_section__main_text__order_left
      : s.preview_section__main_text__order_right;

  return (
    <section className={s.preview_section}>
      <div className={classNames(s.preview_section__main_text, textSideClass)}>
      {blockQuote && <h2 className={s.preview_section__section_quote}>{blockQuote}</h2>}

        <h1 className={s.preview_section__title}>{titleText}</h1>

        <p className={s.preview_section__subtitle}>{description}</p>

        {more !== "" && (
          <button
            className={s.preview_section__button}
            onClick={onButtonClick}
            aria-label={more}
          >
            {more}
          </button>
        )}
      </div>

        <AnimationPreview
          imgSrc={imgSrc}
          textPosition={textPosition}
          imgScale={imgScale}
        />
    </section>
  );
}
