'use client';

import { useTranslations } from 'next-intl';
import s from './MainSelection.module.scss';
import MainSelectionItem from './components/MainSelectionItem';
import caseImage from '@/assets/image/thumbnail1.webp';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function MainSelection() {
  const t = useTranslations('MainSelection');

  const [containerRef, isContainerVisible] = useScrollAnimation<HTMLDivElement>(
    {
      animationType: 'fadeInUp',
      delay: 200,
      threshold: 0.3,
    }
  );

  return (
    <div
      ref={containerRef}
      className={`${s.selection_cases} ${isContainerVisible ? s.animate_container : ''}`}
    >
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt={t('Cases')}
        text={t('Cases')}
        animationDelay={0}
      />
      <MainSelectionItem
        linkHref="/acoustic-systems"
        imageSrc={caseImage}
        imageAlt={t('A/C')}
        text={t('A/C')}
        animationDelay={200}
      />
    </div>
  );
}
