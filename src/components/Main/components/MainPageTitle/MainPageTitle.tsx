"use client";

import s from './MainPageTitle.module.scss';
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export type MainPageTitleProps = {
  titleText: string;
  subTitleText: string;
};

export default function MainPageTitle({ titleText, subTitleText }: MainPageTitleProps) {

  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <div ref={elementRef} className={`${s.container} ${isVisible ? s.fadeIn : ""}`}>
      <h1 className={s.title}>{titleText}</h1>
      <span className={s.sub_title}>{subTitleText}</span>
    </div>
  );
}

// Whether it&#39;s a stadium, arena or club tour, Fiasco&#39;s diverse
// range of road cases and shock racks have <br /> got you covered. Each
// piece is designed to perfectly pack and stack with the rest.