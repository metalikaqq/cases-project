import SelectionCases from "@/components/SelectionCases";
import s from "./page.module.scss";
import PreviewSection from "@/components/PreviewSection";
import { TextPosition } from "@/components/PreviewSection/PreviewSection";
import HeaderTopLine1 from "@/components/Header/components/HeaderTopLine1";
import Header from "@/components/Header";

// Create a variable to store the text position
const firstBlockPosition = TextPosition.Left; // or TextPosition.Left
const secondBlockPositiom = TextPosition.Right;
const thirdBlockPosition = TextPosition.Left;

export default function Home() {
  return (
      <div className={s.app}>
        <Header />

        <main className={s.main}>
          <div>
            <h1 className={s.title}>The Tour Family</h1>

            <span className={s.sub_title}>
              Whether it&#39;s a stadium, arena or club tour, Fiasco&#39;s diverse
              range of road cases and shock racks have <br /> got you covered. Each
              piece is designed to perfectly pack and stack with the rest.
            </span>
          </div>

          <SelectionCases />

          <PreviewSection textPosition={firstBlockPosition} />
          <PreviewSection textPosition={secondBlockPositiom} />
          <PreviewSection textPosition={thirdBlockPosition} />
        </main>
      </div>
  );
}
