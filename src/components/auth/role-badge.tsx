import { Badge } from '@/components/ui/badge'
import { UserRole } from '@/lib/constants'
import { getRoleDisplayName } from '@/lib/auth/utils'
import { cn } from '@/lib/utils'

interface RoleBadgeProps {
  role: UserRole
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = {
    [UserRole.SUPER_ADMIN]: {
      variant: 'destructive' as const,
      icon: '👑',
    },
    [UserRole.ADMIN]: {
      variant: 'default' as const,
      icon: '🔑',
    },
    [UserRole.MANAGER]: {
      variant: 'success' as const,
      icon: '📊',
    },
    [UserRole.EMPLOYEE]: {
      variant: 'secondary' as const,
      icon: '👤',
    },
    [UserRole.ACCOUNTING]: {
      variant: 'info' as const,
      icon: '💰',
    },
    [UserRole.MARKETING]: {
      variant: 'warning' as const,
      icon: '📢',
    },
  }

  const { variant, icon } = config[role]

  return (
    <Badge variant={variant} className={cn('gap-1', className)}>
      <span>{icon}</span>
      {getRoleDisplayName(role)}
    </Badge>
  )
}
