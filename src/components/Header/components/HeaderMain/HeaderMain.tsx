import s from "./HeaderMain.module.scss";
import Image from "next/image";

import bannerLogo from "@/assets/svg/banner-logo-main.svg";
import searchIcon from "@/assets/svg/search-black.svg";
import burgerIcon from "@/assets/svg/burger-button-ico.svg";
import { Link } from "@/navigation";

export type HeaderMainProps = {
  // props go here
};

export default function HeaderMain(props: HeaderMainProps) {
  return (
    <div className={s.wrapper}>
      <div className={s.header_main}>
        <Link href={"/"} className={s.header_main__banner}>
          <Image
            className={s.header_main__banner__image}
            src={bannerLogo}
            alt="site-logo"
          />
        </Link>
      </div>
    </div>
  );
}
