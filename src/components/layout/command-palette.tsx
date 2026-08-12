'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { useCommandPaletteStore } from '@/stores/command-palette-store'
import { cn } from '@/lib/utils'
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
  Plus,
  FileText,
  Search,
} from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  icon: typeof LayoutDashboard
  href?: string
  action?: () => void
  group: 'navigation' | 'stores' | 'products' | 'actions'
}

const navigationCommands: CommandItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', group: 'navigation' },
  { id: 'nav-stores', label: 'Stores', icon: Store, href: '/dashboard/stores', group: 'navigation' },
  { id: 'nav-products', label: 'Products', icon: Package, href: '/dashboard/products', group: 'navigation' },
  { id: 'nav-inventory', label: 'Inventory', icon: Boxes, href: '/dashboard/inventory', group: 'navigation' },
  { id: 'nav-transfers', label: 'Transfers', icon: ArrowLeftRight, href: '/dashboard/transfers', group: 'navigation' },
  { id: 'nav-sales', label: 'Sales', icon: ShoppingCart, href: '/dashboard/sales', group: 'navigation' },
  { id: 'nav-orders', label: 'Orders', icon: ClipboardList, href: '/dashboard/orders', group: 'navigation' },
  { id: 'nav-customers', label: 'Customers', icon: Users, href: '/dashboard/customers', group: 'navigation' },
  { id: 'nav-loyalty', label: 'Loyalty', icon: Heart, href: '/dashboard/loyalty', group: 'navigation' },
  { id: 'nav-marketing', label: 'Marketing', icon: Megaphone, href: '/dashboard/marketing', group: 'navigation' },
  { id: 'nav-analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics', group: 'navigation' },
  { id: 'nav-employees', label: 'Employees', icon: UserCog, href: '/dashboard/employees', group: 'navigation' },
  { id: 'nav-settings', label: 'Settings', icon: Settings, href: '/dashboard/settings', group: 'navigation' },
]

const storeCommands: CommandItem[] = [
  { id: 'store-madrid', label: 'Madrid Centro', icon: Store, href: '/dashboard/stores/1', group: 'stores' },
  { id: 'store-valencia', label: 'Valencia Puerto', icon: Store, href: '/dashboard/stores/2', group: 'stores' },
  { id: 'store-barcelona', label: 'Barcelona Gotico', icon: Store, href: '/dashboard/stores/3', group: 'stores' },
  { id: 'store-alicante', label: 'Alicante Marina', icon: Store, href: '/dashboard/stores/4', group: 'stores' },
  { id: 'store-sevilla', label: 'Sevilla Triana', icon: Store, href: '/dashboard/stores/5', group: 'stores' },
]

const productCommands: CommandItem[] = [
  { id: 'product-oils', label: 'Aceites CBD', icon: Package, href: '/dashboard/products?category=oils', group: 'products' },
  { id: 'product-cosmetics', label: 'Cosmetica', icon: Package, href: '/dashboard/products?category=cosmetics', group: 'products' },
  { id: 'product-flowers', label: 'Flores', icon: Package, href: '/dashboard/products?category=flowers', group: 'products' },
]

const actionCommands: CommandItem[] = [
  { id: 'action-new-order', label: 'Crear nuevo pedido', icon: Plus, href: '/dashboard/orders/new', group: 'actions' },
  { id: 'action-new-transfer', label: 'Nueva transferencia', icon: ArrowLeftRight, href: '/dashboard/transfers/new', group: 'actions' },
  { id: 'action-report', label: 'Generar reporte', icon: FileText, href: '/dashboard/analytics', group: 'actions' },
  { id: 'action-new-product', label: 'Agregar producto', icon: Plus, href: '/dashboard/products/new', group: 'actions' },
]

const allCommands = [...navigationCommands, ...storeCommands, ...productCommands, ...actionCommands]

export function CommandPalette() {
  const router = useRouter()
  const { isOpen, setOpen } = useCommandPaletteStore()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!isOpen)
      }
    },
    [isOpen, setOpen]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const runCommand = (command: CommandItem) => {
    setOpen(false)
    if (command.href) {
      router.push(command.href)
    }
    if (command.action) {
      command.action()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Command Dialog */}
      <div className="absolute left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2">
        <Command
          className="rounded-xl glass-strong border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
          loop
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="h-4 w-4 text-cbd-gray mr-2 flex-shrink-0" />
            <Command.Input
              placeholder="Buscar comandos, paginas, tiendas..."
              className="flex h-12 w-full bg-transparent text-sm text-white placeholder:text-cbd-gray outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-white/10 bg-cbd-black px-1.5 font-mono text-[10px] font-medium text-cbd-gray">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-4 py-8 text-center text-sm text-cbd-gray">
              No se encontraron resultados.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group heading="Navegacion" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-cbd-gray">
              {navigationCommands.map((command) => (
                <CommandItemComponent key={command.id} command={command} onSelect={runCommand} />
              ))}
            </Command.Group>

            {/* Stores Group */}
            <Command.Group heading="Tiendas" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-cbd-gray">
              {storeCommands.map((command) => (
                <CommandItemComponent key={command.id} command={command} onSelect={runCommand} />
              ))}
            </Command.Group>

            {/* Products Group */}
            <Command.Group heading="Productos" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-cbd-gray">
              {productCommands.map((command) => (
                <CommandItemComponent key={command.id} command={command} onSelect={runCommand} />
              ))}
            </Command.Group>

            {/* Actions Group */}
            <Command.Group heading="Acciones" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-cbd-gray">
              {actionCommands.map((command) => (
                <CommandItemComponent key={command.id} command={command} onSelect={runCommand} />
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

function CommandItemComponent({
  command,
  onSelect,
}: {
  command: CommandItem
  onSelect: (command: CommandItem) => void
}) {
  const Icon = command.icon
  return (
    <Command.Item
      value={command.label}
      onSelect={() => onSelect(command)}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cbd-gray-light cursor-pointer data-[selected=true]:bg-cbd-green/10 data-[selected=true]:text-white transition-colors"
    >
      <Icon className="h-4 w-4 text-cbd-gray data-[selected=true]:text-cbd-green flex-shrink-0" />
      <span>{command.label}</span>
    </Command.Item>
  )
}
