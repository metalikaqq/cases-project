import Image from 'next/image';
import s from './Footer.module.scss';
import logo from '@/assets/image/Fiasco_BLACK_140x.png';
import ukraineFlagIco from '@/assets/svg/ukraine-flag-ico.svg';
import arrowDown from '@/assets/svg/arrow-down-black.svg';
import ToggleableContent from '@/UI/ToggleableContent';
import CustomInput from '@/UI/CustomInput';
import LanguagePicker from '@/UI/LanguagePicker';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export type FooterProps = {
};

export default function Footer(props: FooterProps) {
  const t = useTranslations('Footer');

  return (
    <footer className={s.footer__wrapper}>
      <div className={s.footer}>
        <Image className={s.footer__logo} src={logo} alt={'logo'} />

        <div className={s.black_row} />

        <ul className={s.footer__list}>
          <li className={s.footer__item}>
            <Link href={'/login'}>Login</Link>
          </li>

          <li className={s.footer__item}>
            <Link href={'/about-uss'}>{t('AboutUs')}</Link>
          </li>

          <li className={s.footer__item}>
            <Link href={'/contacts'}>{t('Contacts')}</Link>
          </li>

          <li className={s.footer__item}>
            <Link href={'/'}>{t('Visit')}</Link>
          </li>
        </ul>

        <div className={s.black_row} />

        <div className={s.footer__contact_us}>
          <div className={s.toggleable__content}>
            <ToggleableContent />
          </div>

          <span className={s.footer__contact_us__text}>
            {t('StayInTheLoop')}
          </span>

          <span className={s.footer__description}>{t('Greetings')}</span>

          {/* <div className={s.custom__input}>
            <CustomInput />
          </div> */}
        </div>

        {/* <div className={s.currency_picker__wrapper}>
          <button className={s.currency_picker}>
            <Image
              className={s.currency_picker__circle_ico}
              src={ukraineFlagIco}
              alt="icon-of-selected-currency"
            />

            <p className={s.currency_picker__text}>Ukrainian (UAH ₴)</p>

            <div className={s.currency_picker__open_arrow}>
              <Image src={arrowDown} alt="drop-down-opener-arrow" />
            </div>
          </button>
        </div> */}

        <div className={s.free_space}></div>
      </div>

      <div className={s.language_picker}>
        <LanguagePicker direction="up" />
      </div>
    </footer>
  );
}
