import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

// Import translations directly
import en from '../messages/en.json';
import ua from '../messages/ua.json';

// Translation messages object
const messages = {
  en,
  ua,
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: messages[locale as keyof typeof messages],
  };
});
