import { useTranslations } from 'next-intl';
import s from './HeaderNav.module.scss';
import NavLinkWithDropdown from '@/UI/NavLinkWithDropdown';


export type HeaderNavProps = {
  // props go here
};

export default function HeaderNav(props: HeaderNavProps) {
  const t = useTranslations('HeaderNav');


  const moreInfo = ['about-us', 'contacts'];

  // const names = [t('RoadCases'), t('Lodgment')];
  const names = [t('AboutUs'), t('Contacts')];

  const AcousticSystems = ['AC'];


  return (
    <div className={s.wrapper}>
      <nav className={s.nav}>
        <NavLinkWithDropdown
          linkName={t('RoadCases')}
        // items={casesItems}
        />
        <NavLinkWithDropdown
          linkName={t('AcousticSystems')}
        // items={AcousticSystems}
        />
        <NavLinkWithDropdown
          linkName={t('Lodgment')}
        />
        <NavLinkWithDropdown
          linkName={t('MoreInfo')}
          items={moreInfo}
          names={names}
        />
      </nav>
    </div>
  );
}
