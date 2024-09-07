import { Suspense } from "react";
import s from "./PresentationalBanner.module.scss";
import Video from "next-video";
import videoMain from "../../assets/video/dfd1e8109128471ca0357cdfac7260e7.mp4";

export type PresentationalBannerProps = {
  // props go here
};

export default function PresentationalBanner(props: PresentationalBannerProps) {
  return (
    <div className={s.banner}>
      <Suspense fallback={<p>Loading video...</p>}>
        <Video
          className={s.banner__video}
          preload="auto"
          src={"https://cdn.shopify.com/videos/c/o/v/dfd1e8109128471ca0357cdfac7260e7.mp4"}
          controls={false}
          autoPlay
          loop
          muted
          style={{
            zIndex: -1,
          }}
        />
      </Suspense>
    </div>
  );
}
