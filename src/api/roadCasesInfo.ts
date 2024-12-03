import { useTranslations } from 'next-intl';
import { RoadCase } from '@/models/api';
import mainImage_1item from '@/assets/image/product.webp';
import thumbnail1_1item from '@/assets/image/thumbnail1.webp';
import thumbnail2_1item from '@/assets/image/thumbnail2.webp';
import thumbnail3_1item from '@/assets/image/thumbnail3.webp';
import thumbnail4_1item from '@/assets/image/thumbnail4.webp';
import thumbnail5_1item from '@/assets/image/thumbnail5.webp';

import mainImage_2item from '@/assets/image/product.webp';

const useRoadCasesInfo = () => {
  const t = useTranslations('ProductPage');
  const roadCasesInfo: { [key: string]: RoadCase } = {
    ...Array.from({ length: 30 }, (_, i) => ({
      [`case${i + 1}`]: {
        title: t('ProductTitle1'),
        ProductDescription1: t('ProductDescription1'),
        ProductDescription2: t('ProductDescription2'),
        ProductDescription3: t('ProductDescription3'),
        ProductListItem1: t('ProductListItem1'),
        ProductListItem2: t('ProductListItem2'),
        ProductListItem3: t('ProductListItem3'),
        ProductListItem4: t('ProductListItem4'),
        ProductListItem5: t('ProductListItem5'),
        ProductDescription4: t('ProductDescription4'),
        NestedListItem1: t('NestedListItem1'),
        NestedListItem2: t('NestedListItem2'),
        NestedListItem3: t('NestedListItem3'),
        DownloadLinkText: t('DownloadLinkText'),
        ContactUsButton: t('ContactUsButton'),
        images: [
          { src: mainImage_1item, alt: `Main Image Case ${i + 1}` },
          { src: thumbnail1_1item, alt: `Thumbnail 1 Case ${i + 1}` },
          { src: thumbnail2_1item, alt: `Thumbnail 2 Case ${i + 1}` },
          { src: thumbnail3_1item, alt: `Thumbnail 3 Case ${i + 1}` },
          { src: thumbnail4_1item, alt: `Thumbnail 4 Case ${i + 1}` },
          { src: thumbnail5_1item, alt: `Thumbnail 5 Case ${i + 1}` },
          { src: thumbnail4_1item, alt: `Thumbnail 4 Case ${i + 1}` },
          { src: thumbnail5_1item, alt: `Thumbnail 5 Case ${i + 1}` },
        ],
      },
    })).reduce((acc, caseObj) => ({ ...acc, ...caseObj }), {}),
  };

  return roadCasesInfo;
};

export default useRoadCasesInfo;
