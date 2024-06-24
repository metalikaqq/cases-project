import s from "./HeaderTopLine2.module.scss";
import Image from "next/image";

import instaIcon from "@/assets/svg/insta-ico.svg";
import fbIcon from "@/assets/svg/fb-ico.svg";
import ytIcon from "@/assets/svg/yt-ico.svg";
import ukraineFlagIco from "@/assets/svg/ukraine-flag-ico.svg";
import arrowDown from "@/assets/svg/arrow-down-black.svg";
import { useTranslations } from "next-intl";
import LanguagePicker from "@/UI/LanguagePicker";
import { Link } from "@/navigation";

export type HeaderTopLine2Props = {
  // props go here
};

export default function HeaderTopLine2(props: HeaderTopLine2Props) {
  const t = useTranslations("HeaderTopLine2");

  return (
    <div className={s.wrapper}>
      <div className={s.tl2}>
        <div className={s.tl2__text_links}>
          <Link className={s.tl2__text_links__link} href={"/contacts"}>
            {t("Contacts")}
          </Link>

          <Link className={s.tl2__text_links__link} href={"/about-us"}>
            {t("AboutUs")}
          </Link>
        </div>

        <div className={s.tl2__right_block}>
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

          {/* <div className={s.currency_picker__wrapper}>
            <button
              className={s.currency_picker}
            >
              <Image
                className={s.currency_picker__circle_ico}
                src={ukraineFlagIco}
                alt="icon-of-selected-currency"
              />

              <p className={s.currency_picker__text}>
                Ukrainian (UAH ₴)
              </p>

              <div className={s.currency_picker__open_arrow}>
                <Image
                  src={arrowDown}
                  alt="drop-down-opener-arrow"
                />
              </div>
            </button>
          </div> */}

          <LanguagePicker />
        </div>
      </div>
    </div>
  );
}
