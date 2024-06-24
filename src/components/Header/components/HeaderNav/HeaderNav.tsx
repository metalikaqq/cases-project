import { useTranslations } from "next-intl";
import s from "./HeaderNav.module.scss";
import { Link } from "@/navigation";
import NavLinkWithDropdown from "@/UI/NavLinkWithDropdown";

export type HeaderNavProps = {
  // props go here
};

export default function HeaderNav(props: HeaderNavProps) {
  const t = useTranslations("HeaderNav");

  const items = [
    "RoadCases 23X24",
    "RoadCases1 & Chill",
    "Road",
    "RoadCases 55X22",
  ];

  return (
    <div className={s.wrapper}>
      <nav className={s.nav}>
        <NavLinkWithDropdown linkName={t("RoadCases")} items={items} />

        <NavLinkWithDropdown linkName={t("AcousticSystems")} items={items} />

        <NavLinkWithDropdown linkName={t("Lodgment")} items={items} />
        <NavLinkWithDropdown linkName={t("MoreInfo")} items={items} />
      </nav>
    </div>
  );
}
