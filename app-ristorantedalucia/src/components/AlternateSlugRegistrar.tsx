'use client'

/**
 * AlternateSlugRegistrar
 *
 * A tiny client component placed in server-component pages to register
 * the localized slugs for the current page into AlternateSlugContext.
 *
 * Example (in a server page):
 *   <AlternateSlugRegistrar slugIt="contattaci" slugEn="contact-us" />
 *   <AlternateSlugRegistrar slugIt="bologna-centro" slugEn="bologna-city-centre" prefix="location" />
 */

import { useEffect } from 'react'
import { useAlternateSlugs, type AlternateSlugs } from '@/context/AlternateSlugContext'

export default function AlternateSlugRegistrar(props: AlternateSlugs) {
  const { setAlternates } = useAlternateSlugs()

  useEffect(() => {
    setAlternates(props)
    return () => setAlternates(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.slugIt, props.slugEn, props.prefix])

  return null
}
