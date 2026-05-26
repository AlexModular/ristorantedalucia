import { client } from '@/sanity/lib/client'
import type { MetadataRoute } from 'next'

// ISR: rigenerata ogni ora. Su Vercel Hobby (timeout 10s) è sicuro perché
// Sanity CDN risponde in < 1s. La versione cached viene servita sempre
// durante la rigenerazione (stale-while-revalidate).
export const revalidate = 3600

const BASE_URL = 'https://ristorantedalucia.it'
const LOCALES = ['it', 'en'] as const

// ── Sanity queries (no typegen needed — sitemap runs at build time) ───────────

const PAGES_QUERY = `*[_type == "page" && defined(slug.it.current) && !(_id in path("drafts.**"))]{
  "slugIt": slug.it.current,
  "slugEn": coalesce(slug.en.current, slug.it.current),
  _updatedAt
}`

const LOCATIONS_QUERY = `*[_type == "locations" && defined(slug.it.current) && !(_id in path("drafts.**"))]{
  "slugIt": slug.it.current,
  "slugEn": coalesce(slug.en.current, slug.it.current),
  _updatedAt
}`

const POSTS_QUERY = `*[_type == "post" && defined(slug.it.current) && !(_id in path("drafts.**"))]{
  "slugIt": slug.it.current,
  "slugEn": coalesce(slug.en.current, slug.it.current),
  publishedAt,
  _updatedAt
}`

type SanityItem = {
  slugIt: string
  slugEn: string
  _updatedAt: string
  publishedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, locations, posts] = await Promise.all([
    client.fetch<SanityItem[]>(PAGES_QUERY),
    client.fetch<SanityItem[]>(LOCATIONS_QUERY),
    client.fetch<SanityItem[]>(POSTS_QUERY),
  ])

  const entries: MetadataRoute.Sitemap = []

  // ── Root / homepage ─────────────────────────────────────────────────────────
  // Find the home slug (matches "home*")
  const homeIt = pages.find((p) => p.slugIt.startsWith('home'))
  const homeDate = homeIt?._updatedAt

  LOCALES.forEach((locale) => {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: homeDate ? new Date(homeDate) : new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'it-IT': `${BASE_URL}/it`,
          'en-US': `${BASE_URL}/en`,
        },
      },
    })
  })

  // ── Pages ────────────────────────────────────────────────────────────────────
  for (const page of pages) {
    if (page.slugIt.startsWith('home')) continue // already added above

    entries.push({
      url: `${BASE_URL}/it/${page.slugIt}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'it-IT': `${BASE_URL}/it/${page.slugIt}`,
          'en-US': `${BASE_URL}/en/${page.slugEn}`,
        },
      },
    })
    if (page.slugEn !== page.slugIt) {
      entries.push({
        url: `${BASE_URL}/en/${page.slugEn}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            'it-IT': `${BASE_URL}/it/${page.slugIt}`,
            'en-US': `${BASE_URL}/en/${page.slugEn}`,
          },
        },
      })
    }
  }

  // ── Locations ────────────────────────────────────────────────────────────────
  for (const loc of locations) {
    entries.push({
      url: `${BASE_URL}/it/location/${loc.slugIt}`,
      lastModified: new Date(loc._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          'it-IT': `${BASE_URL}/it/location/${loc.slugIt}`,
          'en-US': `${BASE_URL}/en/location/${loc.slugEn}`,
        },
      },
    })
    if (loc.slugEn !== loc.slugIt) {
      entries.push({
        url: `${BASE_URL}/en/location/${loc.slugEn}`,
        lastModified: new Date(loc._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            'it-IT': `${BASE_URL}/it/location/${loc.slugIt}`,
            'en-US': `${BASE_URL}/en/location/${loc.slugEn}`,
          },
        },
      })
    }
  }

  // ── Posts ────────────────────────────────────────────────────────────────────
  for (const post of posts) {
    const modified = new Date(post.publishedAt ?? post._updatedAt)
    entries.push({
      url: `${BASE_URL}/it/news/${post.slugIt}`,
      lastModified: modified,
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          'it-IT': `${BASE_URL}/it/news/${post.slugIt}`,
          'en-US': `${BASE_URL}/en/news/${post.slugEn}`,
        },
      },
    })
    if (post.slugEn !== post.slugIt) {
      entries.push({
        url: `${BASE_URL}/en/news/${post.slugEn}`,
        lastModified: modified,
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: {
          languages: {
            'it-IT': `${BASE_URL}/it/news/${post.slugIt}`,
            'en-US': `${BASE_URL}/en/news/${post.slugEn}`,
          },
        },
      })
    }
  }

  return entries
}
