import Link from 'next/link';
import s from './page.module.scss';
import { useTranslations } from 'next-intl';

function Page() {
  const t = useTranslations('ContactsPage');

  return (
    <div className={s.page__wrapper}>
      <div className={s.about_us}>
        <div className={s.text}>
          <h1 className={s.title}>{t('title')}</h1>
          <div className={s.text__info}>
            <p>323 528 2430</p>
            <p>sales@fiascocases.com</p>
          </div>
        </div>

        <div className={s.contact_info__container}>
          <div className={s.contact_info}>
            <h1 className={s.contact_info__title}>{t('workshop')}</h1>
            <div className={s.contact_info__text}>
              <span>Fiasco HQ</span>
              <span>2750 Oregon Court</span>
              <span>California, 90503</span>
            </div>
            <span>{t('text')}</span>
            <span>Call: 323 528 2430</span>
            <span>Email: sales@fiascocases.com</span>

            <Link href="https://maps.app.goo.gl/rG9XkgoGKKvBizWi7">
              <button className={s.button}>{t('direction')}</button>
            </Link>
          </div>
          <div className={s.map_container}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42200.03259959157!2d22.238352352156955!3d48.61937437211505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473919b944b6e3d9%3A0xda6ae0130042a3c!2sUzhhorod%2C%20Zakarpattia%20Oblast!5e0!3m2!1sen!2sua!4v1749645906001!5m2!1sen!2sua"              // width="600"
              height="500"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Fiasco HQ"
              className={s.google_map_iframe}
            ></iframe>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
