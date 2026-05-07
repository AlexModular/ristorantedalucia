import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { components } from "@/components/PortableTextComponents";
import type { Metadata } from "next";

const CATEGORY_LABELS: Record<string, { it: string; en: string }> = {
  news:     { it: "News",                   en: "News" },
  eventi:   { it: "Eventi",                 en: "Events" },
  premi:    { it: "Premi & Riconoscimenti", en: "Awards" },
  stagioni: { it: "Stagionalità",           en: "Seasonal" },
};

export async function generateStaticParams() {
  // Use direct client (not sanityFetch) — generateStaticParams runs at
  // build time outside any request scope, so draftMode() would throw.
  type PostSlug = { slug?: { current?: string | null } | null };
  const posts = await client.fetch<PostSlug[]>(POSTS_QUERY, {
    locale: "it",
    offset: 0,
    limit: 200,
  });
  return (posts ?? []).map((p) => ({ slug: p.slug?.current ?? "" }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { locale, slug } });
  if (!post) return {};

  const siteName = "Ristorante Da Lucia";
  const title = post.metaTitle || post.title || siteName;
  const description = post.metaDescription || post.excerpt || "";
  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : "https://ristorantedalucia.it/images/og-home.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `https://ristorantedalucia.it/${locale}/news/${slug}`,
      languages: {
        "it-IT": `https://ristorantedalucia.it/it/news/${slug}`,
        "en-US": `https://ristorantedalucia.it/en/news/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://ristorantedalucia.it/${locale}/news/${slug}`,
      siteName,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { locale, slug } });

  if (!post) notFound();

  const categoryLabel = post.category
    ? (CATEGORY_LABELS[post.category]?.[locale as "it" | "en"] ?? post.category)
    : null;

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(
        locale === "it" ? "it-IT" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : null;

  return (
    <main className="text-foreground min-h-screen bg-background pt-24 pb-24">
      <article className="container mx-auto px-4 md:px-8 max-w-3xl">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-gold transition-colors mb-10"
        >
          ← {locale === "it" ? "Tutte le news" : "All news"}
        </Link>

        {/* Category + date */}
        <div className="flex items-center gap-4 mb-6">
          {categoryLabel && (
            <span className="bg-gold text-white text-xs px-2 py-1 uppercase tracking-widest">
              {categoryLabel}
            </span>
          )}
          {date && <time className="text-sm text-foreground/50">{date}</time>}
        </div>

        {/* Title */}
        <h1 className="family-playfair text-3xl md:text-5xl leading-tight mb-10">{post.title}</h1>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full aspect-video overflow-hidden mb-12">
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={(post.coverImage as { alt?: string }).alt ?? post.title ?? ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-foreground/70 italic border-l-4 border-gold pl-6 mb-10 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Body */}
        {post.body && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} components={components} />
          </div>
        )}

        {/* Footer */}
        <hr className="border-foreground/10 my-12" />
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gold hover:text-foreground transition-colors"
        >
          ← {locale === "it" ? "Torna alle news" : "Back to news"}
        </Link>
      </article>
    </main>
  );
}
