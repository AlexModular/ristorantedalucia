import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['it', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'it',
  
  // Don't use a prefix for the default locale (optional, but cleaner)
  localePrefix: 'always' 
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(it|en)/:path*']
};
