import { sanityFetch } from "@/sanity/lib/live"
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries"
import PageMaker from "@/components/PageMaker";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const {data: page} = await sanityFetch({
    query: HOMEPAGE_QUERY,
    params: { locale },
  });
  return {
    title: {
      default: page?.metaTitle,
      template: `%s - ${page?.metaTitle || page?.title}`,
    },
    description: page?.metaDescription || page?.subtitle,
    metadataBase: new URL('https://ristorantedalucia.it'),
    openGraph: {
      title: page?.title,
      description: page?.subtitle,
      url: `https://ristorantedalucia.it/${locale}`,
      siteName: 'Ristorante Enoteca Da Lucia',
      images: [
        {
          url: 'https://ristorantedalucia.it/images/logo.png',
          width: 800,
          height: 600,
          alt: page?.title,
          type: 'image/png',
        },
      ],
      locale: locale === 'it' ? 'it-IT' : 'en-US',
      type: 'website',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const {data: page} = await sanityFetch({
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
            <h2 className="text-center family-playfair text-3xl md:text-4xl py-24" data-aos="zoom-in">
              {page?.subtitle}
            </h2>
          </div>
        )}
        <PageMaker page={page} />
      </main>
  );
}
