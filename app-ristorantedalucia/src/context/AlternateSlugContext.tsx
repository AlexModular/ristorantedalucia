'use client'

/**
 * AlternateSlugContext
 *
 * Allows any page to register its own localized slugs so the
 * language switcher in the Navigation can redirect to the correct
 * translated URL instead of naïvely swapping the locale prefix.
 *
 * Usage from a page (server component):
 *   <AlternateSlugProvider slugIt="contattaci" slugEn="contact-us" />
 *
 * The Navigation reads the context to build the alternate href.
 */

import { createContext, useContext, useState } from 'react'

export type AlternateSlugs = {
  /** Slug without locale prefix, e.g. "contattaci" */
  slugIt: string
  /** Slug without locale prefix, e.g. "contact-us" */
  slugEn: string
  /** Optional sub-path prefix, e.g. "location" or "news" */
  prefix?: string
}

type AlternateSlugContextValue = {
  alternates: AlternateSlugs | null
  setAlternates: (slugs: AlternateSlugs | null) => void
}

export const AlternateSlugContext = createContext<AlternateSlugContextValue>({
  alternates: null,
  setAlternates: () => {},
})

export function AlternateSlugContextProvider({ children }: { children: React.ReactNode }) {
  const [alternates, setAlternates] = useState<AlternateSlugs | null>(null)
  return (
    <AlternateSlugContext.Provider value={{ alternates, setAlternates }}>
      {children}
    </AlternateSlugContext.Provider>
  )
}

export function useAlternateSlugs() {
  return useContext(AlternateSlugContext)
}
