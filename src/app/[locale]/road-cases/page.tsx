// import MainPageTitle from "@/components/MainPageTitle";
import s from "../page.module.scss";
import PreviewSection from "@/components/PreviewSection";
import { TextPosition } from "@/components/PreviewSection/PreviewSection";
import Header from "@/components/Header";
import PresentationalBanner from "@/components/PresentationalBanner";
import MainPageTitle from "@/components/Main/components/MainPageTitle";
import Footer from "@/components/Footer";
import RoadCases from "@/components/RoadCases";

function page() {
  const titleText = `Fiasco road cases stack perfectly like Tetris blocks!`;

  const subTitleText = `Fiasco road cases are an ingenious transit storage system. Each case is meticulously designed to fit perfectly with any other. Save hours on your load in & outs.`;

  const firstBlockPosition = TextPosition.Left; // or TextPosition.Left
  const secondBlockPosition = TextPosition.Right;

  const PositiveSideTitle = "Faster Loads";
  const PositiveSideSubTitle = `We have spent ten years developing the ultimate truck pack system for
  American trucks. It will be copied by others, the question is will they
  compromise and break the system?`;

  const MainTitle = "Fiasco Road Cases";

  return (
    <div className={s.app}>
      <Header />

      <div className={s.presentation_wrapper}>
        {/* <PresentationalBanner /> */}
      </div>
      
      <main className={s.main}>
        <MainPageTitle titleText={titleText} subTitleText={subTitleText} />

        <PreviewSection textPosition={secondBlockPosition} />
        <PreviewSection textPosition={firstBlockPosition} />
        <PreviewSection textPosition={secondBlockPosition} />

        <div className={s.positive_side__container}>
          {/* <PositiveSideBlock svg={carSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} />
          <PositiveSideBlock svg={paperSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} />
          <PositiveSideBlock svg={shieldSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} />
          <PositiveSideBlock svg={reuseSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} /> */}
        </div>

        {/* <MainPageTitle titleText={MainTitle} /> */}

        <RoadCases />
      </main>

      <Footer />
    </div>
  );
}

export default page;
