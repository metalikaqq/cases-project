'use client';
import s from './page.module.scss';
import AnimatedPreviewSection, {
  TextPosition,
} from '@/components/PreviewSection/AnimatedPreviewSection';
import MainPageTitle from '@/components/Main/components/MainPageTitle';
import { useTranslations } from 'next-intl';
import PresentationalBanner from '@/components/PresentationalBanner';
import AcousticSystemSelection from '@/components/AcousticSystemSelection';
import useScrollAnimation from '@/hooks/useScrollAnimation';

// Using existing images that could represent acoustic systems
import peopleGroupImg from '@/assets/image/people-group.jpeg';
import openCaseImg from '@/assets/image/open-case.jpeg';
import casesOnFloorImg from '@/assets/image/cases-on-floor.jpg';
import headBanner from '@/assets/image/about-us-head-banner.jpg';
import FeatureSection from '@/components/FeatureSection';
import {
  MoneyIcon,
  RecycleIcon,
  SafetyIcon,
  TruckIcon,
} from '@/components/FeatureSection/FeatureIcons';

function AcousticSystemsPage() {
  const t = useTranslations('AcousticSystemsPage');

  const [sectionsRef, isSectionsVisible] = useScrollAnimation<HTMLDivElement>({
    animationType: 'fadeInUp',
    delay: 100,
    threshold: 0.1,
  });

  const [featuresRef, isFeaturesVisible] = useScrollAnimation<HTMLDivElement>({
    animationType: 'fadeInUp',
    delay: 200,
    threshold: 0.1,
  });

  return (
    <>
      <div className={s.presentation_wrapper}>
        <PresentationalBanner
          imgSrc={headBanner}
          title={t('BannerTitle')}
          subtitle={t('BannerSubtitle')}
          subtitleAsButton
        />
      </div>

      <div className={s.acoustic_systems_page}>
        <MainPageTitle
          titleText={t('1SectionTitle')}
          subTitleText={t('1SectionDescription')}
        />

        <div
          ref={sectionsRef}
          className={`${s.acoustic_systems_page__sections} ${isSectionsVisible ? s.animate_sections : ''}`}
        >
          <AnimatedPreviewSection
            blockQuote={t('1BlockQuote')}
            imgSrc={peopleGroupImg}
            titleText={t('1BlockTitle')}
            description={t('1BlockDescription')}
            textPosition={TextPosition.Left}
          />

          <AnimatedPreviewSection
            blockQuote={t('2BlockQuote')}
            imgSrc={openCaseImg}
            titleText={t('2BlockTitle')}
            description={t('2BlockDescription')}
            textPosition={TextPosition.Right}
          />

          <AnimatedPreviewSection
            blockQuote={t('3BlockQuote')}
            imgSrc={casesOnFloorImg}
            titleText={t('3BlockTitle')}
            description={t('3BlockDescription')}
            textPosition={TextPosition.Left}
          />
        </div>

        <div
          ref={featuresRef}
          className={`${isFeaturesVisible ? s.animate_features : ''}`}
        >
          <h1 className={s.acoustic_systems_page__title}>
            {t('FeatureTitle')}
          </h1>

          <FeatureSection
            items={[
              {
                icon: <TruckIcon />,
                title: t('FasterLoadsTitle'),
                description: t('FasterLoadsDescription'),
              },
              {
                icon: <MoneyIcon />,
                title: t('SaveMoneyTitle'),
                description: t('SaveMoneyDescription'),
              },
              {
                icon: <SafetyIcon />,
                title: t('HealthAndSafetyTitle'),
                description: t('HealthAndSafetyDescription'),
              },
              {
                icon: <RecycleIcon />,
                title: t('MultiUseTitle'),
                description: t('MultiUseDescription'),
              },
            ]}
          />
        </div>

        <AcousticSystemSelection />
      </div>
    </>
  );
}

export default AcousticSystemsPage;
