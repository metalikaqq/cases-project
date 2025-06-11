'use client';

import s from './MainPageTitle.module.scss';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export type MainPageTitleProps = {
  titleText: string;
  subTitleText: string;
};

export default function MainPageTitle({
  titleText,
  subTitleText,
}: MainPageTitleProps) {
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({
    animationType: 'fadeInUp',
    delay: 200,
    threshold: 0.3
  });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLSpanElement>({
    animationType: 'fadeInUp',
    delay: 400,
    threshold: 0.3
  });

  return (
    <div className={s.container}>
      <h1
        ref={titleRef}
        className={`${s.title} ${isTitleVisible ? s.fadeInUp : ''}`}
      >
        {titleText}
      </h1>
      <span
        ref={subtitleRef}
        className={`${s.sub_title} ${isSubtitleVisible ? s.fadeInUp : ''}`}
      >
        {subTitleText}
      </span>
    </div>
  );
}

// Whether it&#39;s a stadium, arena or club tour, Fiasco&#39;s diverse
// range of road cases and shock racks have <br /> got you covered. Each
// piece is designed to perfectly pack and stack with the rest.
