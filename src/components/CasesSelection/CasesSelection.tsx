// CasesSelection.tsx
import { slugify } from '@/utils/slugify';
import s from './CasesSelection.module.scss';
import useRoadCasesInfo from '@/api/roadCasesInfo';
import MainSelectionItem from '../MainSelection/components/MainSelectionItem';

export default function CasesSelection() {
  const roadCasesInfo = useRoadCasesInfo();

  return (
    <div className={s.selection_cases}>
      {Object.keys(roadCasesInfo).map((caseKey, id) => {
        const formattedTitle = slugify(roadCasesInfo[caseKey].title);
        const mainImage = roadCasesInfo[caseKey].images[0].src;
        return (
          <MainSelectionItem
            key={caseKey}
            linkHref={`/${formattedTitle}`}
            imageSrc={mainImage}
            imageAlt={roadCasesInfo[caseKey].images[0].alt}
            text={roadCasesInfo[caseKey].title}
          />
        );
      })}
    </div>
  );
}
