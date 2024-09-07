"use client";

import { Suspense, useEffect, useState } from "react";
import s from "./PresentationalBanner.module.scss";

export type PresentationalBannerProps = {
  // props go here
};

export default function PresentationalBanner(props: PresentationalBannerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const videoSrc =
    "https://cdn.shopify.com/videos/c/o/v/dfd1e8109128471ca0357cdfac7260e7.mp4";

  return (
    <div className={s.banner}>
        {isClient && (
          <video
            className={s.banner__video}
            preload="auto"
            src={videoSrc}
            controls={false}
            autoPlay
            loop
            muted
            style={{
              zIndex: -1,
            }}
          />
        )}
    </div>
  );
}
