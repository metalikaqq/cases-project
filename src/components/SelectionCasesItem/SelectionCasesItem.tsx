"use client"

import Image from 'next/image';
import s from './SelectionCasesItem.module.scss';
import caseImage from '@/assets/image/road_cases_collection_1_360x.webp';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export type SelectionCasesItemProps = {
  // props go here
};

export default function SelectionCasesItem(props: SelectionCasesItemProps) {
  const [imageRef, isImageVisible] = useIntersectionObserver();

  return (
    <div className={s.case}>
      <div
        ref={imageRef}
        className={`${s.image__container} ${isImageVisible ? s.fadeIn : ''}`}
      >
        <Image
          src={caseImage}
          alt="Road Cases"
          className={s.case__image}
        />
      </div>
      <span className={s.case__text}>ROAD CASES</span>
    </div>
  );
}
