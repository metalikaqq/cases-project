import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['ua', 'en']; // Supported locales
const defaultLocale = 'en'; // Default locale

// Helper function to extract locale and return the path without it
const extractLocaleFromPath = (path: string) => {
  const segments = path.split('/');
  const locale =
    segments.length > 1 && locales.includes(segments[1]) ? segments[1] : null;

  // Rebuild the path without the locale if it exists
  const pathWithoutLocale = locale
    ? `/${segments.slice(2).join('/')}`.replace(/\/$/, '') || '/'
    : path;

  return { locale, pathWithoutLocale };
};

// Create next-intl middleware
const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Extract locale and clean path
  const { locale, pathWithoutLocale } = extractLocaleFromPath(pathname);

  // Redirect to the default locale if no locale is present
  if (!locale) {
    const targetUrl = new URL(`/${defaultLocale}${pathname}`, origin);

    // Prevent infinite redirect loops
    if (targetUrl.href !== request.url) {
      return NextResponse.redirect(targetUrl);
    }
  }

  // Prevent double locale prefixes (e.g., `/en/en`)
  if (locale && pathname.startsWith(`/${defaultLocale}/`)) {
    const targetUrl = new URL(`/${locale}${pathWithoutLocale}`, origin);

    // Prevent infinite redirect loops
    if (targetUrl.href !== request.url) {
      return NextResponse.redirect(targetUrl);
    }
  }

  // Apply the next-intl middleware
  const response = i18nMiddleware(request);

  // Add debugging headers (optional)
  response.headers.set('X-Locale', locale || defaultLocale);
  response.headers.set('X-Path-Without-Locale', pathWithoutLocale || '/');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Exclude API and static files
};
