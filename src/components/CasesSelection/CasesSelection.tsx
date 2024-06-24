import MainSelectionItem from "../MainSelection/components/MainSelectionItem";
import s from "./CasesSelection.module.scss";

import caseImage from "@/assets/image/road_cases_collection_1_360x.webp";

export type CasesSelectionProps = {
  // props go here
};
export default function CasesSelection(props: CasesSelectionProps) {
  return (
    <div className={s.selection_cases}>
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="Road Cases"
        text="ROAD CASES"
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="AC/DC"
        text="AC/DC"
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="AC/DC"
        text="AC/DC"
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="AC/DC"
        text="AC/DC"
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="AC/DC"
        text="AC/DC"
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="AC/DC"
        text="AC/DC"
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="AC/DC"
        text="AC/DC"
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt="AC/DC"
        text="AC/DC"
      />
    </div>
  );
}
