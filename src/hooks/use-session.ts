'use client'

import { useSession as useNextAuthSession } from 'next-auth/react'
import { UserRole } from '@/lib/constants'
import { Permission, hasPermission } from '@/lib/auth/permissions'

export function useSession() {
  const { data: session, status } = useNextAuthSession()

  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'
  const user = session?.user

  return {
    session,
    user,
    isAuthenticated,
    isLoading,
    status,
  }
}

export function useUser() {
  const { user } = useSession()
  return user
}

export function useRole() {
  const user = useUser()
  return user?.role
}

export function useHasRole(roles: UserRole | UserRole[]) {
  const role = useRole()
  
  if (!role) return false
  
  const allowedRoles = Array.isArray(roles) ? roles : [roles]
  return allowedRoles.includes(role)
}

export function useHasPermission(permission: Permission) {
  const role = useRole()
  
  if (!role) return false
  
  return hasPermission(role, permission)
}

export function useHasAnyPermission(permissions: Permission[]) {
  const role = useRole()
  
  if (!role) return false
  
  return permissions.some((permission) => hasPermission(role, permission))
}
