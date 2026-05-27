import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Genera l'icona principale dal file sorgente ad alta risoluzione.
 * Usata da Next.js come:
 *   - /icon (favicon fallback PNG per browser che non supportano SVG)
 *   - /apple-icon (apple-touch-icon per iOS, 180x180)
 *
 * Il favicon principale è /favicon.svg (adattivo dark/light via CSS media query).
 */
export default function Icon() {
  const imgData = readFileSync(join(process.cwd(), 'public/images/favicon-black.png'))
  const base64 = `data:image/png;base64,${imgData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={base64} width={180} height={180} alt="" />
      </div>
    ),
    { ...size }
  )
}
