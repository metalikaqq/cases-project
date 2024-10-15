"use client";
import s from './AnimationPreview.module.scss';
import previewSection from '../PreviewSection.module.scss';
import Image from "next/image";

import deliveryImage from "@/assets/image/Case_loading_1080x.webp";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export type AnimationPreviewProps = {
};
export default function AnimationPreview(props: AnimationPreviewProps) {
  const [imageRef, isImageVisible] = useIntersectionObserver();


  return (
    <div
      ref={imageRef}
      className={`${s.image__container} ${isImageVisible ? s.fadeIn : ''}`}
    >
      <Image
        src={deliveryImage}
        alt={"deliveryImage"}
        style={{
          width: "100%"
        }}
        className={`${previewSection.preview_section__image}`}
      />
    </div>
  );
}
