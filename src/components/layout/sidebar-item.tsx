'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
  isActive: boolean
  isCollapsed: boolean
  badge?: number
  onClick?: () => void
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive,
  isCollapsed,
  badge,
  onClick,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-cbd-green/10 text-cbd-green'
          : 'text-cbd-gray-light hover:bg-cbd-black-secondary hover:text-white'
      )}
    >
      {/* Active indicator - green left border */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-full bg-cbd-green glow-green" />
      )}

      <Icon
        className={cn(
          'h-5 w-5 flex-shrink-0 transition-colors',
          isActive ? 'text-cbd-green' : 'text-cbd-gray group-hover:text-white'
        )}
      />

      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cbd-green/20 px-1.5 text-xs font-semibold text-cbd-green">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}

      {isCollapsed && badge !== undefined && badge > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cbd-green px-1 text-[10px] font-bold text-black">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  )
}
