'use client';
import s from './page.module.scss';
import AnimatedPreviewSection, { TextPosition } from '@/components/PreviewSection/AnimatedPreviewSection';
import MainPageTitle from '@/components/Main/components/MainPageTitle';
import { useTranslations } from 'next-intl';
import MainSelection from '@/components/MainSelection';
import PresentationalBanner from '@/components/PresentationalBanner';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/navigation';
import useScrollAnimation from '@/hooks/useScrollAnimation';

import casesLoadingImg from '@/assets/image/cases-loading-wide.jpeg';
import caseDrillingImg from '@/assets/image/case-drilling.jpeg';
import peopleGroupImg from '@/assets/image/people-group.jpeg';

import mainBannerImg from '@/assets/image/main-head-banner.png';

export default function Home() {
  const t = useTranslations('MainPageTitle');
  const t2 = useTranslations('PreviewSection');
  const { user, isAuthenticated } = useAuth();

  const [sectionsRef, isSectionsVisible] = useScrollAnimation<HTMLDivElement>({
    animationType: 'fadeInUp',
    delay: 100,
    threshold: 0.1
  });

  return (
    <>
      <div className={s.presentation_wrapper}>
        <PresentationalBanner
          imgSrc={mainBannerImg}
          title="BETTER TOURING"
          subtitle="THINK OUTSIDE THE BOX"
          topIndent={40}
          subtitleAsButton
        />
      </div>

      <main className={s.main}>
        <MainPageTitle titleText={t('Title')} subTitleText={t('SubTitle')} />

        <MainSelection />

        <div
          ref={sectionsRef}
          className={`${s.main__sections} ${isSectionsVisible ? s.animate_sections : ''}`}
        >
          <AnimatedPreviewSection
            titleText={t2('1Title')}
            description={t2('2Description')}
            textPosition={TextPosition.Left}
            more={t2('1Section')}
            imgSrc={casesLoadingImg}
          />
          <AnimatedPreviewSection
            titleText={t2('2Title')}
            description={t2('2Description')}
            textPosition={TextPosition.Right}
            more={t2('2Section')}
            imgSrc={caseDrillingImg}
          />
          <AnimatedPreviewSection
            titleText={t2('3Title')}
            description={t2('3Description')}
            textPosition={TextPosition.Left}
            more={t2('3Section')}
            imgSrc={peopleGroupImg}
          />
        </div>
      </main>
    </>
  );
}
