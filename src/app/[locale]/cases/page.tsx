import s from './page.module.scss';
import PreviewSection from '@/components/PreviewSection';
import { TextPosition } from '@/components/PreviewSection/PreviewSection';
import MainPageTitle from '@/components/Main/components/MainPageTitle';
import { useTranslations } from 'next-intl';
import CasesSelection from '@/components/CasesSelection';
import PresentationalBanner from '@/components/PresentationalBanner';
import FeatureSection from '@/components/FeatureSection';
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

        <div className={s.cases_page__sections}>
          <PreviewSection
            blockQuote={t('1BlockQuote')}
            imgSrc={casesWithMetricsImg}
            titleText={t('1BlockTitle')}
            description={t('1BlockDescription')}
            textPosition={TextPosition.Left}
          />

          <PreviewSection
            blockQuote={t('2BlockQuote')}
            imgSrc={casesVarietyGif}
            titleText={t('2BlockTitle')}
            description={t('2BlockDescription')}
            textPosition={TextPosition.Right}
          />

          <PreviewSection
            blockQuote={t('3BlockQuote')}
            imgSrc={caseDrillingImg}
            titleText={t('3BlockTitle')}
            description={t('3BlockDescription')}
            textPosition={TextPosition.Left}
          />
        </div>

        <div>
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
