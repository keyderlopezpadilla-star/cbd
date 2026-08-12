'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
  activeItem: string
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  setMobileOpen: (open: boolean) => void
  toggleMobileOpen: () => void
  setActiveItem: (item: string) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      activeItem: '/dashboard',
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setMobileOpen: (open) => set({ isMobileOpen: open }),
      toggleMobileOpen: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      setActiveItem: (item) => set({ activeItem: item }),
    }),
    {
      name: 'sidebar-store',
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
    }
  )
)
