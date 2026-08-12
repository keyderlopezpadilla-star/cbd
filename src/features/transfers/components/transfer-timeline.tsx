'use client'

import { motion } from 'framer-motion'
import { TransferStatus } from '@/lib/constants'
import { TransferTimelineEntry } from '@/lib/mock-data/transfers'
import { formatDateTime, cn } from '@/lib/utils'

interface TransferTimelineProps {
  timeline: TransferTimelineEntry[]
  currentStatus: TransferStatus
}

const allStates: TransferStatus[] = [
  TransferStatus.REQUESTED,
  TransferStatus.APPROVED,
  TransferStatus.PREPARING,
  TransferStatus.IN_TRANSIT,
  TransferStatus.RECEIVED,
]

const stateLabels: Record<TransferStatus, string> = {
  [TransferStatus.REQUESTED]: 'Solicitada',
  [TransferStatus.APPROVED]: 'Aprobada',
  [TransferStatus.PREPARING]: 'En Preparacion',
  [TransferStatus.IN_TRANSIT]: 'En Transito',
  [TransferStatus.RECEIVED]: 'Recibida',
  [TransferStatus.CANCELLED]: 'Cancelada',
}

export function TransferTimeline({ timeline, currentStatus }: TransferTimelineProps) {
  const isCancelled = currentStatus === TransferStatus.CANCELLED
  const completedStates = timeline.map((t) => t.state)

  // If cancelled, show timeline up to cancellation
  const statesToShow = isCancelled
    ? [...timeline.map((t) => t.state)]
    : allStates

  return (
    <div className="relative">
      <div className="space-y-0">
        {statesToShow.map((state, index) => {
          const timelineEntry = timeline.find((t) => t.state === state)
          const isCompleted = completedStates.includes(state)
          const isCurrent = state === currentStatus
          const isFuture = !isCompleted && !isCurrent

          return (
            <motion.div
              key={state}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="relative flex gap-4"
            >
              {/* Vertical line and circle */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                    isCompleted && !isCurrent && 'border-green-500 bg-green-500/20',
                    isCurrent && !isCancelled && 'border-cbd-green bg-cbd-green/20',
                    isCurrent && isCancelled && 'border-red-500 bg-red-500/20',
                    isFuture && 'border-border bg-card'
                  )}
                >
                  {/* Pulse on current */}
                  {isCurrent && !isCancelled && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-cbd-green/30" />
                  )}
                  <span
                    className={cn(
                      'relative h-3 w-3 rounded-full',
                      isCompleted && !isCurrent && 'bg-green-500',
                      isCurrent && !isCancelled && 'bg-cbd-green',
                      isCurrent && isCancelled && 'bg-red-500',
                      isFuture && 'bg-muted-foreground/30'
                    )}
                  />
                </div>
                {/* Connecting Line */}
                {index < statesToShow.length - 1 && (
                  <div
                    className={cn(
                      'w-0.5 flex-1 min-h-[40px]',
                      isCompleted && !isFuture ? 'bg-green-500/50' : 'bg-border/50'
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className={cn('pb-8 pt-1', isFuture && 'opacity-40')}>
                <p
                  className={cn(
                    'text-sm font-medium',
                    isCompleted && !isCurrent && 'text-green-400',
                    isCurrent && !isCancelled && 'text-cbd-green',
                    isCurrent && isCancelled && 'text-red-400',
                    isFuture && 'text-muted-foreground'
                  )}
                >
                  {stateLabels[state]}
                </p>
                {timelineEntry && (
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(timelineEntry.timestamp)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      por {timelineEntry.actor}
                    </p>
                    {timelineEntry.notes && (
                      <p className="text-xs text-muted-foreground/70 italic mt-1">
                        {timelineEntry.notes}
                      </p>
                    )}
                  </div>
                )}
                {isFuture && (
                  <p className="text-xs text-muted-foreground mt-1">Pendiente</p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
