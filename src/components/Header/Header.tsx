import s from "./Header.module.scss";
import HeaderMain from "./components/HeaderMain";
import HeaderNav from "./components/HeaderNav";
import HeaderTopLine1 from "./components/HeaderTopLine1";
import HeaderTopLine2 from "./components/HeaderTopLine2";

export type HeaderProps = {
  // props go here
};

export default function Header(props: HeaderProps) {
  return (
    <header className={s.header}>
      <HeaderTopLine1 />
      <HeaderTopLine2 />
      <HeaderMain />

      <div className={s.tl2__wrapper}>
        <HeaderNav />
      </div>
    </header>
  );
}
