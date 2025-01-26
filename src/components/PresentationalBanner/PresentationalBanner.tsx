import s from './PresentationalBanner.module.scss';
import Image, { StaticImageData } from 'next/image';
import bannerImage from '@/assets/image/about-us-head-banner.jpg';

export type PresentationalBannerProps = {
  imgSrc: StaticImageData;
  pageName?: string;
  title?: string;
  subtitle?: string;
  topIndent?: number; //default '50%'
  subtitleAsButton?: boolean;
  buttonLink?: string;
};

export default function PresentationalBanner({
  imgSrc,
  pageName = "",
  title,
  subtitle,
  topIndent = 50,
  subtitleAsButton = false,
}: PresentationalBannerProps) {

  return (
    <div className={s.banner}>
      <div className={s.banner__image_wrapper}>
        <Image
          src={imgSrc}
          alt={'bannerImage'}
          className={s.banner__image}
        />
      </div>

      <div
        className={s.banner__text}
        style={{ top: `${topIndent}%` }}
      >
        {pageName && <h2 className={s.banner__text__page_name}>{pageName}</h2>}
        {title && <h1 className={s.banner__text__title}>{title}</h1>}
        {subtitle && subtitleAsButton ? (
          <button className={s.banner__text__subtitle_button}>
            <p className={s.banner__text__subtitle_button__font}>{subtitle}</p>
          </button>
        ) : (
          <p className={s.banner__text__subtitle}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

