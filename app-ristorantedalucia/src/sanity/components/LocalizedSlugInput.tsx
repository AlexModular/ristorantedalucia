/**
 * Custom Sanity Studio input for `localizedSlug`.
 * Shows 🇮🇹 / 🇬🇧 flag tabs — each tab renders a standard slug input
 * bound to the correct locale sub-field (slug.it / slug.en).
 */
'use client'

import { useState } from 'react'
import { set, unset, PatchEvent } from 'sanity'
import type { ObjectInputProps, SlugValue } from 'sanity'

type Locale = 'it' | 'en'

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
]

/** Slugify a string: lowercase, replace spaces/special chars with hyphens */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function LocalizedSlugInput(props: ObjectInputProps) {
  const { value, onChange, readOnly } = props
  const [activeLocale, setActiveLocale] = useState<Locale>('it')

  // Get the current slug value for the active locale
  const currentSlug =
    (value as Record<string, SlugValue> | undefined)?.[activeLocale]?.current ?? ''

  // Title source for the 🇮🇹 "Genera" button — read from the value prop
  const titleIt = (props.value as Record<string, { current?: string } | undefined> | undefined)?.it?.current ?? '';

  const handleChange = (newCurrent: string) => {
    const slugVal = newCurrent ? { _type: 'slug', current: newCurrent } : undefined
    onChange(PatchEvent.from(
      slugVal ? set(slugVal, [activeLocale]) : unset([activeLocale])
    ))
  }

  const handleGenerate = () => {
    const source = titleIt ?? ''
    if (!source) return
    handleChange(slugify(source))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Flag toggle row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div
          style={{
            display: 'flex',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid var(--card-border-color, #e0e0e0)',
            flexShrink: 0,
          }}
        >
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              type="button"
              title={loc.label}
              onClick={() => setActiveLocale(loc.code)}
              style={{
                cursor: 'pointer',
                padding: '6px 10px',
                fontSize: '18px',
                lineHeight: 1,
                border: 'none',
                borderRight:
                  loc.code === 'it'
                    ? '1px solid var(--card-border-color, #e0e0e0)'
                    : 'none',
                background:
                  activeLocale === loc.code
                    ? 'var(--card-focus-ring-color, rgba(99,102,241,0.15))'
                    : 'var(--card-bg-color, #fff)',
                transition: 'background 0.15s',
                outline:
                  activeLocale === loc.code
                    ? '2px solid var(--card-focus-ring-color, #6366f1)'
                    : 'none',
                outlineOffset: '-2px',
              }}
            >
              {loc.flag}
            </button>
          ))}
        </div>

        {/* Slug text input */}
        <input
          type="text"
          value={currentSlug}
          onChange={(e) => handleChange(e.currentTarget.value)}
          disabled={readOnly}
          placeholder={`${LOCALES.find((l) => l.code === activeLocale)?.label} slug…`}
          style={{
            flex: 1,
            height: '35px',
            padding: '0 12px',
            fontSize: '14px',
            fontFamily: 'monospace',
            borderRadius: '6px',
            border: '1px solid var(--card-border-color, #e0e0e0)',
            background: 'var(--card-bg-color, #fff)',
            color: 'var(--card-fg-color, #111)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline =
              '2px solid var(--card-focus-ring-color, #6366f1)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
          }}
        />

        {/* Generate button (only for IT locale, the source locale) */}
        {activeLocale === 'it' && (
          <button
            type="button"
            onClick={handleGenerate}
            title="Generate from Italian title"
            style={{
              cursor: 'pointer',
              padding: '0 12px',
              height: '35px',
              fontSize: '12px',
              borderRadius: '6px',
              border: '1px solid var(--card-border-color, #e0e0e0)',
              background: 'var(--card-bg-color, #fff)',
              color: 'var(--card-fg-color, #111)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ↻ Genera
          </button>
        )}
      </div>

      {/* Preview URL */}
      {currentSlug && (
        <div
          style={{
            fontSize: '11px',
            color: 'var(--card-muted-fg-color, #888)',
            fontFamily: 'monospace',
            padding: '4px 8px',
            background: 'var(--card-code-bg-color, rgba(0,0,0,0.04))',
            borderRadius: '4px',
          }}
        >
          /{activeLocale}/{currentSlug}
        </div>
      )}
    </div>
  )
}
