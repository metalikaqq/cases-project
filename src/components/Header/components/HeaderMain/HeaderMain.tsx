import s from './HeaderMain.module.scss';
import Image from 'next/image';

import bannerLogo from '@/assets/svg/banner-logo-main.svg';
import bannerLogo1 from '@/assets/svg/transparent_1748546923_2956.svg';

import userIcon from '@/assets/svg/user-icon-black.svg';
import { Link } from '@/navigation';

export type HeaderMainProps = {
  // props go here
};

export default function HeaderMain(props: HeaderMainProps) {
  return (
    <div className={s.wrapper}>
      <div className={s.header_main}>
        <Link href={'/'} className={s.header_main__banner}>
          <Image
            className={s.header_main__banner__image}
            src={bannerLogo1}
            alt="site-logo"
          />
        </Link>

        <Link href={'/login'} className={s.header_main__user}>
          <Image
            className={s.header_main__user_icon}
            src={userIcon}
            alt="login-ico"
          />
        </Link>
      </div>
    </div>
  );
}
