import s from './page.module.scss';
import PreviewSection from '@/components/PreviewSection';
import { TextPosition } from '@/components/PreviewSection/PreviewSection';
import MainPageTitle from '@/components/Main/components/MainPageTitle';
import { useTranslations } from 'next-intl';
import MainSelection from '@/components/MainSelection';
import PresentationalBanner from '@/components/PresentationalBanner';

import casesLoadingImg from '@/assets/image/cases-loading-wide.jpeg';
import caseDrillingImg from '@/assets/image/case-drilling.jpeg';
import peopleGroupImg from '@/assets/image/people-group.jpeg';

import mainBannerImg from '@/assets/image/main-head-banner.png';

export default function Home() {
  const t = useTranslations('MainPageTitle');
  const t2 = useTranslations('PreviewSection');

  return (
    <>
      <div className={s.presentation_wrapper}>
        {/* <PresentationalBanner
          title="BETTER TOURING"
          subtitle="THINK OUTSIDE THE BOX"
          imgSrc={mainBannerImg}
        /> */}

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

        <div className={s.main__sections}>
          <PreviewSection
            titleText={t2('1Title')}
            description={t2('2Description')}
            textPosition={TextPosition.Left}
            more={t2('1Section')}
            imgSrc={casesLoadingImg}
          />
          <PreviewSection
            titleText={t2('2Title')}
            description={t2('2Description')}
            textPosition={TextPosition.Right}
            more={t2('2Section')}
            imgSrc={caseDrillingImg}
          />
          <PreviewSection
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
