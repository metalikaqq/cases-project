import { useTranslations } from 'next-intl';
import s from './HeaderTopLine1.module.scss';

export type HeaderTopLine1Props = {
  // props go here
};
export default function HeaderTopLine1(props: HeaderTopLine1Props) {
  const t = useTranslations('HeaderTopLine1');

  return (
    <div className={s.tl1}>
      <h1 className={s.tl1__text}>{t('Text')}</h1>
    </div>
  );
}
