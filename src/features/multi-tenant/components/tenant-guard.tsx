'use client'

import { ReactNode } from 'react'
import { useSession } from '@/hooks/use-session'
import { useOrganization } from '@/hooks/use-organization'
import { UserRole } from '@/lib/constants'
import { ShieldAlert } from 'lucide-react'

interface TenantGuardProps {
  children: ReactNode
  requiredRoles?: UserRole[]
  organizationId?: string
  fallback?: ReactNode
}

function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
        <ShieldAlert className="h-8 w-8 text-red-500" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Acceso Denegado</h2>
        <p className="text-cbd-gray-light text-sm max-w-md">
          No tienes permisos para acceder a esta seccion. Contacta con tu administrador
          si crees que esto es un error.
        </p>
      </div>
    </div>
  )
}

export function TenantGuard({
  children,
  requiredRoles,
  organizationId,
  fallback,
}: TenantGuardProps) {
  const { user, isLoading: sessionLoading } = useSession()
  const { organization, isLoading: orgLoading } = useOrganization()

  if (sessionLoading || orgLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-cbd-green border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return fallback ?? <AccessDenied />
  }

  // Check organization membership
  if (organizationId && organization?.id !== organizationId) {
    return fallback ?? <AccessDenied />
  }

  // Check required roles
  if (requiredRoles && requiredRoles.length > 0) {
    if (!requiredRoles.includes(user.role)) {
      return fallback ?? <AccessDenied />
    }
  }

  return <>{children}</>
}
