import Image from "next/image";
import s from "./Footer.module.scss";
import logo from "../../image/Fiasco_BLACK_140x.png";

export type FooterProps = {
  // props go here
};

export default function Footer(props: FooterProps) {
  return (
    <footer className={s.footer}>
      <Image className={s.footer__logo} src={logo} alt={"logo"} />

      <div className={s.black_row} />

      <ul >

      </ul>
    </footer>
  );
}
