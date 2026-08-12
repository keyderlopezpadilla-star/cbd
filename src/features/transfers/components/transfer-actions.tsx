'use client'

import { useState } from 'react'
import { Check, X, Package, Truck, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { TransferStatus } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface TransferActionsProps {
  status: TransferStatus
  onStatusChange?: (newStatus: TransferStatus) => void
}

interface ActionConfig {
  label: string
  icon: React.ElementType
  newStatus: TransferStatus
  variant: 'default' | 'destructive'
  className?: string
  confirmTitle: string
  confirmMessage: string
}

export function TransferActions({ status, onStatusChange }: TransferActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<ActionConfig | null>(null)

  const handleAction = (action: ActionConfig) => {
    setSelectedAction(action)
    setDialogOpen(true)
  }

  const confirmAction = () => {
    if (selectedAction && onStatusChange) {
      onStatusChange(selectedAction.newStatus)
    }
    setDialogOpen(false)
    setSelectedAction(null)
  }

  const getActions = (): ActionConfig[] => {
    switch (status) {
      case TransferStatus.REQUESTED:
        return [
          {
            label: 'Aprobar',
            icon: Check,
            newStatus: TransferStatus.APPROVED,
            variant: 'default',
            className: 'bg-cbd-green text-black hover:bg-cbd-green/90',
            confirmTitle: 'Aprobar Transferencia',
            confirmMessage: 'Estas seguro de que quieres aprobar esta transferencia? Se notificara al equipo de la tienda de origen para preparar el envio.',
          },
          {
            label: 'Rechazar',
            icon: X,
            newStatus: TransferStatus.CANCELLED,
            variant: 'destructive',
            className: '',
            confirmTitle: 'Rechazar Transferencia',
            confirmMessage: 'Estas seguro de que quieres rechazar esta transferencia? Esta accion no se puede deshacer.',
          },
        ]
      case TransferStatus.APPROVED:
        return [
          {
            label: 'Marcar en Preparacion',
            icon: Package,
            newStatus: TransferStatus.PREPARING,
            variant: 'default',
            className: 'bg-orange-500 text-white hover:bg-orange-600',
            confirmTitle: 'Iniciar Preparacion',
            confirmMessage: 'Confirmas que se ha comenzado a preparar el envio de esta transferencia?',
          },
        ]
      case TransferStatus.PREPARING:
        return [
          {
            label: 'Marcar en Transito',
            icon: Truck,
            newStatus: TransferStatus.IN_TRANSIT,
            variant: 'default',
            className: 'bg-purple-500 text-white hover:bg-purple-600',
            confirmTitle: 'Confirmar Envio',
            confirmMessage: 'Confirmas que los productos han sido enviados y estan en transito hacia la tienda de destino?',
          },
        ]
      case TransferStatus.IN_TRANSIT:
        return [
          {
            label: 'Confirmar Recepcion',
            icon: CheckCircle,
            newStatus: TransferStatus.RECEIVED,
            variant: 'default',
            className: 'bg-cbd-green text-black hover:bg-cbd-green/90',
            confirmTitle: 'Confirmar Recepcion',
            confirmMessage: 'Confirmas que los productos han sido recibidos correctamente en la tienda de destino? Esto completara la transferencia.',
          },
        ]
      default:
        return []
    }
  }

  const actions = getActions()

  if (actions.length === 0) {
    return (
      <div className="flex items-center gap-2 py-2">
        <span
          className={cn(
            'text-sm font-medium',
            status === TransferStatus.RECEIVED && 'text-green-400',
            status === TransferStatus.CANCELLED && 'text-red-400'
          )}
        >
          {status === TransferStatus.RECEIVED && 'Transferencia Completada'}
          {status === TransferStatus.CANCELLED && 'Transferencia Cancelada'}
        </span>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.label}
              variant={action.variant}
              className={cn(action.className)}
              onClick={() => handleAction(action)}
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </Button>
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAction?.confirmTitle}</DialogTitle>
            <DialogDescription>
              {selectedAction?.confirmMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              variant={selectedAction?.variant}
              className={cn(selectedAction?.className)}
              onClick={confirmAction}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
