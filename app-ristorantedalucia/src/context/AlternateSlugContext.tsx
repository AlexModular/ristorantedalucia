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
  /** When true, the Navigation always uses the sticky (solid bg) style */
  forceSticky: boolean
  setForceSticky: (v: boolean) => void
}

export const AlternateSlugContext = createContext<AlternateSlugContextValue>({
  alternates: null,
  setAlternates: () => {},
  forceSticky: false,
  setForceSticky: () => {},
})

export function AlternateSlugContextProvider({ children }: { children: React.ReactNode }) {
  const [alternates, setAlternates] = useState<AlternateSlugs | null>(null)
  const [forceSticky, setForceSticky] = useState(false)
  return (
    <AlternateSlugContext.Provider value={{ alternates, setAlternates, forceSticky, setForceSticky }}>
      {children}
    </AlternateSlugContext.Provider>
  )
}

export function useAlternateSlugs() {
  return useContext(AlternateSlugContext)
}

export function useForceSticky() {
  const { forceSticky, setForceSticky } = useContext(AlternateSlugContext)
  return { forceSticky, setForceSticky }
}
