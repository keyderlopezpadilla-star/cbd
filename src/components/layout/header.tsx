'use client'

import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useCommandPaletteStore } from '@/stores/command-palette-store'
import { UserMenu } from '@/components/auth/user-menu'
import { Breadcrumbs } from './breadcrumbs'
import { NotificationsPanel } from './notifications-panel'
import { Menu, Search } from 'lucide-react'

export function Header() {
  const { toggleMobileOpen } = useSidebarStore()
  const { setOpen: openCommandPalette } = useCommandPaletteStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/5 bg-cbd-black/80 backdrop-blur-xl px-4 lg:px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileOpen}
        className="flex lg:hidden items-center justify-center h-9 w-9 rounded-lg hover:bg-cbd-black-secondary transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-cbd-gray-light" />
      </button>

      {/* Breadcrumbs */}
      <div className="hidden sm:flex flex-1">
        <Breadcrumbs />
      </div>

      {/* Mobile: Spacer */}
      <div className="flex-1 sm:hidden" />

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search Button */}
        <button
          onClick={() => openCommandPalette(true)}
          className="flex items-center gap-2 h-9 rounded-lg border border-white/10 bg-cbd-black-secondary px-3 text-sm text-cbd-gray hover:border-cbd-green/30 hover:text-white transition-colors"
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Buscar...</span>
          <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-white/10 bg-cbd-black px-1.5 font-mono text-[10px] font-medium text-cbd-gray">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </button>

        {/* Notifications */}
        <NotificationsPanel />

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  )
}
