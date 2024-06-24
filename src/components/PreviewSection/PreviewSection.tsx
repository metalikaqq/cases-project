import Image from "next/image";
import s from "./PreviewSection.module.scss";
import deliveryImage from "@/assets/image/Case_loading_1080x.webp";
import classNames from "classnames";
import AnimationPreview from "./AnimationPreview";
import BlueButton from "@/UI/BlueButton";
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
};

export default function PreviewSection({
  textPosition,
  TitleText,
  Description,
  More
}: PreviewSectionProps) {
  const t = useTranslations("PreviewSection");

  const textSideClass =
    textPosition === TextPosition.Left
      ? s.preview_section__main__text__order__left
      : s.preview_section__main__text__order__right;
  const imageSideClass =
    textPosition === TextPosition.Left
      ? s.preview_section__image__order__left
      : s.preview_section__image__order__right;

  return (
    <div className={s.preview_section}>
      <div className={classNames(s.preview_section__main__text, textSideClass)}>
        <h1 className={s.preview_section__title}>{TitleText}</h1>
        <span className={s.preview_section__subtitle}>{Description}</span>
        <button className={s.preview_section__button}>{More}</button>
      </div>
      <div className={classNames(s.preview_section__image, imageSideClass)}>
        <AnimationPreview />
      </div>
    </div>
  );
}
