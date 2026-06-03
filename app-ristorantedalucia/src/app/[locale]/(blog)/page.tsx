import { sanityFetch } from "@/sanity/lib/live"
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries"
import PageMaker from "@/components/PageMaker";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data: page } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    params: { locale },
  });

  const siteName = 'Ristorante Da Lucia';
  const defaultTitle = locale === 'it'
    ? 'Ristorante Da Lucia | Cucina Tradizionale e Pesce a Bologna'
    : 'Ristorante Da Lucia | Traditional & Seafood Cuisine in Bologna';
  const defaultDescription = locale === 'it'
    ? 'Cucina tradizionale e di pesce nel cuore di Bologna. Piatti genuini, pesce fresco e un\'atmosfera autentica a pochi passi dal centro.'
    : 'Traditional Italian and seafood cuisine in the heart of Bologna. Honest, flavourful dishes in a warm atmosphere, just a short walk from the city centre.';

  const title = page?.metaTitle || defaultTitle;
  const description = page?.metaDescription || page?.subtitle || defaultDescription;

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL('https://ristorantedalucia.it'),
    openGraph: {
      title: page?.title || siteName,
      description: page?.subtitle || defaultDescription,
      url: `https://ristorantedalucia.it/${locale}`,
      siteName,
      images: [
        {
          url: 'https://ristorantedalucia.it/images/og-home.jpg',
          width: 1200,
          height: 630,
          alt: siteName,
          type: 'image/jpeg',
        },
      ],
      locale: locale === 'it' ? 'it-IT' : 'en-US',
      type: 'website',
    },
    alternates: {
      canonical: `https://ristorantedalucia.it/${locale}`,
      languages: {
        'it-IT': 'https://ristorantedalucia.it/it',
        'en-US': 'https://ristorantedalucia.it/en',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { data: page } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    params: { locale }
  });
  return (
    <main className={`relative text-foreground min-h-screen ${page?.theme ?? ''} ${!page?.backgroundImage ? 'bg-background' : ''}`}>
      {page?.backgroundImage && (
        <div className={`${page?.backgroundFixed ? 'fixed' : 'absolute'} inset-0 -z-10 w-full h-full`}>
          <Image
            src={urlFor(page.backgroundImage).width(1920).url()}
            alt=""
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
      )}
      {page?.subtitle && (
        <div className="container mx-auto px-4">
          <h2 className="text-center family-playfair text-3xl md:text-4xl py-12" data-aos="zoom-in">
            {page?.subtitle as string}
          </h2>
        </div>
      )}
      <PageMaker page={page} />
    </main>
  );
}
