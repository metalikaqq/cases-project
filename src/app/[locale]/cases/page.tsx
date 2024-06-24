import s from "./page.module.scss";
import PreviewSection from "@/components/PreviewSection";
import { TextPosition } from "@/components/PreviewSection/PreviewSection";
import MainPageTitle from "@/components/Main/components/MainPageTitle";
import { useTranslations } from "next-intl";
import CasesSelection from "@/components/CasesSelection";

function Page() {
  const firstBlockPosition = TextPosition.Left;
  const secondBlockPosition = TextPosition.Right;
  const thirdBlockPosition = TextPosition.Left;

  const t = useTranslations("MainPageTitle");
  return (
    <div>
      <div className={s.presentation_wrapper}>
        {/* <PresentationalBanner /> */}
      </div>

      <main className={s.main}>
        <MainPageTitle titleText={t("Title")} subTitleText={t("SubTitle")} />

        <PreviewSection textPosition={firstBlockPosition} />
        <PreviewSection textPosition={secondBlockPosition} />
        <PreviewSection textPosition={thirdBlockPosition} />

        <CasesSelection />
      </main>
    </div>
  );
}

export default Page;
