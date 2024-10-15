import s from "./PresentationalBanner.module.scss";
import Image from "next/image";
import bannerImage from "@/assets/image/about_us_title.jpeg"

export enum BannerPage {
  Main,
  About
};

export type PresentationalBannerProps = {
  page: BannerPage;
};

export default function PresentationalBanner({ page }: PresentationalBannerProps) {
  const videoSrc = "https://cdn.shopify.com/videos/c/o/v/dfd1e8109128471ca0357cdfac7260e7.mp4";

  return (
    <div className={s.banner}>
      <>
        {page === BannerPage.Main && (
          <>
            <video
              className={s.banner__styles}
              preload="auto"
              src={videoSrc}
              controls={false}
              autoPlay={true}
              loop
              muted
              playsInline
              style={{
                zIndex: -1,
              }}
            />
          </>
        )}

        {page === BannerPage.About && (
          <>
            <Image
              src={bannerImage}
              alt={"bannerImage"}
              className={s.banner__styles}
              style={{
                zIndex: -1,
              }}
            />
          </>
        )}
      </>
    </div>
  );
}
