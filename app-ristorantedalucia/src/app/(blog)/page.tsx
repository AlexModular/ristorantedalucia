import { sanityFetch } from "@/sanity/lib/live"
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries"
import { QueryParams } from "next-sanity";
import PageMaker from "@/components/PageMaker";


export async function generateMetadata({ params }: { params: Promise<QueryParams> }) {
  const {data: page} = await sanityFetch({
    query: HOMEPAGE_QUERY,
    params: await params,
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
      url: `https://ristorantedalucia.it/${page?.slug}`,
      siteName: 'Donna Sofì - Pizzeria',
      images: [
        {
          url: 'https://ristorantedalucia.it/images/logo.png',
          width: 800,
          height: 600,
          alt: page?.title,
          type: 'image/png',
        },
      ],
      locale: 'it-IT',
      type: 'website',
    },
  };
}

export default async function Page() {
  /*const { data: pages } = await sanityFetch({
    query: PAGES_QUERY,
  });*/
  const {data: page} = await sanityFetch({
    query: HOMEPAGE_QUERY
  });
  return (
      <main className={`relative bg-background text-foreground ${page?.theme ?? ''}`}>
        <PageMaker page={page} />
      </main>
  );
}
