import SelectionCases from "@/components/SelectionCases";
import s from "./page.module.scss";
import PreviewSection from "@/components/PreviewSection";
import { TextPosition } from "@/components/PreviewSection/PreviewSection";
import HeaderTopLine1 from "@/components/Header/components/HeaderTopLine1";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PresentationalBanner from "@/components/PresentationalBanner";
import MainPageTitle from "@/components/Main/components/MainPageTitle";

// Create a variable to store the text position
const firstBlockPosition = TextPosition.Left; // or TextPosition.Left
const secondBlockPositiom = TextPosition.Right;
const thirdBlockPosition = TextPosition.Left;

const titleText = "The Tour Family"
const subTitleText = 'Whether it`s a stadium, arena or club tour, Fiasco`s diverse range of road cases and shock racks have got you covered. Each piece is designed to perfectly pack and stack with the rest.'

export default function Home() {
  return (
    <div className={s.app}>
      <Header />

      <div className={s.presentation_wrapper}>
        <PresentationalBanner />
      </div>

      <main className={s.main}>
        <MainPageTitle
          titleText={titleText}
          subTitleText={subTitleText}
        />

        <SelectionCases />

        <PreviewSection textPosition={firstBlockPosition} />
        <PreviewSection textPosition={secondBlockPositiom} />
        <PreviewSection textPosition={thirdBlockPosition} />
      </main>

      <Footer />
    </div>
  );
}
