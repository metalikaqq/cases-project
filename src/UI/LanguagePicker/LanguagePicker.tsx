'use client';

import { ChangeEvent, useState, useTransition } from 'react';
import s from './LanguagePicker.module.scss';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import ukraineFlagIco from '@/assets/svg/ukraine-flag-ico.svg';
import usaFlagIco from '@/assets/svg/english-flag-ico.svg';
import arrowDown from '@/assets/svg/arrow-down-black.svg';
import Image from 'next/image';

export default function LanguagePicker({ direction = 'down' }) {
  const router = useRouter();
  const localActive = useLocale();
  const [isPending, startTransition] = useTransition();
  const [selectedLocale, setSelectedLocale] = useState(localActive);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onSelectChange = (locale: string) => {
    setSelectedLocale(locale);
    startTransition(() => {
      router.replace(`/${locale}`);
    });
    setIsDropdownOpen(false);
  };

  const getFlagIcon = (locale: string) => {
    switch (locale) {
      case 'ukr':
        return ukraineFlagIco;
      case 'en':
      default:
        return usaFlagIco;
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={s.currency_picker__wrapper}>
      <div className={s.currency_picker} onClick={toggleDropdown}>
        <Image
          className={s.currency_picker__circle_ico}
          src={getFlagIcon(selectedLocale)}
          alt="icon-of-selected-language"
        />
        <p className={s.currency_picker__text}>
          {selectedLocale === 'ukr' ? 'Ukrainian' : 'English'}
        </p>
        <Image
          className={`${s.currency_picker__arrow} ${isDropdownOpen ? s.open : ''}`}
          src={arrowDown}
          alt="dropdown arrow"
        />
      </div>
      {isDropdownOpen && (
        <div
          className={`${s.currency_picker__select_overlay} ${
            direction === 'up' ? s.up : s.down
          }`}
        >
          <div
            className={s.currency_picker__option}
            onClick={() => onSelectChange('en')}
          >
            <Image
              className={s.currency_picker__circle_ico}
              src={usaFlagIco}
              alt="english-flag"
            />
            <span>English</span>
          </div>
          <div
            className={s.currency_picker__option}
            onClick={() => onSelectChange('ukr')}
          >
            <Image
              className={s.currency_picker__circle_ico}
              src={ukraineFlagIco}
              alt="ukrainian-flag"
            />
            <span>Ukrainian</span>
          </div>
        </div>
      )}
    </div>
  );
}
