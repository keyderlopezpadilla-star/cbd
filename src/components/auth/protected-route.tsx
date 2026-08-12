'use client'

import { useSession } from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UserRole } from '@/lib/constants'
import { Permission } from '@/lib/auth/permissions'

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: UserRole[]
  permission?: Permission
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, roles, permission, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-cbd-green border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback ?? null
  }

  // Check role
  if (roles && user && !roles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-cbd-gray">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  // Check permission
  if (permission && user) {
    const { hasPermission } = require('@/lib/auth/permissions')
    if (!hasPermission(user.role, permission)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-cbd-gray">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
