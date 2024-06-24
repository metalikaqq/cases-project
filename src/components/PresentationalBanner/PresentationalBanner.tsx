import { Suspense } from "react";
import s from "./PresentationalBanner.module.scss";
import Video from "next-video";

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
          src={"none"}
          controls={false}
          autoPlay
          loop
          muted
          style={{
            zIndex: -1,
          }}
        /></Suspense>
    </div>
  );
}
