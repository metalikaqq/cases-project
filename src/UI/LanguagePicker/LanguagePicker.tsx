'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import s from './LanguagePicker.module.scss';
import ukraineFlagIco from '@/assets/svg/ukraine-flag-ico.svg';
import usaFlagIco from '@/assets/svg/english-flag-ico.svg';
import arrowDown from '@/assets/svg/arrow-down-black.svg';
import { usePathname, useRouter } from 'next/navigation'; // Corrected import
import { useLocale } from 'next-intl';

export default function LanguagePicker({ direction = 'down' }: { direction?: 'up' | 'down' }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const localeActive = useLocale(); // Get the active locale
  const [isPending, startTransition] = useTransition();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to clean and update the URL with the new locale
  const onSelectChange = (newLocale: string) => {
    if (newLocale === localeActive) return; // No action if the locale is the same

    const segments = pathname.split('/').filter(Boolean); // Split and remove empty segments
    if (segments[0] === localeActive) segments.shift(); // Remove the current locale

    const newPath = `/${newLocale}/${segments.join('/')}`; // Construct the new path
    startTransition(() => {
      router.push(newPath); // Navigate to the new locale path
    });

    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  // Function to get the correct flag icon based on locale
  const getFlagIcon = (locale: string) => {
    switch (locale) {
      case 'ua':
        return ukraineFlagIco;
      case 'en':
      default:
        return usaFlagIco;
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={s.currency_picker__wrapper}>
      {/* Language picker button */}
      <div className={s.currency_picker} onClick={toggleDropdown}>
        <Image
          className={s.currency_picker__circle_ico}
          src={getFlagIcon(localeActive)}
          alt="icon-of-selected-language"
        />
        <p className={s.currency_picker__text}>
          {localeActive === 'ua' ? 'Ukrainian' : 'English'}
        </p>
        <Image
          className={`${s.currency_picker__arrow} ${isDropdownOpen ? s.open : ''}`}
          src={arrowDown}
          alt="dropdown arrow"
        />
      </div>

      {/* Dropdown options */}
      {isDropdownOpen && (
        <div
          className={`${s.currency_picker__select_overlay} ${
            direction === 'up' ? s.up : s.down
          }`}
        >
          {/* English option */}
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

          {/* Ukrainian option */}
          <div
            className={s.currency_picker__option}
            onClick={() => onSelectChange('ua')}
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
