import Image from 'next/image';
import s from './page.module.scss';
import PresentationalBanner from '@/components/PresentationalBanner/PresentationalBanner';
import PreviewSection from '@/components/PreviewSection';
import { TextPosition } from '@/components/PreviewSection/PreviewSection';
import { useTranslations } from 'next-intl';

import caseLoadingImg from '@/assets/image/case-loading.jpeg';
import caseLockImg from '@/assets/image/case-lock.png';
import casesStackImg from '@/assets/image/cases-stack.jpeg';
import openCaseImg from '@/assets/image/open-case.jpeg';

import robertImg from '@/assets/image/robert.png';
import rudyImg from '@/assets/image/rudy.png';
import audreyImg from '@/assets/image/audrey.png';

import headBanner from '@/assets/image/about-us-head-banner.jpg';
import bottomBannerImg from '@/assets/image/about-us-bottom-banner.jpg';

export default function Page() {
  const t = useTranslations('AboutUs');

  return (
    <>
      <div className={s.presentation_wrapper}>
        <PresentationalBanner
          imgSrc={headBanner}
          pageName={t('BannerName')}
          title={t('BannerTitle')}
          subtitle={t('BannerSubtitle')}
          topIndent={40}
        />
      </div>

      <div className={s.about_us}>
        <div className={s.about_us__sections}>
          <PreviewSection
            titleText={t('1Title')}
            description={t('1Description')}
            textPosition={TextPosition.Left}
            imgSrc={caseLoadingImg}
            blockQuote={t('1BlockQuote')}
          />

          <PreviewSection
            titleText={t('1Title')}
            description={t('1Description')}
            textPosition={TextPosition.Right}
            imgSrc={caseLockImg}
            blockQuote={t('2BlockQuote')}
          />

          <PreviewSection
            titleText={t('1Title')}
            description={t('1Description')}
            textPosition={TextPosition.Left}
            imgSrc={openCaseImg}
          />

          <PreviewSection
            titleText={t('1Title')}
            description={t('1Description')}
            textPosition={TextPosition.Left}
            imgSrc={casesStackImg}
          />
        </div>

        <div className={s.about_us__team}>
          <div className={s.about_us__team__head}>
            <h1 className={s.about_us__team__title}>{`${t('OurTeam')}:`}</h1>

            <h2 className={s.about_us__team__subtitle}>{t('WeGet')}</h2>
          </div>

          <div className={s.about_us__team__members}>
            <div className={s.about_us__team__member}>
              <PreviewSection
                titleText={t('1TeamName')}
                description={t('1TeamDescription')}
                textPosition={TextPosition.Right}
                imgSrc={audreyImg}
                imgScale={0.8}
              />
            </div>

            <div className={s.about_us__team__member}>
              <PreviewSection
                titleText={t('2TeamName')}
                description={t('2TeamDescription')}
                textPosition={TextPosition.Right}
                imgSrc={robertImg}
                imgScale={0.8}
              />
            </div>

            <div className={s.about_us__team__member}>
              <PreviewSection
                titleText={t('3TeamName')}
                description={t('3TeamDescription')}
                textPosition={TextPosition.Right}
                imgSrc={rudyImg}
                imgScale={0.8}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={s.presentation_wrapper}>
        <PresentationalBanner
          imgSrc={bottomBannerImg}
          title={t('BottomBannerTitle')}
          subtitle={t('BottomBannerSubtitle')}
          topIndent={40}
          subtitleAsButton
        />
      </div>
    </>
  );
}
