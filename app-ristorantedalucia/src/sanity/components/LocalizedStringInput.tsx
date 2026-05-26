/**
 * Custom Sanity Studio input for `localizedString`.
 *
 * Shows a single text input with 🇮🇹 / 🇬🇧 flag buttons to switch locale,
 * instead of two stacked labeled inputs.
 */
'use client'

import { useState } from 'react'
import { set, unset, PatchEvent } from 'sanity'
import type { ObjectInputProps } from 'sanity'

type Locale = 'it' | 'en'

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
]

export function LocalizedStringInput(props: ObjectInputProps) {
  const { value, onChange, readOnly, elementProps } = props
  const [activeLocale, setActiveLocale] = useState<Locale>('it')

  const currentValue =
    (value as Record<string, string> | undefined)?.[activeLocale] ?? ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.currentTarget.value
    onChange(PatchEvent.from(
      newVal ? set(newVal, [activeLocale]) : unset([activeLocale])
    ))
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%',
      }}
    >
      {/* Flag toggle buttons */}
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
              borderRight: loc.code === 'it' ? '1px solid var(--card-border-color, #e0e0e0)' : 'none',
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

      {/* Single text input for the active locale */}
      <input
        {...elementProps}
        type="text"
        value={currentValue}
        onChange={handleChange}
        disabled={readOnly}
        placeholder={`${LOCALES.find((l) => l.code === activeLocale)?.label}…`}
        style={{
          flex: 1,
          height: '35px',
          padding: '0 12px',
          fontSize: '14px',
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
    </div>
  )
}
