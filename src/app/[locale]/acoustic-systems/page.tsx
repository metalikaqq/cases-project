import s from './page.module.scss';
import PreviewSection from '@/components/PreviewSection';
import { TextPosition } from '@/components/PreviewSection/PreviewSection';
import MainPageTitle from '@/components/Main/components/MainPageTitle';
import { useTranslations } from 'next-intl';
import PresentationalBanner from '@/components/PresentationalBanner';
import AcousticSystemSelection from '@/components/AcousticSystemSelection';

// Using existing images that could represent acoustic systems
import peopleGroupImg from '@/assets/image/people-group.jpeg';
import openCaseImg from '@/assets/image/open-case.jpeg';
import casesOnFloorImg from '@/assets/image/cases-on-floor.jpg';
import headBanner from '@/assets/image/about-us-head-banner.jpg';
import FeatureSection from '@/components/FeatureSection';
import { MoneyIcon, RecycleIcon, SafetyIcon, TruckIcon } from '@/components/FeatureSection/FeatureIcons';

function AcousticSystemsPage() {
  const t = useTranslations('AcousticSystemsPage');

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

        <div className={s.acoustic_systems_page__sections}>
          <PreviewSection
            blockQuote={t('1BlockQuote')}
            imgSrc={peopleGroupImg}
            titleText={t('1BlockTitle')}
            description={t('1BlockDescription')}
            textPosition={TextPosition.Left}
          />

          <PreviewSection
            blockQuote={t('2BlockQuote')}
            imgSrc={openCaseImg}
            titleText={t('2BlockTitle')}
            description={t('2BlockDescription')}
            textPosition={TextPosition.Right}
          />

          <PreviewSection
            blockQuote={t('3BlockQuote')}
            imgSrc={casesOnFloorImg}
            titleText={t('3BlockTitle')}
            description={t('3BlockDescription')}
            textPosition={TextPosition.Left}
          />
        </div>

        <div>
          <h1 className={s.acoustic_systems_page__title}>
            {t('FeatureTitle')}
          </h1>

          <FeatureSection
            items={[
              {
                icon: <TruckIcon />,
                title: t('FasterLoadsTitle'),
                description: t('FasterLoadsDescription')
              },
              {
                icon: <MoneyIcon />,
                title: t('SaveMoneyTitle'),
                description: t('SaveMoneyDescription')
              },
              {
                icon: <SafetyIcon />,
                title: t('HealthAndSafetyTitle'),
                description: t('HealthAndSafetyDescription')
              },
              {
                icon: <RecycleIcon />,
                title: t('MultiUseTitle'),
                description: t('MultiUseDescription')
              }
            ]}
          />
        </div>

        <AcousticSystemSelection />
      </div>
    </>
  );
}

export default AcousticSystemsPage;
