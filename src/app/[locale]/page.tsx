import s from "./page.module.scss";
import PreviewSection from "@/components/PreviewSection";
import { TextPosition } from "@/components/PreviewSection/PreviewSection";
import MainPageTitle from "@/components/Main/components/MainPageTitle";
import { useTranslations } from "next-intl";
import MainSelection from "@/components/MainSelection";

// Create a variable to store the text position
const firstBlockPosition = TextPosition.Left; // or TextPosition.Left
const secondBlockPosition = TextPosition.Right;
const thirdBlockPosition = TextPosition.Left;

const TitleText = "The Tour Family";
const SubTitleText =
  "Whether it`s a stadium, arena or club tour, Fiasco`s diverse range of road cases and shock racks have got you covered. Each piece is designed to perfectly pack and stack with the rest.";

export default function Home() {
  const t = useTranslations("MainPageTitle");
  const t2 = useTranslations("PreviewSection");

  return (
    <div>
      <div className={s.presentation_wrapper}>
        {/* <PresentationalBanner /> */}
      </div>

      <main className={s.main}>
        <MainPageTitle titleText={t("Title")} subTitleText={t("SubTitle")} />

        <MainSelection />

        <PreviewSection
          TitleText={t2("1Title")}
          Description={t2("2Description")}
          textPosition={TextPosition.Left}
          More={t2("1Section")}
        />
        <PreviewSection
          TitleText={t2("2Title")}
          Description={t2("2Description")}
          textPosition={TextPosition.Right}
          More={t2("2Section")}
        />
        <PreviewSection
          TitleText={t2("3Title")}
          Description={t2("3Description")}
          textPosition={TextPosition.Left}
          More={t2("3Section")}
        />
      </main>
    </div>
  );
}
