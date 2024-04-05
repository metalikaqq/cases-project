import Image from 'next/image';
import s from './SelectionCases.module.scss'
import caseImage from '@/assets/image/road_cases_collection_1_360x.webp'

export type SelectionCasesItemProps = {
  // props go here
};

export default function SelectionCasesItem(props: SelectionCasesItemProps) {
  return (
    <>
      <div className={s.case}>
        <div className={s.image__container}>
          <Image
            src={caseImage}
            alt="Road Cases"
            // width={360}
            // height={360}
            className={s.case__image}
          />
        </div>

        <span className={s.case__text}>ROAD CASES</span>
      </div>
    </>
  );
}
