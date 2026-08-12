'use client'

import { CheckCircle2, Clock, Eye, XCircle, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

type ComplianceStatus = 'approved' | 'pending' | 'under_review' | 'expired'

interface ComplianceBadgeProps {
  status: string | null
  className?: string
}

const statusConfig: Record<ComplianceStatus, { label: string; icon: React.ElementType; className: string }> = {
  approved: {
    label: 'Aprobado',
    icon: CheckCircle2,
    className: 'border-green-500/50 bg-green-500/10 text-green-400',
  },
  pending: {
    label: 'Pendiente',
    icon: Clock,
    className: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
  },
  under_review: {
    label: 'En revision',
    icon: Eye,
    className: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
  },
  expired: {
    label: 'Expirado',
    icon: XCircle,
    className: 'border-red-500/50 bg-red-500/10 text-red-400',
  },
}

export function ComplianceBadge({ status, className }: ComplianceBadgeProps) {
  const normalizedStatus = (status || 'pending') as ComplianceStatus
  const config = statusConfig[normalizedStatus] || statusConfig.pending
  const Icon = config.icon

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </div>
  )
}

interface CertificationBadgesProps {
  certifications: string[]
  className?: string
}

export function CertificationBadges({ certifications, className }: CertificationBadgesProps) {
  if (!certifications || certifications.length === 0) return null

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {certifications.map((cert) => (
        <div
          key={cert}
          className="inline-flex items-center gap-1 rounded-full border border-cbd-green/30 bg-cbd-green/5 px-2 py-0.5 text-xs font-medium text-cbd-green"
        >
          <Shield className="h-3 w-3" />
          <span>{cert}</span>
        </div>
      ))}
    </div>
  )
}
