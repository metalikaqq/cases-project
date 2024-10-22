'use client';

import Modal from '@/UI/Modal';
import EmailForm from '@/components/EmailForm';
import Link from 'next/link';
import { useState } from 'react';
import s from './page.module.scss';
import { BannerPage } from '@/components/PresentationalBanner/PresentationalBanner';
import PresentationalBanner from '@/components/PresentationalBanner/PresentationalBanner';
import PreviewSection from '@/components/PreviewSection';
import { TextPosition } from '@/components/PreviewSection/PreviewSection';
import { useTranslations } from 'next-intl';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const info = {
    titleText: 'roadCases',
    param1: 'value1',
    param2: 'value2',
    param3: 'value3',
    param4: 'value4',
    param5: 'value5',
    param6: 'value6',
    param7: 'value7',
    param8: 'value8',
    param9: 'value9',
    param10: 'value10',
  };

  const queryString = new URLSearchParams(info).toString();

  const t = useTranslations('AboutUs');

  return (
    <div className={s.about_us}>
      <PresentationalBanner page={BannerPage.About} />

      <PreviewSection
        TitleText={t('1Title')}
        Description={t('1Description')}
        textPosition={TextPosition.Left}
        More={t('1Section')}
        disableButton
      />

      <PreviewSection
        TitleText={t('1Title')}
        Description={t('1Description')}
        textPosition={TextPosition.Right}
        More={t('1Section')}
        disableButton
      />

      <PreviewSection
        TitleText={t('1Title')}
        Description={t('1Description')}
        textPosition={TextPosition.Left}
        More={t('1Section')}
        disableButton
      />

      <PreviewSection
        TitleText={t('1Title')}
        Description={t('1Description')}
        textPosition={TextPosition.Left}
        More={t('1Section')}
        disableButton
      />
    </div>
  );
}
