import type { LocalizedString } from '../../sanity.types'

type AltValue =
  | string
  | LocalizedString
  | Array<LocalizedString | { _type: string; it?: string; en?: string }>
  | null
  | undefined

/**
 * Resolves a Sanity `alt` field that can be:
 *   - a plain `string`  (already resolved by GROQ coalesce at runtime)
 *   - a `LocalizedString` object  { it?: string; en?: string }
 *   - an array of LocalizedString objects  (legacy multi-locale shape)
 *   - null / undefined
 *
 * TypeScript typegen reflects all shapes from the schema; this helper
 * narrows the full union to a plain string safely.
 */
export function resolveAlt(
  value: AltValue,
  locale = 'it',
  fallback = ''
): string {
  if (!value) return fallback

  // Plain string — already resolved by GROQ
  if (typeof value === 'string') return value || fallback

  // Array of LocalizedString objects (legacy multi-locale)
  if (Array.isArray(value)) {
    const first = value[0] as { it?: string; en?: string } | undefined
    return first?.[locale as 'it' | 'en'] ?? first?.it ?? fallback
  }

  // LocalizedString object
  const loc = value as LocalizedString
  return loc[locale as 'it' | 'en'] ?? loc.it ?? fallback
}
