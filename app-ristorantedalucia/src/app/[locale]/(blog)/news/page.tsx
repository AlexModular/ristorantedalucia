import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, POSTS_COUNT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import { resolveAlt } from "@/lib/resolveAlt";

const POSTS_PER_PAGE = 12;

const CATEGORY_LABELS: Record<string, { it: string; en: string }> = {
  news:     { it: "News",               en: "News" },
  eventi:   { it: "Eventi",             en: "Events" },
  premi:    { it: "Premi & Riconoscimenti", en: "Awards" },
  stagioni: { it: "Stagionalità",       en: "Seasonal" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteName = "Ristorante Da Lucia";
  const title =
    locale === "it"
      ? `News & Eventi | ${siteName}`
      : `News & Events | ${siteName}`;
  const description =
    locale === "it"
      ? "Scopri le ultime novità, eventi e riconoscimenti del Ristorante Da Lucia a Bologna."
      : "Discover the latest news, events and awards from Ristorante Da Lucia in Bologna.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://ristorantedalucia.it/${locale}/news`,
      languages: {
        "it-IT": "https://ristorantedalucia.it/it/news",
        "en-US": "https://ristorantedalucia.it/en/news",
      },
    },
  };
}

export default async function NewsListPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; categoria?: string }>;
}) {
  const { locale } = await params;
  const { page, categoria } = await searchParams;
  const currentPage = Math.max(1, Number(page ?? 1));
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  const [{ data: posts }, { data: total }] = await Promise.all([
    sanityFetch({
      query: POSTS_QUERY,
      params: { locale, offset, limit: offset + POSTS_PER_PAGE },
    }),
    sanityFetch({ query: POSTS_COUNT_QUERY }),
  ]);

  const totalPages = Math.ceil((total ?? 0) / POSTS_PER_PAGE);

  type PostItem = { category?: string | null; slug?: { current?: string | null } | null; title?: string | null; excerpt?: string | null; publishedAt?: string | null; coverImage?: { asset?: { _ref: string }; alt?: string } | null };
  const typedPosts = (posts ?? []) as PostItem[];
  const filteredPosts = categoria
    ? typedPosts.filter((p) => p.category === categoria)
    : typedPosts;

  const categories = Object.entries(CATEGORY_LABELS).map(([value, labels]) => ({
    value,
    label: labels[locale as "it" | "en"] ?? labels.it,
  }));

  return (
    <main className="text-foreground min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="family-playfair text-4xl md:text-5xl mb-4">
            {locale === "it" ? "News & Eventi" : "News & Events"}
          </h1>
          <p className="text-foreground/60 max-w-xl mx-auto">
            {locale === "it"
              ? "Aggiornamenti, appuntamenti e storie dal ristorante"
              : "Updates, events and stories from the restaurant"}
          </p>
        </header>

        {/* Category filter */}
        <nav className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            href="/news"
            className={`px-4 py-2 border text-sm uppercase tracking-widest transition-colors ${!categoria ? "border-gold bg-gold text-white" : "border-foreground/20 hover:border-gold"}`}
          >
            {locale === "it" ? "Tutti" : "All"}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/news?categoria=${cat.value}`}
              className={`px-4 py-2 border text-sm uppercase tracking-widest transition-colors ${categoria === cat.value ? "border-gold bg-gold text-white" : "border-foreground/20 hover:border-gold"}`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Grid */}
        {filteredPosts.length === 0 ? (
          <p className="text-center opacity-50 py-20">
            {locale === "it" ? "Nessun articolo trovato." : "No articles found."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const categoryLabel =
                post.category
                  ? (CATEGORY_LABELS[post.category]?.[locale as "it" | "en"] ?? post.category)
                  : null;
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(
                    locale === "it" ? "it-IT" : "en-GB",
                    { day: "numeric", month: "long", year: "numeric" }
                  )
                : null;
              return (
                <article key={post.slug?.current} className="group flex flex-col">
                  <Link href={`/news/${post.slug?.current}`} className="block overflow-hidden mb-4 aspect-video relative bg-black/10">
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(800).height(450).url()}
                        alt={resolveAlt(post.coverImage?.alt, locale, post.title ?? '')}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gold/10 flex items-center justify-center text-gold/40 text-4xl">📰</div>
                    )}
                    {categoryLabel && (
                      <span className="absolute top-3 left-3 bg-gold text-white text-xs px-2 py-1 uppercase tracking-widest">
                        {categoryLabel}
                      </span>
                    )}
                  </Link>
                  <div className="flex flex-col flex-1">
                    {date && <time className="text-xs text-foreground/50 mb-2">{date}</time>}
                    <h2 className="family-playfair text-xl mb-3 group-hover:text-gold transition-colors">
                      <Link href={`/news/${post.slug?.current}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    )}
                    <Link
                      href={`/news/${post.slug?.current}`}
                      className="mt-auto text-sm uppercase tracking-widest text-gold hover:text-foreground transition-colors border-b border-gold/30 hover:border-gold pb-0.5 self-start"
                    >
                      {locale === "it" ? "Leggi di più →" : "Read more →"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/news?page=${p}${categoria ? `&categoria=${categoria}` : ""}`}
                className={`w-10 h-10 flex items-center justify-center border transition-colors ${p === currentPage ? "border-gold bg-gold text-white" : "border-foreground/20 hover:border-gold"}`}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </main>
  );
}
