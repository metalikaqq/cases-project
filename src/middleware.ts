import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/((?!api|account|_next|.*\\..*).*)'],
  // matcher: ['/', '/(ukr|en)/:path*']

  matcher: [
    // // Enable a redirect to a matching locale at the root
    '/',

    // // Set a cookie to remember the previous locale for
    // // all requests that have a locale prefix
    '/(ukr|en)/:path*',

    // // Enable redirects that add missing locales
    // // (e.g. `/pathnames` -> `/en/pathnames`)
    // '/((?!_next|_vercel|.*\\..*).*)'
    // "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
