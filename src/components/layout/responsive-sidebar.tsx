'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Settings,
  Store,
  Megaphone,
  Shield,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface ResponsiveSidebarProps {
  className?: string
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
  { label: 'Ventas', href: '/dashboard/sales', icon: <ShoppingCart className="h-5 w-5" /> },
  { label: 'Inventario', href: '/dashboard/inventory', icon: <Package className="h-5 w-5" /> },
  { label: 'Analiticas', href: '/dashboard/analytics', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Clientes', href: '/dashboard/customers', icon: <Users className="h-5 w-5" /> },
  { label: 'Tiendas', href: '/dashboard/stores', icon: <Store className="h-5 w-5" /> },
  { label: 'Marketing', href: '/dashboard/marketing', icon: <Megaphone className="h-5 w-5" /> },
  { label: 'Compliance', href: '/dashboard/compliance', icon: <Shield className="h-5 w-5" /> },
  { label: 'Configuracion', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
]

export function ResponsiveSidebar({ className }: ResponsiveSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Swipe gesture area indicator (mobile) - shows a thin strip on the left edge */}
      <div
        className="fixed top-0 left-0 bottom-0 w-2 z-30 lg:hidden"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-r from-cbd-green/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'hidden lg:flex flex-col h-screen border-r border-white/10 bg-cbd-dark',
          'sticky top-0 z-20',
          className
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/10">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cbd-green to-cbd-green-dark flex-shrink-0" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-3 text-lg font-bold text-white whitespace-nowrap"
            >
              CBD SaaS
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg transition-colors',
                    'text-cbd-gray-light hover:text-white hover:bg-white/5',
                    'min-h-[44px]',
                    isCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-3'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              'flex items-center gap-2 w-full rounded-lg text-cbd-gray-light hover:text-white hover:bg-white/5 transition-colors min-h-[44px]',
              isCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-3'
            )}
            aria-label={isCollapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <>
                <PanelLeftClose className="h-5 w-5" />
                <span className="text-sm font-medium">Colapsar</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  )
}
