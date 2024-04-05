import Image from "next/image";
import s from "./PreviewSection.module.scss";
import deliveryImage from "@/assets/image/Case_loading_1080x.webp";
import classNames from "classnames";

export enum TextPosition {
  Left = 'left',
  Right = 'right'
}

export type PreviewSectionProps = {
  textPosition: TextPosition;
}

export default function PreviewSection({ textPosition }: PreviewSectionProps) {
  const textSideClass = textPosition === TextPosition.Left ? s.preview_section__main__text__order__left : s.preview_section__main__text__order__right;
  const imageSideClass = textPosition === TextPosition.Left ? s.preview_section__image__order__left : s.preview_section__image__order__right;

  return (
    <div className={s.preview_section}>
      <div className={classNames(s.preview_section__main__text, textSideClass)}>
        <h1 className={s.preview_section__title}>Faster & Smarter</h1>
        <span className={s.preview_section__subtitle}>
          Fiasco road cases are an ingenious transit storage system. Each case{" "}
          <br /> is meticulously designed to fit perfectly with any other. Save
          hours <br /> on your load outs.
        </span>
        <button className={s.preview_section__button}>better touring</button>
      </div>
      <Image
        src={deliveryImage}
        alt={"deliveryImage"}
        className={classNames(s.preview_section__image, imageSideClass)}
      />
    </div>
  );
}