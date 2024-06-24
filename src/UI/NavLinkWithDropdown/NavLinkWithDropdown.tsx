"use client";

import { Link } from "@/navigation";s
import s from "./NavLinkWithDropdown.module.scss";
import { useState } from "react";

export type NavLinkWithDropdownProps = {
  linkName: string;
  items: string[];
};

export default function NavLinkWithDropdown({ linkName, items }: NavLinkWithDropdownProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={s.nav__item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="/cases" className={s.nav__link}>
        {linkName}
      </Link>
      <ul className={`${s.dropdown} ${isHovered ? s.visible : ""}`}>
        {items.map((item, index) => (
          <li key={index} className={s.dropdown__item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
