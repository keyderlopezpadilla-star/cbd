'use client'

import { useSession } from '@/hooks/use-session'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RoleBadge } from './role-badge'
import { LogoutButton } from './logout-button'
import { User, Settings, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export function UserMenu() {
  const { user } = useSession()

  if (!user) return null

  const initials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cbd-black-secondary transition-colors">
          <Avatar className="h-9 w-9 border-2 border-cbd-green/20">
            <AvatarImage src={user.avatar || undefined} alt={user.name || 'User'} />
            <AvatarFallback className="bg-cbd-green/10 text-cbd-green font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
            <p className="text-xs text-cbd-gray">{user.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 glass-strong border-cbd-green/20">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none text-white">{user.name}</p>
            <p className="text-xs leading-none text-cbd-gray">{user.email}</p>
            <RoleBadge role={user.role} className="w-fit" />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cbd-green/10" />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-cbd-green/10" />
        <DropdownMenuItem asChild className="p-0">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
