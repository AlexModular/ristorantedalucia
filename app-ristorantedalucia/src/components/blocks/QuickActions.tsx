'use client'

import React from 'react'
import * as LucideIcons from 'lucide-react'
import { TransformedQuickActions } from '../../../sanity.types.custom'
import { Link } from '@/i18n/routing'

const DynamicLucideIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.ElementType
  if (!IconComponent) return <LucideIcons.HelpCircle className={className} strokeWidth={1.5} />
  return <IconComponent className={className} strokeWidth={1.5} />
}

export default function QuickActions({ item }: { item: TransformedQuickActions }) {
  if (!item.actions || item.actions.length === 0) return null

  return (
    <section className="quick-actions-bar box py-0">
      <div className="flex flex-row items-center w-full overflow-hidden bg-white border-y border-black/10">
        {item.actions.map((action, index) => {
          const isLast = index === (item.actions?.length ?? 0) - 1
          const isPhone = !!action.link?.phone
          const href = isPhone 
            ? `tel:${action.link?.phone}` 
            : (action.link?.externalUrl || (action.link?.slug ? `/${action.link.slug}` : '#'))
          const isExternal = !!action.link?.externalUrl

          const content = (
            <>
              <div className="mb-2 md:mb-0 md:mr-4 transition-transform duration-300 group-hover:scale-110">
                <DynamicLucideIcon name={action.icon || 'HelpCircle'} className="w-5 h-5 md:w-6 md:h-6 text-black" />
              </div>
              <span className="family-montserrat text-sm md:text-lg uppercase tracking-widest text-black">
                {action.label}
              </span>
            </>
          )

          const className = "flex-1 flex flex-col md:flex-row items-center justify-center py-6 md:py-8 transition-all duration-300 hover:bg-gray-50 group text-black"

          return (
            <React.Fragment key={index}>
              {isPhone ? (
                <a href={href} className={className}>
                  {content}
                </a>
              ) : (
                <Link
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  className={className}
                >
                  {content}
                </Link>
              )}
              
              {!isLast && (
                <div className="h-8 md:h-12 w-[1px] bg-black opacity-20 self-center"></div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </section>
  )
}
