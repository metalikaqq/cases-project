import s from './page.module.scss';
import PreviewSection from '@/components/PreviewSection';
import { TextPosition } from '@/components/PreviewSection/PreviewSection';
import MainPageTitle from '@/components/Main/components/MainPageTitle';
import { useTranslations } from 'next-intl';
import CasesSelection from '@/components/CasesSelection';
import PresentationalBanner from '@/components/PresentationalBanner';

function Page() {
  const firstBlockPosition = TextPosition.Left;
  const secondBlockPosition = TextPosition.Right;
  const thirdBlockPosition = TextPosition.Left;

  const t = useTranslations('MainPageTitle');
  const t2 = useTranslations('PreviewSection');

  const add = '123';

  return (
    <div>
      <div className={s.presentation_wrapper}>
        {/* <PresentationalBanner /> */}
      </div>

      <main className={s.main}>
        <MainPageTitle titleText={t('Title')} subTitleText={t('SubTitle')} />

        <PreviewSection
          TitleText={t2('1Title')}
          Description={t2('2Description')}
          textPosition={TextPosition.Left}
          More={t2('1Section')}
        />
        <PreviewSection
          TitleText={t2('2Title')}
          Description={t2('2Description')}
          textPosition={TextPosition.Right}
          More={t2('2Section')}
        />
        <PreviewSection
          TitleText={t2('3Title')}
          Description={t2('3Description')}
          textPosition={TextPosition.Left}
          More={t2('3Section')}
        />

        <CasesSelection />
      </main>
    </div>
  );
}

export default Page;
