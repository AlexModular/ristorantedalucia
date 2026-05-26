import { LOCATION_QUERY, LOCATIONS_PATHS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { components } from "@/components/PortableTextComponents";
import PageMaker from "@/components/PageMaker";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";
import type { LocalizedString, LocalizedBlockContent, BlockContent, LOCATION_QUERYResult } from "@/../sanity.types";
import type { PageBlock } from "@/../sanity.types.custom";
import { resolveAlt } from "@/lib/resolveAlt";

// Revalidate every 60 seconds (ISR) instead of relying on Live API
// which calls draftMode() and breaks static generation.
export const revalidate = 60;

/**
 * Safely resolve a Sanity localised field (coalesce result) to a plain string.
 * The GROQ coalesce() can return: a plain string, a LocalizedString object,
 * or an array of LocalizedString objects (legacy multi-language arrays).
 */
function localStr(
  value: string | LocalizedString | Array<LocalizedString | { _type: string; it?: string; en?: string }> | null | undefined,
  locale: string
): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value || undefined;
  if (Array.isArray(value)) {
    const hit = value.find((v) => typeof v === "object" && v !== null && "_type" in v) as { it?: string; en?: string } | undefined;
    return hit?.[locale as "it" | "en"] ?? hit?.it ?? undefined;
  }
  // LocalizedString object
  return (value as LocalizedString)[locale as "it" | "en"] ?? (value as LocalizedString).it ?? undefined;
}

/**
 * Safely resolve a Sanity localised block-content field to a plain block array.
 * The GROQ coalesce() can return several shapes depending on what it matches:
 *   1. BlockContent              — direct array, pass through
 *   2. LocalizedBlockContent     — object with it/en keys, unwrap by locale
 *   3. Array<LocalizedBlockContent> — legacy multi-locale array, pick first element
 */
type LocationDescription = NonNullable<LOCATION_QUERYResult>["description"];

function resolveBlockContent(
  value: LocationDescription,
  locale: string
): BlockContent | null {
  if (!value) return null;
  if (Array.isArray(value)) {
    const first = value[0];
    // Array<LocalizedBlockContent>: each element has _type === "localizedBlockContent"
    if (first && typeof first === "object" && "_type" in first && (first as { _type: string })._type === "localizedBlockContent") {
      const loc = first as LocalizedBlockContent;
      return (loc[locale as "it" | "en"] ?? loc.it) as BlockContent | null ?? null;
    }
    // Already a plain BlockContent array
    return value as BlockContent;
  }
  // LocalizedBlockContent object
  if ((value as LocalizedBlockContent)._type === "localizedBlockContent") {
    const loc = value as LocalizedBlockContent;
    return (loc[locale as "it" | "en"] ?? loc.it) as BlockContent | null ?? null;
  }
  return null;
}

export async function generateStaticParams() {
  type LocationSlugs = { slugIt: string; slugEn: string };
  const locations = await client.fetch<LocationSlugs[]>(LOCATIONS_PATHS_QUERY);

  const params: { locale: string; slug: string }[] = [];

  (locations ?? []).forEach((l) => {
    if (l.slugIt) params.push({ locale: 'it', slug: l.slugIt });
    // EN slug falls back to IT slug when not set (safe for existing content)
    if (l.slugEn) params.push({ locale: 'en', slug: l.slugEn });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const location = await client.fetch(LOCATION_QUERY, { locale, slug });
  if (!location) return {};

  const siteName = "Ristorante Da Lucia";
  const resolvedTitle = localStr(location.metaTitle, locale) ?? localStr(location.title, locale) ?? siteName;
  const resolvedDesc =
    localStr(location.metaDescription, locale) ??
    (locale === "it"
      ? `Visita ${localStr(location.title, locale)} — ${location.address}, ${location.city}.`
      : `Visit ${localStr(location.title, locale)} — ${location.address}, ${location.city}.`);

  return {
    title: resolvedTitle,
    description: resolvedDesc,
    alternates: {
      canonical: `https://ristorantedalucia.it/${locale}/location/${slug}`,
      languages: {
        "it-IT": `https://ristorantedalucia.it/it/location/${slug}`,
        "en-US": `https://ristorantedalucia.it/en/location/${slug}`,
      },
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDesc,
      url: `https://ristorantedalucia.it/${locale}/location/${slug}`,
      siteName,
      images: location.heroImage
        ? [{ url: urlFor(location.heroImage).width(1200).height(630).url(), width: 1200, height: 630, alt: localStr(location.title, locale) ?? "" }]
        : [],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const location = await client.fetch(LOCATION_QUERY, { locale, slug });

  if (!location) notFound();

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
  const dayLabels: Record<string, { it: string; en: string }> = {
    monday: { it: "Lunedì", en: "Monday" },
    tuesday: { it: "Martedì", en: "Tuesday" },
    wednesday: { it: "Mercoledì", en: "Wednesday" },
    thursday: { it: "Giovedì", en: "Thursday" },
    friday: { it: "Venerdì", en: "Friday" },
    saturday: { it: "Sabato", en: "Saturday" },
    sunday: { it: "Domenica", en: "Sunday" },
  };

  return (
    <main className="relative text-foreground min-h-screen bg-background">
      {/* Hero */}
      {location.heroImage && (
        <div
          className="page-location-head transparent-header-trigger relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
          data-header-theme="dark"
        >
          <Image
            src={urlFor(location.heroImage).width(1920).height(1080).url()}
            alt={resolveAlt(location.heroImage?.alt, locale, localStr(location.title, locale) ?? '')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end pb-12 px-6 md:px-16">
            <h1 className="family-playfair text-white text-4xl md:text-6xl drop-shadow-lg">
              {localStr(location.title, locale)}
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
        {!location.heroImage && (
          <h1 className="family-playfair text-4xl md:text-5xl mb-12 text-center">{localStr(location.title, locale)}</h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Info */}
          <div className="flex flex-col gap-6">
            {location.address && (
              <div className="flex items-start gap-3">
                <MapPin className="text-gold mt-1 shrink-0" size={20} />
                <div>
                  <p>{location.address}</p>
                  <p>{location.postalCode} {location.city}</p>
                </div>
              </div>
            )}
            {location.phone && (
              <a href={`tel:${location.phone}`} className="flex items-center gap-3 hover:text-gold transition-colors">
                <Phone className="text-gold shrink-0" size={20} />
                <span>{location.phone}</span>
              </a>
            )}
            {location.email && (
              <a href={`mailto:${location.email}`} className="flex items-center gap-3 hover:text-gold transition-colors">
                <Mail className="text-gold shrink-0" size={20} />
                <span>{location.email}</span>
              </a>
            )}
          </div>

          {/* Opening hours */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-gold" size={20} />
              <h2 className="family-oswald text-xl uppercase tracking-widest">
                {locale === "it" ? "Orari" : "Opening Hours"}
              </h2>
            </div>
            <ul className="flex flex-col gap-2 text-sm">
              {days.map((day) => {
                const d = location[day] as { morningStart?: string; morningEnd?: string; eveningStart?: string; eveningEnd?: string; closed?: boolean; morningClosed?: boolean; eveningClosed?: boolean } | undefined;
                if (!d) return null;
                const label = dayLabels[day][locale as "it" | "en"] ?? day;
                if (d.closed) return (
                  <li key={day} className="flex justify-between">
                    <span className="font-medium">{label}</span>
                    <span className="opacity-50">{locale === "it" ? "Chiuso" : "Closed"}</span>
                  </li>
                );
                const morning = !d.morningClosed && d.morningStart ? `${d.morningStart}–${d.morningEnd}` : null;
                const evening = !d.eveningClosed && d.eveningStart ? `${d.eveningStart}–${d.eveningEnd}` : null;
                return (
                  <li key={day} className="flex justify-between gap-4">
                    <span className="font-medium">{label}</span>
                    <span className="text-right">{[morning, evening].filter(Boolean).join(" / ")}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Description */}
        {location.description && resolveBlockContent(location.description, locale) && (
          <div className="prose prose-lg max-w-none mb-16">
            <PortableText value={resolveBlockContent(location.description, locale) as BlockContent} components={components} />
          </div>
        )}
      </div>

      {/* Extra page blocks */}
      {location.pageBuilder && location.pageBuilder.length > 0 && (
        <PageMaker page={{ pageBuilder: location.pageBuilder as unknown as PageBlock[] }} />
      )}
    </main>
  );
}
