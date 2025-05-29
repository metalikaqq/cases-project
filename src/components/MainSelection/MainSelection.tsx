import { useTranslations } from 'next-intl';
import s from './MainSelection.module.scss';
import MainSelectionItem from './components/MainSelectionItem';
import caseImage from '@/assets/image/thumbnail1.webp';

export default function MainSelection() {
  const t = useTranslations('MainSelection');
  // const [cases, setCases] = useState<any[]>([]);

  // i need to fetch from db all types of cases
  // and then map them to create MainSelectionItem components dynamically
  // useEffect(() => {
  //   const fetchCases = async () => {
  //     try {
  //       const data = await getProductTypes(); // Assuming this function fetches cases from the database
  //       console.log('Fetched data:', data); // Debug log
  //       setCases(data);
  //     } catch (error) {
  //       console.error('Error fetching cases:', error);
  //     }
  //   };

  //   fetchCases();
  // }, []);

  return (
    <div className={s.selection_cases}>
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt={t('Cases')}
        text={t('Cases')}
      />
      <MainSelectionItem
        linkHref="/cases"
        imageSrc={caseImage}
        imageAlt={t('A/C')}
        text={t('A/C')}
      />
    </div>
  );
}
