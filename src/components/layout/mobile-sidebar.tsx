'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useHasPermission } from '@/hooks/use-session'
import { Permission } from '@/lib/auth/permissions'
import { SidebarItem } from './sidebar-item'
import {
  LayoutDashboard,
  Store,
  Package,
  Boxes,
  ArrowLeftRight,
  ShoppingCart,
  ClipboardList,
  Users,
  Heart,
  Megaphone,
  BarChart3,
  UserCog,
  Settings,
  X,
  Leaf,
} from 'lucide-react'

interface NavItem {
  icon: typeof LayoutDashboard
  label: string
  href: string
  permission?: Permission
}

const navigationItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Store, label: 'Stores', href: '/dashboard/stores', permission: Permission.VIEW_STORES },
  { icon: Package, label: 'Products', href: '/dashboard/products', permission: Permission.VIEW_PRODUCTS },
  { icon: Boxes, label: 'Inventory', href: '/dashboard/inventory', permission: Permission.VIEW_INVENTORY },
  { icon: ArrowLeftRight, label: 'Transfers', href: '/dashboard/transfers', permission: Permission.TRANSFER_INVENTORY },
  { icon: ShoppingCart, label: 'Sales', href: '/dashboard/sales', permission: Permission.VIEW_SALES },
  { icon: ClipboardList, label: 'Orders', href: '/dashboard/orders', permission: Permission.VIEW_ORDERS },
  { icon: Users, label: 'Customers', href: '/dashboard/customers', permission: Permission.VIEW_CUSTOMERS },
  { icon: Heart, label: 'Loyalty', href: '/dashboard/loyalty', permission: Permission.VIEW_CUSTOMERS },
  { icon: Megaphone, label: 'Marketing', href: '/dashboard/marketing', permission: Permission.VIEW_CAMPAIGNS },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics', permission: Permission.VIEW_ANALYTICS },
  { icon: UserCog, label: 'Employees', href: '/dashboard/employees', permission: Permission.VIEW_USERS },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', permission: Permission.VIEW_SETTINGS },
]

export function MobileSidebar() {
  const pathname = usePathname()
  const { isMobileOpen, setMobileOpen } = useSidebarStore()

  // Close on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname, setMobileOpen])

  // Prevent body scroll when open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  if (!isMobileOpen) return null

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-72 bg-cbd-black border-r border-white/5 flex flex-col animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cbd-green/10">
              <Leaf className="h-5 w-5 text-cbd-green" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">CBD SaaS</span>
              <span className="text-[10px] text-cbd-gray">Franchise Management</span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-cbd-black-secondary transition-colors"
          >
            <X className="h-5 w-5 text-cbd-gray" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navigationItems.map((item) => (
            <MobileNavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
      </div>
    </div>
  )
}

function MobileNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasPermission = useHasPermission(item.permission ?? Permission.VIEW_SETTINGS)

  if (item.permission && !hasPermission) {
    return null
  }

  const isActive =
    item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href)

  return (
    <SidebarItem
      icon={item.icon}
      label={item.label}
      href={item.href}
      isActive={isActive}
      isCollapsed={false}
    />
  )
}
