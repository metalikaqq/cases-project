"use client";

import Image, { StaticImageData } from "next/image";
import s from "./MainSelectionItem.module.scss";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { Link } from "@/navigation";

export type MainSelectionItemProps = {
  linkHref: string;
  imageSrc: StaticImageData; // or string if you are using external URLs
  imageAlt: string;
  text: string;
};

export default function MainSelectionItem({
  linkHref,
  imageSrc,
  imageAlt,
  text,
}: MainSelectionItemProps) {
  const [imageRef, isImageVisible] = useIntersectionObserver();

  // Add console logs for debugging
  console.log("linkHref:", linkHref);

  return (
    <Link className={s.case} href={linkHref}>
      <div
        ref={imageRef}
        className={`${s.image__container} ${isImageVisible ? s.fadeIn : ""}`}
      >
        <Image src={imageSrc} alt={imageAlt} className={s.case__image} />
      </div>
      <span className={s.case__text}>{text}</span>
    </Link>
  );
}
