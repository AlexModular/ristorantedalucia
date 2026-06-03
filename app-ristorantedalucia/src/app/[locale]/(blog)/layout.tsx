import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { VisualEditing } from "next-sanity";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { draftMode } from "next/headers";
import Navigation from "@/components/Navigation";
import { AlternateSlugContextProvider } from "@/context/AlternateSlugContext";
import { GoogleAnalytics } from '@next/third-parties/google'
import { IubendaProvider, IubendaCookieSolutionBannerConfigInterface } from '@mep-agency/next-iubenda';
import Image from 'next/image';

import '@/app/globals.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Metadata } from 'next';
import { sanityFetch } from "@/sanity/lib/live"
import { COPYRIGHT_QUERY, HEADERMENU_QUERY, LOCATIONS_QUERY, SOCIALS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import Footer from "@/components/Footer";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import PixelLoader from "@/components/PixelLoader";
import { Montserrat, Playfair_Display } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { headers } = await import('next/headers');
  const host = (await headers()).get('host') || '';
  const isVercel = host.includes('.vercel');

  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY, params: { locale } });

  const siteName = 'Ristorante Da Lucia';
  const defaultDescription = locale === 'it'
    ? 'Cucina tradizionale e di pesce nel cuore di Bologna. Piatti genuini, pesce fresco e un\'atmosfera autentica a pochi passi dal centro.'
    : 'Traditional Italian and seafood cuisine in the heart of Bologna. Honest, flavourful dishes in a warm atmosphere, just a short walk from the city centre.';

  const ogImageUrl = settings?.ogImage
    ? urlFor(settings.ogImage).width(1200).height(630).url()
    : 'https://ristorantedalucia.it/images/og-home.jpg';

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    metadataBase: new URL('https://ristorantedalucia.it'),
    // ── Google Search Console verification ─────────────────────────────────
    // Imposta NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION nel file .env.local (o su Vercel)
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    }),
    // ───────────────────────────────────────────────────────────────────────
    openGraph: {
      title: siteName,
      description: defaultDescription,
      url: 'https://ristorantedalucia.it',
      siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
          type: 'image/jpeg',
        },
      ],
      locale: locale === 'it' ? 'it-IT' : 'en-US',
      type: 'website',
    },
    robots: {
      index: !isVercel,
      follow: !isVercel,
    },
    alternates: {
      canonical: 'https://ristorantedalucia.it',
      languages: {
        'it-IT': 'https://ristorantedalucia.it/it',
        'en-US': 'https://ristorantedalucia.it/en',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const { data: navItems } = await sanityFetch({
    query: HEADERMENU_QUERY,
    params: { locale }
  });
  const { data: socials } = await sanityFetch({
    query: SOCIALS_QUERY,
    params: { locale }
  });
  const { data: locations } = await sanityFetch({
    query: LOCATIONS_QUERY,
    params: { locale }
  });
  const { data: copyright } = await sanityFetch({
    query: COPYRIGHT_QUERY,
    params: { locale }
  });
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    params: { locale }
  });

  const theme = settings?.theme || 'light';
  const themeClass = theme === 'auto' ? '' : theme;

  const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
    siteId: parseInt(process.env.IUBENDA_SITE_ID || '0'),
    cookiePolicyId: parseInt(process.env.IUBENDA_COOKIE_POLICY_ID || '0'),
    lang: locale,
  };

  return (
    <html lang={locale} data-theme={theme} className={themeClass}>
      <head>
        {/* Favicon principale: SVG adattivo con CSS prefers-color-scheme (Chrome, Firefox, Safari 12+) */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Fallback PNG per browser senza SVG favicon: media query funziona su Chrome/Firefox */}
        <link rel="icon" href="/icon" type="image/png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/icon-dark.png" type="image/png" media="(prefers-color-scheme: dark)" />
        {/* Apple touch icon: generato da icon.tsx (favicon-black.png 180x180) */}
        <link rel="apple-touch-icon" href="/apple-icon" />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <Image
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`} alt={""}
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <GoogleAnalytics gaId="UA-119546408-1" />
      <body cz-shortcut-listen="true" className={`${montserrat.variable} ${playfair.variable} bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          <ReCaptchaProvider reCaptchaKey={process.env.NEXT_RECAPTCHA_SITE_KEY} useEnterprise={true}>
            <AlternateSlugContextProvider>
              <div className="min-h-screen">
                <Navigation navItems={navItems} theme={theme} locations={locations} />
                <IubendaProvider bannerConfig={iubendaBannerConfig}>
                  <PixelLoader />
                  {children}
                </IubendaProvider>
                <Footer locations={locations} socials={socials} copyright={copyright} />
                <SanityLive />
                {(await draftMode()).isEnabled && (
                  <>
                    <DisableDraftMode />
                    <VisualEditing />
                    <SpeedInsights />
                  </>
                )}
              </div>
            </AlternateSlugContextProvider>
          </ReCaptchaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}