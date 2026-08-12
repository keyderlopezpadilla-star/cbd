'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  stores: 'Stores',
  products: 'Products',
  inventory: 'Inventory',
  transfers: 'Transfers',
  sales: 'Sales',
  orders: 'Orders',
  customers: 'Customers',
  loyalty: 'Loyalty',
  marketing: 'Marketing',
  analytics: 'Analytics',
  employees: 'Employees',
  settings: 'Settings',
  profile: 'Profile',
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length <= 1) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-cbd-gray" />
        <span className="text-white font-medium">Dashboard</span>
      </div>
    )
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        href="/dashboard"
        className="flex items-center text-cbd-gray hover:text-white transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      {segments.slice(1).map((segment, index) => {
        const href = '/' + segments.slice(0, index + 2).join('/')
        const isLast = index === segments.length - 2
        const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <div key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-cbd-gray/50" />
            {isLast ? (
              <span className="text-white font-medium">{label}</span>
            ) : (
              <Link
                href={href}
                className="text-cbd-gray hover:text-white transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
