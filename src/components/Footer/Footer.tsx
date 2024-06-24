import Image from "next/image";
import s from "./Footer.module.scss";
import logo from "@/assets/image/Fiasco_BLACK_140x.png";
import ukraineFlagIco from "@/assets/svg/ukraine-flag-ico.svg";
import arrowDown from "@/assets/svg/arrow-down-black.svg";
import ToggleableContent from "@/UI/ToggleableContent";
import CustomInput from "@/UI/CustomInput";
import LanguagePicker from "@/UI/LanguagePicker";
import { Link } from "@/navigation";

export type FooterProps = {
  // props go here
};

export default function Footer(props: FooterProps) {
  const handleToggleClick = () => {
    // Handle the click event here
    console.log("Toggleable content clicked!");
  };

  return (
    <footer className={s.footer__wrapper}>
      <div className={s.footer}>
        <Image className={s.footer__logo} src={logo} alt={"logo"} />

        <div className={s.black_row} />

        <ul className={s.footer__list}>
          <li className={s.footer__item}>
            <Link href={"/about-uss"}>About Us</Link>
          </li>

          <li className={s.footer__item}>
            <Link href={"/contacts"}>Contact</Link>
          </li>

          <li className={s.footer__item}>
            <Link href={"/"}>Visit Fiasco Cases NZ</Link>
          </li>
        </ul>

        <div className={s.black_row} />

        <div className={s.footer__contact_us}>
          <div className={s.toggleable__content}>
            <ToggleableContent />
          </div>

          <span className={s.footer__contact_us__text}>Stay in the loop</span>

          <span className={s.footer__description}>
            We send out occasional emails about new Fiasco products <br /> and
            offers.
          </span>

          <div className={s.custom__input}>
            <CustomInput />
          </div>
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
