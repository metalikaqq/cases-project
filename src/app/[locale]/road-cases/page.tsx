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
  return (
    <>
      <div className={s.presentation_wrapper}>
        {/* <PresentationalBanner /> */}
      </div>
      <main className={s.main}>
        {/* <MainPageTitle titleText={titleText} subTitleText={subTitleText} />

    <PreviewSection textPosition={secondBlockPosition} />
    <PreviewSection textPosition={firstBlockPosition} />
    <PreviewSection textPosition={secondBlockPosition} /> */}

        <div className={s.positive_side__container}>
          {/* <PositiveSideBlock svg={carSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} />
    <PositiveSideBlock svg={paperSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} />
    <PositiveSideBlock svg={shieldSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} />
    <PositiveSideBlock svg={reuseSVG} title={PositiveSideTitle} subTitle={PositiveSideSubTitle} /> */}
        </div>

        {/* <MainPageTitle titleText={MainTitle} /> */}

        <RoadCases />
      </main>
    </>
  );
}

export default page;
