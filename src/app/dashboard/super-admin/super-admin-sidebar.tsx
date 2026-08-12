'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Users,
  Activity,
  Brain,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Overview',
    href: '/dashboard/super-admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Organizaciones',
    href: '/dashboard/super-admin/organizations',
    icon: Building2,
  },
  {
    label: 'Usuarios',
    href: '/dashboard/super-admin/users',
    icon: Users,
  },
  {
    label: 'Monitoring',
    href: '/dashboard/super-admin/monitoring',
    icon: Activity,
  },
  {
    label: 'AI Usage',
    href: '/dashboard/super-admin/ai-usage',
    icon: Brain,
  },
]

export function SuperAdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0">
      <nav className="space-y-1">
        <div className="px-3 py-2 mb-3">
          <h3 className="text-xs font-semibold text-cbd-gray-light uppercase tracking-wider">
            Super Admin
          </h3>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-cbd-green/10 text-cbd-green border border-cbd-green/30'
                  : 'text-cbd-gray-light hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
