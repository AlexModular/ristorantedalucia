import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries"
import { QueryParams } from "next-sanity";

import PageMaker from "@/components/PageMaker";
import PageIntro from "@/components/PageIntro";

export async function generateMetadata({ params }: { params: Promise<QueryParams> }) {
  const {data: page} = await sanityFetch({
    query: PAGE_QUERY,
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

export default async function Page({ params }: { params: Promise<QueryParams> }) {
  const {data: page} = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });
  return (
      <main className="relative bg-white">
        <PageIntro data={{title: page?.title ?? '', introImage: page?.introImage}} />
        <div className="page-container">
          {page?.subtitle && <h2 className="text-center font-bold pt-20" data-aos="zoom-in">{page?.subtitle}</h2>}
          <PageMaker page={page} />
        </div>
      </main>
  );
}
