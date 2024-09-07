"use client";

import { Suspense, useEffect, useState } from "react";
import s from "./PresentationalBanner.module.scss";

export type PresentationalBannerProps = {
};

export default function PresentationalBanner(props: PresentationalBannerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const video = document.querySelector('video');

    const handleUserInteraction = () => {
      if (video && video.paused) {
        video.play();
      }
    };

    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
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
            playsInline
            style={{
              zIndex: -1,
            }}
          />
        )}
    </div>
  );
}
