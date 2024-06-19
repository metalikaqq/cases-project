import { useTranslations } from "next-intl";
import s from "./HeaderNav.module.scss";
import { Link } from "@/navigation";
// import Link from "next/link";

export type HeaderNavProps = {
  // props go here
};
export default function HeaderNav(props: HeaderNavProps) {
  const t = useTranslations("HeaderNav");

  return (
    <div className={s.wrapper}>
      <nav className={s.nav}>
        <Link href="/road-cases" className={s.nav__link}>
          {t("RoadCases")}
        </Link>

        <Link href={"google.com"} className={s.nav__link}>
          {t("Sound")}
        </Link>

        <Link href={"google.com"} className={s.nav__link}>
          {t("PolyProof")}
        </Link>

        <Link href={"google.com"} className={s.nav__link}>
          {t("MoreInfo")}
        </Link>
      </nav>
    </div>
  );
}
