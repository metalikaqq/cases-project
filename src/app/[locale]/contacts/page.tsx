import Link from "next/link";
import Image from "next/image";
import mapImage from "@/assets/image/Screenshot 2024-06-19 205322.png";
import s from './page.module.scss'

function Page() {
  return (
    <div className={s.about_us}>
      <div className={s.text}>
        <h1 className={s.title}>READY TO PUT EVERYTHING IN ITS RIGHT PLACE?</h1>

        <div className={s.text__info}>
          <p className={s.text__phone}>323 528 2430</p>
          <p className={s.text__email}>sales@fiascocases.com</p>
        </div>
      </div>

      <div className={s.contact_info__container}>
        <Link
          className={s.google_map}
          href="https://maps.app.goo.gl/rG9XkgoGKKvBizWi7"
        >
          <Image className={s.google_map} src={mapImage} alt="mapImage" />
        </Link>

        <div className={s.contact_info}>
          <h1>OUR WORKSHOP</h1>

          <div className={s.contact_info__text}>
            <span>Fiasco HQ</span>
            <span>2750 Oregon Court</span>
            <span>California, 90503</span>
          </div>

          <span>Picking up a Case? Head around back to the loading dock!</span>
          <span>Call: 323 528 2430</span>
          <span>Email: sales@fiascocases.com</span>

          <Link
            className={s.button}
            href="https://maps.app.goo.gl/rG9XkgoGKKvBizWi7"
          >
            get direction
          </Link>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}

export default Page;
