import s from "./HeaderNav.module.scss";
import Link from "next/link";

export type HeaderNavProps = {
  // props go here
};
export default function HeaderNav(props: HeaderNavProps) {
  return (
    <div className={s.wrapper}>
      <nav className={s.nav}>
        <Link
          href={"google.com"}
          className={s.nav__link}
        >
          Cases
        </Link>

        <Link
          href={"google.com"}
          className={s.nav__link}
        >
          Sound
        </Link>

        <Link
          href={"google.com"}
          className={s.nav__link}
        >
          More Info
        </Link>
      </nav>
    </div>
  );
}
