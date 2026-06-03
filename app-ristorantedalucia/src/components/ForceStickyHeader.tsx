'use client'

/**
 * ForceStickyHeader
 *
 * Render this (zero-output) component in any server page that does NOT have
 * a hero/intro image, to make the Navigation always display in its sticky
 * (solid background) style instead of the transparent overlay mode.
 *
 * Example:
 *   export default async function NewsPage() {
 *     return (
 *       <main>
 *         <ForceStickyHeader />
 *         ...
 *       </main>
 *     )
 *   }
 */

import { useEffect } from 'react'
import { useForceSticky } from '@/context/AlternateSlugContext'

export default function ForceStickyHeader() {
  const { setForceSticky } = useForceSticky()

  useEffect(() => {
    setForceSticky(true)
    return () => setForceSticky(false)
  }, [setForceSticky])

  return null
}
