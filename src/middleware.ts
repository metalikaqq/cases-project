import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['ua', 'en'];
const defaultLocale = 'en';

// Helper function to extract locale and return the path without the locale
const extractLocaleFromPath = (path: string) => {
  const segments = path.split('/');
  const locale =
    segments.length > 1 && locales.includes(segments[1]) ? segments[1] : null;

  // Remove the locale from the path if it exists
  const pathWithoutLocale = locale ? `/${segments.slice(2).join('/')}` : path;

  return { locale, pathWithoutLocale };
};

// Create the next-intl middleware
const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale and path without locale
  const { locale, pathWithoutLocale } = extractLocaleFromPath(pathname);

  // If no locale is found in the path, redirect to the default locale
  if (!locale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // Apply the next-intl middleware
  const response = i18nMiddleware(request);

  // Set custom headers with the extracted locale and path without locale
  response.headers.set('X-Locale', locale);
  response.headers.set('X-Path-Without-Locale', pathWithoutLocale || '/'); // Default to '/' if empty

  // Optionally set a custom header with the default locale
  response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(ua|en)/:path*'],
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
