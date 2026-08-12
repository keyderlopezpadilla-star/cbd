'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateBreadcrumbSchema } from '@/lib/seo/schema'

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href,
  }))

  const schema = generateBreadcrumbSchema(schemaItems)

  return (
    <nav aria-label="Breadcrumb" className={cn('w-full', className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex items-center flex-wrap gap-1 text-sm text-cbd-gray-light">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-cbd-green transition-colors min-w-[44px] min-h-[44px] justify-center sm:min-w-0 sm:min-h-0 sm:justify-start"
            aria-label="Inicio"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="h-3 w-3 mx-1 text-cbd-gray-light/50 flex-shrink-0" />
              {isLast ? (
                <span
                  className="text-cbd-green font-medium truncate max-w-[150px] sm:max-w-[250px] md:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-cbd-green transition-colors truncate max-w-[100px] sm:max-w-[200px] md:max-w-none min-h-[44px] flex items-center sm:min-h-0"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
