'use client'

import { useHasPermission, useHasRole } from '@/hooks/use-session'
import { UserRole } from '@/lib/constants'
import { Permission } from '@/lib/auth/permissions'

interface CanProps {
  children: React.ReactNode
  role?: UserRole | UserRole[]
  permission?: Permission
  fallback?: React.ReactNode
}

/**
 * Conditional rendering component based on permissions or roles
 */
export function Can({ children, role, permission, fallback = null }: CanProps) {
  const hasRole = useHasRole(role as UserRole | UserRole[])
  const hasPermission = useHasPermission(permission as Permission)

  // If role is specified, check role
  if (role && !hasRole) {
    return <>{fallback}</>
  }

  // If permission is specified, check permission
  if (permission && !hasPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
