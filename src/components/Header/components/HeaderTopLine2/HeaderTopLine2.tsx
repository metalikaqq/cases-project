import s from "./HeaderTopLine2.module.scss"
import Link from "next/link";
import Image from "next/image";
import instaIcon from "@/assets/svg/insta-ico.svg";

export type HeaderTopLine2Props = {
  // props go here
};


export default function HeaderTopLine2(props: HeaderTopLine2Props) {
  return (
    <div className={s.tl2}>
      <div className={s.tl2__text_links}>
        <Link
          className={s.tl2__text_links__link}
          href={"google.com"}
        >
          Contact
        </Link>

        <Link
          className={s.tl2__text_links__link}
          href={"google.com"}
        >
          About Us
        </Link>
      </div>

      <div className={s.tl2__right_block}>
        <div className={s.tl2__socials}>
          <Image
            src={instaIcon}
            alt="link-to-our-instagram"
          />
        </div>

        <div className={s.tl2_currency_picker}>
          2
        </div>
      </div>
    </div>
  );
}
