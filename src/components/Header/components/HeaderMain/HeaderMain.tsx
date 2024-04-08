import s from "./HeaderMain.module.scss";
import Image from "next/image";

import bannerLogo from "@/assets/svg/banner-logo-main.svg";
import searchIcon from "@/assets/svg/search-black.svg";

export type HeaderMainProps = {
  // props go here
};

export default function HeaderMain(props: HeaderMainProps) {
  return (
    <div className={s.wrapper}>
      <div className={s.header_main}>
        <button className={s.header_main__search}>
          <Image
            src={searchIcon}
            alt="search-icon"
          />
        </button>

        <div className={s.header_main__banner}>
          <Image
            className={s.header_main__banner__image}
            src={bannerLogo}
            alt="site-logo"
          />
        </div>

        <div className={s.empty}></div>
      </div>
    </div>
  );
}
