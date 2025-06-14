import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { draftMode } from "next/headers";
import Navigation from "@/components/Navigation";
import { GoogleAnalytics } from '@next/third-parties/google'
import { IubendaProvider, IubendaCookieSolutionBannerConfigInterface } from '@mep-agency/next-iubenda';

import '@/app/globals.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Metadata } from 'next';
import { sanityFetch } from "@/sanity/lib/live"
import { COPYRIGHT_QUERY, HEADERMENU_QUERY, LOCATIONS_QUERY, SOCIALS_QUERY } from "@/sanity/lib/queries"
import Footer from "@/components/Footer";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    default: 'Ristorante Enoteca Da Lucia',
    template: '%s - Ristorante Enoteca Da Lucia',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://ristorantedalucia.it'),
  openGraph: {
    title: 'Ristorante Enoteca Da Lucia',
    description: 'The official Next.js Course Dashboard, built with App Router.',
    url: 'https://donnasofi.com',
    siteName: 'Ristorante Enoteca Da Lucia',
    images: [
      {
        url: 'https://ristorantedalucia.it/images/logo.png',
        width: 800,
        height: 125,
        alt: 'Ristorante Enoteca Da Lucia',
        type: 'image/png',
      },
    ],
    locale: 'it-IT',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
  }
};

const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: parseInt(process.env.IUBENDA_SITE_ID || '0'), // Your site ID
  cookiePolicyId: parseInt(process.env.IUBENDA_COOKIE_POLICY_ID || '0'), // Your cookie policy ID
  lang: 'it',

  // See https://www.iubenda.com/en/help/1205-how-to-configure-your-cookie-solution-advanced-guide
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {data: navItems} = await sanityFetch({
    query: HEADERMENU_QUERY
  });
  const {data: socials}  = await sanityFetch({
    query: SOCIALS_QUERY
  });
  const {data: locations } = await sanityFetch({
    query: LOCATIONS_QUERY
  });
  const {data: copyright } = await sanityFetch({
    query: COPYRIGHT_QUERY
  });
  const locale = await getLocale();
  return (
    <html lang={locale} data-theme="light" className="light">
      <GoogleAnalytics gaId="UA-119546408-1" />
      <body cz-shortcut-listen="true" className="dark:bg-white dark:text-black">
        <NextIntlClientProvider>
          <ReCaptchaProvider>
              <div className="min-h-screen">
                <Navigation navItems={navItems} />
                <IubendaProvider bannerConfig={iubendaBannerConfig}>
                  {children}
                </IubendaProvider>
                <Footer locations={locations} socials={socials} copyright={copyright} />
                <SanityLive />
                {(await draftMode()).isEnabled && (
                  <>
                    <DisableDraftMode />
                    <VisualEditing />
                    <SpeedInsights/>
                  </>
                )}
              </div>
            {/* Layout UI */}
          </ReCaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}