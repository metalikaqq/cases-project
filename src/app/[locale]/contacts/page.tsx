import Link from "next/link";
import Image from "next/image";
import mapImage from "@/assets/image/map2.jpg";
import s from './page.module.scss'
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("ContactsPage");


  return (
    <div className={s.about_us}>
      <div className={s.text}>
        <h1 className={s.title}>{t("title")}</h1>

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
          <h1 className={s.contact_info__title}>{t("workshop")}</h1>

          <div className={s.contact_info__text}>
            <span>Fiasco HQ</span>
            <span>2750 Oregon Court</span>
            <span>California, 90503</span>
          </div>

          <span>{t("text")}</span>
          <span>Call: 323 528 2430</span>
          <span>Email: sales@fiascocases.com</span>

          <Link
            className={s.button}
            href="https://maps.app.goo.gl/rG9XkgoGKKvBizWi7"
          >
            {t("direction")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
