// // CasesSelection.tsx
// import { slugify } from '@/utils/slugify';
// import s from './CasesSelection.module.scss';
// import useRoadCasesInfo from '@/api/roadCasesInfo';
// import MainSelectionItem from '../MainSelection/components/MainSelectionItem';

// export default function CasesSelection() {
//   const roadCasesInfo = useRoadCasesInfo();

//   return (
//     <div className={s.selection_cases}>
//       {Object.keys(roadCasesInfo).map((caseKey, id) => {
//         const formattedTitle = slugify(roadCasesInfo[caseKey].title);
//         const mainImage = roadCasesInfo[caseKey].images[0].src;
//         return (
//           <MainSelectionItem
//             key={caseKey}
//             linkHref={`/${formattedTitle}`}
//             imageSrc={mainImage}
//             imageAlt={roadCasesInfo[caseKey].images[0].alt}
//             text={roadCasesInfo[caseKey].title}
//           />
//         );
//       })}
//     </div>
//   );
// }

"use client"

import { useState, useRef, useEffect } from 'react';
import { slugify } from '@/utils/slugify';
import s from './CasesSelection.module.scss';
import useRoadCasesInfo from '@/api/roadCasesInfo';
import MainSelectionItem from '../MainSelection/components/MainSelectionItem';

export default function CasesSelection() {
  const roadCasesInfo = useRoadCasesInfo();
  const itemsPerPage = 10; // Number of cases to load each time
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const allCases = Object.keys(roadCasesInfo);

  const loadMoreItems = () => {
    setVisibleItems((prev) => Math.min(prev + itemsPerPage, allCases.length));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <div className={s.selection_cases}>
      {allCases.slice(0, visibleItems).map((caseKey, id) => {
        const caseInfo = roadCasesInfo[caseKey];
        const formattedTitle = slugify(caseInfo.title);
        const mainImage = caseInfo.images[0].src;
        return (
          <MainSelectionItem
            key={caseKey}
            linkHref={`/${formattedTitle}`}
            imageSrc={mainImage}
            imageAlt={caseInfo.images[0].alt}
            text={caseInfo.title}
          />
        );
      })}
      {visibleItems < allCases.length && (
        <div ref={observerRef} className={s.loadingIndicator}>
          Loading more cases...
        </div>
      )}
    </div>
  );
}
