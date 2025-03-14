'use client';

import s from './ToggleableContent.module.scss';
import Image from 'next/image';
import arrowDown from '@/assets/svg/arrow-down-black.svg';
import { useState } from 'react';
import CustomInput from '../CustomInput';
import classNames from 'classnames';
import instaIcon from '@/assets/svg/insta-ico.svg';
import fbIcon from '@/assets/svg/fb-ico.svg';
import ytIcon from '@/assets/svg/yt-ico.svg';

export type ToggleableContentProps = {};

export default function ToggleableContent(props: ToggleableContentProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log(isClicked);
  };

  return (
    <div className={s.toggleable_content}>
      <button
        className={`${s.toggleable_content__button} ${
          isClicked ? s.fadeIn : ''
        }`}
        onClick={handleClick}
      >
        <span className={s.toggleable_content__text}>Stay in the loop</span>
        <Image
          className={classNames(s.toggleable_content__img, [
            isClicked ? s.toggleable_content__img__rotate : '',
          ])}
          src={arrowDown}
          alt="arrowDown"
        />
      </button>

      {isClicked && (
        <div className={s.toggleable_content__email__info}>
          <div className={s.toggleable_content__email__info__text}>
            work.email@gmail.com
          </div>

          <div className={s.tl2__socials}>
            <Image
              className={s.tl2__socials__link}
              src={instaIcon}
              alt="link-to-our-instagram"
            />

            <Image
              className={s.tl2__socials__link}
              src={fbIcon}
              alt="link-to-our-facebook"
            />

            <Image
              className={s.tl2__socials__link}
              src={ytIcon}
              alt="link-to-our-youtube"
            />
          </div>

          {/* <input className={s.toggleable_content__email__info__input} type="text" /> */}

          {/* <CustomInput /> */}
        </div>
      )}
    </div>
  );
}
