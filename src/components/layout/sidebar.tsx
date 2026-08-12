'use client'

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
  Truck,
  ShoppingCart,
  ClipboardList,
  Users,
  Heart,
  Megaphone,
  BarChart3,
  Bell,
  ScrollText,
  UserCog,
  Bot,
  BrainCircuit,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Leaf,
} from 'lucide-react'

interface NavItem {
  icon: typeof LayoutDashboard
  label: string
  href: string
  permission?: Permission
  badge?: number
}

const navigationItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Store, label: 'Stores', href: '/dashboard/stores', permission: Permission.VIEW_STORES },
  { icon: Package, label: 'Products', href: '/dashboard/products', permission: Permission.VIEW_PRODUCTS },
  { icon: Boxes, label: 'Inventory', href: '/dashboard/inventory', permission: Permission.VIEW_INVENTORY },
  { icon: ArrowLeftRight, label: 'Transfers', href: '/dashboard/transfers', permission: Permission.TRANSFER_INVENTORY },
  { icon: Truck, label: 'Suppliers', href: '/dashboard/suppliers', permission: Permission.VIEW_PRODUCTS },
  { icon: ShoppingCart, label: 'Sales', href: '/dashboard/sales', permission: Permission.VIEW_SALES },
  { icon: ClipboardList, label: 'Orders', href: '/dashboard/orders', permission: Permission.VIEW_ORDERS },
  { icon: Users, label: 'Customers', href: '/dashboard/customers', permission: Permission.VIEW_CUSTOMERS },
  { icon: Heart, label: 'Loyalty', href: '/dashboard/loyalty', permission: Permission.VIEW_CUSTOMERS },
  { icon: Megaphone, label: 'Marketing', href: '/dashboard/marketing', permission: Permission.VIEW_CAMPAIGNS },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics', permission: Permission.VIEW_ANALYTICS },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: ScrollText, label: 'Audit Log', href: '/dashboard/audit', permission: Permission.VIEW_AUDIT_LOGS },
  { icon: UserCog, label: 'Employees', href: '/dashboard/employees', permission: Permission.VIEW_USERS },
  { icon: Bot, label: 'AI Assistant', href: '/dashboard/ai-assistant' },
  { icon: BrainCircuit, label: 'Predicciones IA', href: '/dashboard/ai-predictions' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', permission: Permission.VIEW_SETTINGS },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleCollapsed } = useSidebarStore()

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col h-screen bg-cbd-black border-r border-white/5 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/5 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cbd-green/10">
          <Leaf className="h-5 w-5 text-cbd-green" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">CBD SaaS</span>
            <span className="text-[10px] text-cbd-gray">Franchise Management</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navigationItems.map((item) => (
          <SidebarNavItem key={item.href} item={item} pathname={pathname} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* Collapse Button */}
      <div className="border-t border-white/5 p-3">
        <button
          onClick={toggleCollapsed}
          className="flex w-full items-center justify-center rounded-lg p-2 text-cbd-gray hover:bg-cbd-black-secondary hover:text-white transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronsRight className="h-5 w-5" />
          ) : (
            <ChevronsLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  )
}

function SidebarNavItem({
  item,
  pathname,
  isCollapsed,
}: {
  item: NavItem
  pathname: string
  isCollapsed: boolean
}) {
  // Check permission if required
  const hasPermission = useHasPermission(item.permission ?? Permission.VIEW_SETTINGS)

  // Always show Dashboard (no permission needed)
  if (item.permission && !hasPermission) {
    return null
  }

  const isActive =
    item.href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(item.href)

  return (
    <SidebarItem
      icon={item.icon}
      label={item.label}
      href={item.href}
      isActive={isActive}
      isCollapsed={isCollapsed}
      badge={item.badge}
    />
  )
}
