'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Bell,
  Menu,
} from 'lucide-react'

interface BottomNavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

interface BottomNavProps {
  className?: string
  activeItem?: string
  notificationCount?: number
}

export function BottomNav({
  className,
  activeItem = 'dashboard',
  notificationCount = 0,
}: BottomNavProps) {
  const [active, setActive] = useState(activeItem)

  const items: BottomNavItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: 'Ventas',
      href: '/dashboard/sales',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      label: 'Inventario',
      href: '/dashboard/inventory',
      icon: <Package className="h-5 w-5" />,
    },
    {
      label: 'Notificaciones',
      href: '/dashboard/notifications',
      icon: <Bell className="h-5 w-5" />,
      badge: notificationCount,
    },
    {
      label: 'Menu',
      href: '#menu',
      icon: <Menu className="h-5 w-5" />,
    },
  ]

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 md:hidden',
        'border-t border-white/10',
        'bg-cbd-dark/80 backdrop-blur-xl',
        'safe-area-bottom',
        className
      )}
      aria-label="Navegacion principal movil"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {items.map((item) => {
          const isActive = active === item.label.toLowerCase()
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label.toLowerCase())}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'min-w-[56px] min-h-[56px] px-2 py-2 rounded-xl',
                'transition-colors duration-200',
                isActive
                  ? 'text-cbd-green'
                  : 'text-cbd-gray-light hover:text-white'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-0 bg-cbd-green/10 rounded-xl border border-cbd-green/20"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon with badge */}
              <span className="relative z-10">
                {item.icon}
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                ) : null}
              </span>

              {/* Label */}
              <span className="relative z-10 text-[10px] font-medium mt-1">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
