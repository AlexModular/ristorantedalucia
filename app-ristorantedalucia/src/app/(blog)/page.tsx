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
    metadataBase: new URL('https://donnasofi.com'),
    openGraph: {
      title: page?.title,
      description: page?.subtitle,
      url: `https://donnasofi.com/${page?.slug}`,
      siteName: 'Donna Sofì - Pizzeria',
      images: [
        {
          url: 'https://donnasofi.com/images/donnasofi.svg',
          width: 800,
          height: 600,
          alt: page?.title,
          type: 'image/svg+xml',
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
      <main className="relative bg-white">
        <PageMaker page={page} />
      </main>
  );
}
