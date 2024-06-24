import { useTranslations } from "next-intl";
import s from "./MainSelection.module.scss";
import MainSelectionItem from "./components/MainSelectionItem";
import caseImage from "@/assets/image/road_cases_collection_1_360x.webp";

export default function MainSelection() {
  const t = useTranslations("MainSelection");

  return (
    <div className={s.selection_cases}>
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt={t("Cases")}
        text={t("Cases")}
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt={t("A/C")}
        text={t("A/C")}
      />
    </div>
  );
}
