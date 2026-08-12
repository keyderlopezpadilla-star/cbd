'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Settings,
  Bell,
  LogOut,
  Store,
  FileText,
  HelpCircle,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface MobileNavProps {
  className?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
  { label: 'Ventas', href: '/dashboard/sales', icon: <ShoppingCart className="h-5 w-5" /> },
  { label: 'Inventario', href: '/dashboard/inventory', icon: <Package className="h-5 w-5" /> },
  { label: 'Analiticas', href: '/dashboard/analytics', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Clientes', href: '/dashboard/customers', icon: <Users className="h-5 w-5" /> },
  { label: 'Tiendas', href: '/dashboard/stores', icon: <Store className="h-5 w-5" /> },
  { label: 'Blog', href: '/blog', icon: <FileText className="h-5 w-5" /> },
  { label: 'FAQ', href: '/faq', icon: <HelpCircle className="h-5 w-5" /> },
]

const SECONDARY_ITEMS: NavItem[] = [
  { label: 'Notificaciones', href: '/dashboard/notifications', icon: <Bell className="h-5 w-5" /> },
  { label: 'Configuracion', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
]

export function MobileNav({ className }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('md:hidden', className)}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/10 transition-colors"
        aria-label="Abrir menu de navegacion"
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-cbd-dark border-r border-white/10 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegacion"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cbd-green to-cbd-green-dark" />
                  <span className="text-lg font-bold text-white">CBD SaaS</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-11 h-11 rounded-lg text-cbd-gray-light hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Cerrar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg text-cbd-gray-light hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Secondary Section */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-cbd-gray-light/60">
                    Cuenta
                  </p>
                  <ul className="space-y-1">
                    {SECONDARY_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg text-cbd-gray-light hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {item.icon}
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* Footer - Logout */}
              <div className="p-3 border-t border-white/10">
                <button
                  className="flex items-center gap-3 w-full px-3 py-3 min-h-[44px] rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Cerrar Sesion</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
