import { ProductType } from '@/models/api';

export const mockProductTypes: ProductType[] = [
  {
    id: '1',
    name: 'Road Cases',
    description: 'Durable road cases for equipment transport',
    imageUrl: '/assets/image/thumbnail1.webp',
    linkHref: '/cases/road-cases',
    productNames: {
      en: ['Road Cases', 'Transport Cases'],
      uk: ['Дорожні кейси', 'Транспортні кейси'],
    },
  },
  {
    id: '2',
    name: 'A/C Systems',
    description: 'Acoustic and air conditioning systems',
    imageUrl: '/assets/image/thumbnail2.webp',
    linkHref: '/cases/ac-systems',
    productNames: {
      en: ['A/C Systems', 'Acoustic Systems'],
      uk: ['A/C Системи', 'Акустичні системи'],
    },
  },
  {
    id: '3',
    name: 'Lodgment Cases',
    description: 'Specialized lodgment and accommodation cases',
    imageUrl: '/assets/image/thumbnail3.webp',
    linkHref: '/cases/lodgment',
    productNames: {
      en: ['Lodgment Cases', 'Accommodation Cases'],
      uk: ['Кейси для розміщення', 'Розмічувальні кейси'],
    },
  },
  {
    id: '4',
    name: 'Custom Solutions',
    description: 'Custom-built solutions for specific needs',
    imageUrl: '/assets/image/thumbnail4.webp',
    linkHref: '/cases/custom',
    productNames: {
      en: ['Custom Solutions', 'Tailored Cases'],
      uk: ['Індивідуальні рішення', 'Спеціальні кейси'],
    },
  },
];
