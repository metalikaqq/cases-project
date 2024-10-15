import s from "./PreviewSection.module.scss";
import classNames from "classnames";
import AnimationPreview from "./AnimationPreview";
import { useTranslations } from "next-intl";

export enum TextPosition {
  Left = "left",
  Right = "right",
}

export type PreviewSectionProps = {
  textPosition: TextPosition;
  TitleText: string;
  Description: string;
  More: string;
  onButtonClick?: () => void;
  disableButton?: boolean;
};

export default function PreviewSection({
  textPosition,
  TitleText,
  Description,
  More,
  onButtonClick,
  disableButton = false,
}: PreviewSectionProps) {
  const t = useTranslations("PreviewSection");

  const textSideClass =
    textPosition === TextPosition.Left
      ? s.preview_section__main_text__order_left
      : s.preview_section__main_text__order_right;
  const imageSideClass =
    textPosition === TextPosition.Left
      ? s.preview_section__image__order_left
      : s.preview_section__image__order_right;

  return (
    <section className={s.preview_section}>
      <div className={classNames(s.preview_section__main_text, textSideClass)}>
        <h1
          className={s.preview_section__name}
        >
          OUR STORY:
        </h1>

        <h1
          className={s.preview_section__title}
        >
          {TitleText}
        </h1>

        <p
          className={s.preview_section__subtitle}
        >
          {Description}
        </p>

        {!disableButton && (
          <button
            className={s.preview_section__button}
            onClick={onButtonClick}
            aria-label={More}
          >
            {More}
          </button>
        )}
      </div>

      <div className={classNames(s.preview_section__image, imageSideClass)}>
        <AnimationPreview />
      </div>
    </section>
  );
}
