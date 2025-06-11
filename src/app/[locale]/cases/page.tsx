'use client';
import s from './page.module.scss';
import AnimatedPreviewSection, {
  TextPosition,
} from '@/components/PreviewSection/AnimatedPreviewSection';
import MainPageTitle from '@/components/Main/components/MainPageTitle';
import { useTranslations } from 'next-intl';
import CasesSelection from '@/components/CasesSelection';
import PresentationalBanner from '@/components/PresentationalBanner';
import FeatureSection from '@/components/FeatureSection';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import {
  TruckIcon,
  MoneyIcon,
  SafetyIcon,
  RecycleIcon,
} from '@/components/FeatureSection/FeatureIcons';
import casesWithMetricsImg from '@/assets/image/cases-with-metrics.jpg';
import casesVarietyGif from '@/assets/image/cases-variety.gif';
import caseDrillingImg from '@/assets/image/case-drilling.jpeg';
import headBanner from '@/assets/image/about-us-head-banner.jpg';

function Page() {
  const t = useTranslations('CasesPage');

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

      <div className={s.cases_page}>
        <MainPageTitle
          titleText={t('1SectionTitle')}
          subTitleText={t('1SectionDescription')}
        />

        <div
          ref={sectionsRef}
          className={`${s.cases_page__sections} ${isSectionsVisible ? s.animate_sections : ''}`}
        >
          <AnimatedPreviewSection
            blockQuote={t('1BlockQuote')}
            imgSrc={casesWithMetricsImg}
            titleText={t('1BlockTitle')}
            description={t('1BlockDescription')}
            textPosition={TextPosition.Left}
          />

          <AnimatedPreviewSection
            blockQuote={t('2BlockQuote')}
            imgSrc={casesVarietyGif}
            titleText={t('2BlockTitle')}
            description={t('2BlockDescription')}
            textPosition={TextPosition.Right}
          />

          <AnimatedPreviewSection
            blockQuote={t('3BlockQuote')}
            imgSrc={caseDrillingImg}
            titleText={t('3BlockTitle')}
            description={t('3BlockDescription')}
            textPosition={TextPosition.Left}
          />
        </div>

        <div
          ref={featuresRef}
          className={`${isFeaturesVisible ? s.animate_features : ''}`}
        >
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

        <h1 className={s.cases_page__cases_title}>{t('FeatureTitle')}</h1>

        <CasesSelection />
      </div>
    </>
  );
}

export default Page;
