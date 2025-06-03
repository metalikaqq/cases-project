'use client';

import s from './NavLinkWithDropdown.module.scss';
import { useState } from 'react';
import { Link } from '@/navigation';
import { slugify } from '@/utils/slugify';

export type NavLinkWithDropdownProps = {
  linkName: string;
  items?: string[];
  names?: string[];
};

export default function NavLinkWithDropdown({
  linkName,
  items = [],
  names,
}: NavLinkWithDropdownProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Determine the main link href based on linkName
  const getMainHref = () => {
    const linkNameLower = linkName.toLowerCase();
    if (linkNameLower.includes('acoustic') || linkNameLower.includes('акустичн')) {
      return '/acoustic-systems';
    }
    if (linkNameLower.includes('case') || linkNameLower.includes('кейс')) {
      return '/cases';
    }
    // Default fallback for other nav items
    return '#';
  };

  return (
    <div
      className={s.nav__item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={getMainHref()}
        className={`${s.nav__link} ${isHovered ? s.nav__link__text_visible : ''}`}
      >
        <p className={s.nav__link__text}>{linkName}</p>
      </Link>
      {items && (
        <ul className={`${s.dropdown} ${isHovered ? s.visible : ''}`}>
          {items.map((item, index) => {
            const formattedTitle = slugify(item);
            const itemName = names ? names[index] : item; // Вибираємо відповідну назву зі списку names

            return (
              <li key={index} className={s.dropdown__item}>
                <Link href={`/${formattedTitle}`}>
                  <p>{itemName}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
