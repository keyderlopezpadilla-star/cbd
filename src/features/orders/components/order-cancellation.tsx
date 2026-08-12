'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XCircle, AlertTriangle, RotateCcw, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn, formatCurrency } from '@/lib/utils'
import { Order } from '@/types'
import { OrderStatus } from '@/lib/constants'

interface OrderCancellationProps {
  order: Order
  isOpen: boolean
  onClose: () => void
  onConfirm?: (reason: string, refundOption: string, restoreStock: boolean) => void
}

const CANCELLATION_REASONS = [
  { value: 'customer_request', label: 'Solicitud del cliente' },
  { value: 'out_of_stock', label: 'Producto sin stock' },
  { value: 'payment_failed', label: 'Fallo en el pago' },
  { value: 'fraudulent', label: 'Pedido fraudulento' },
  { value: 'duplicate', label: 'Pedido duplicado' },
  { value: 'shipping_issue', label: 'Problema de envio' },
  { value: 'other', label: 'Otro motivo' },
]

const REFUND_OPTIONS = [
  { value: 'full_refund', label: 'Reembolso completo', description: 'Devolver el importe total al cliente' },
  { value: 'partial_refund', label: 'Reembolso parcial', description: 'Devolver parcialmente (descontando gastos)' },
  { value: 'store_credit', label: 'Credito en tienda', description: 'Emitir un vale por el importe' },
  { value: 'no_refund', label: 'Sin reembolso', description: 'No aplicar reembolso' },
]

export function OrderCancellation({ order, isOpen, onClose, onConfirm }: OrderCancellationProps) {
  const [reason, setReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [refundOption, setRefundOption] = useState('full_refund')
  const [restoreStock, setRestoreStock] = useState(true)
  const [step, setStep] = useState<'reason' | 'refund' | 'confirm'>('reason')

  const canCancel =
    order.status === OrderStatus.PENDING ||
    order.status === OrderStatus.CONFIRMED ||
    order.status === OrderStatus.PREPARING

  const handleConfirm = () => {
    const finalReason = reason === 'other' ? customReason : reason
    if (onConfirm) {
      onConfirm(finalReason, refundOption, restoreStock)
    }
    onClose()
  }

  const resetForm = () => {
    setReason('')
    setCustomReason('')
    setRefundOption('full_refund')
    setRestoreStock(true)
    setStep('reason')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg"
        >
          <Card className="glass border-red-400/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400" />
                Cancelar Pedido - {order.orderNumber}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!canCancel && (
                <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      No se puede cancelar este pedido
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Los pedidos en estado &quot;{order.status}&quot; no pueden ser cancelados.
                    </p>
                  </div>
                </div>
              )}

              {canCancel && step === 'reason' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Motivo de cancelacion</Label>
                    <div className="grid gap-2">
                      {CANCELLATION_REASONS.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setReason(r.value)}
                          className={cn(
                            'rounded-lg border p-3 text-left text-sm transition-all',
                            reason === r.value
                              ? 'border-cbd-green bg-cbd-green/10 text-foreground'
                              : 'border-border/30 bg-muted/5 text-muted-foreground hover:border-border/60'
                          )}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {reason === 'other' && (
                    <div className="space-y-2">
                      <Label>Describe el motivo</Label>
                      <textarea
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        placeholder="Motivo de la cancelacion..."
                        className="w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm text-foreground min-h-[80px] resize-none"
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleClose}>
                      Cerrar
                    </Button>
                    <Button
                      onClick={() => setStep('refund')}
                      disabled={!reason || (reason === 'other' && !customReason)}
                      className="bg-cbd-green text-black hover:bg-cbd-green-light"
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {canCancel && step === 'refund' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Opcion de reembolso</Label>
                    <div className="grid gap-2">
                      {REFUND_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setRefundOption(opt.value)}
                          className={cn(
                            'rounded-lg border p-3 text-left transition-all',
                            refundOption === opt.value
                              ? 'border-cbd-green bg-cbd-green/10'
                              : 'border-border/30 bg-muted/5 hover:border-border/60'
                          )}
                        >
                          <p className="text-sm font-medium text-foreground">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-border/30" />

                  {/* Stock restoration */}
                  <div className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/5 p-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Restaurar stock</p>
                        <p className="text-xs text-muted-foreground">
                          Devolver las cantidades al inventario
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRestoreStock(!restoreStock)}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        restoreStock ? 'bg-cbd-green' : 'bg-border'
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 rounded-full bg-white transition-transform',
                          restoreStock ? 'translate-x-6' : 'translate-x-1'
                        )}
                      />
                    </button>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button variant="outline" onClick={() => setStep('reason')}>
                      Atras
                    </Button>
                    <Button
                      onClick={() => setStep('confirm')}
                      className="bg-cbd-green text-black hover:bg-cbd-green-light"
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}

              {canCancel && step === 'confirm' && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Confirmar cancelacion
                        </p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>
                            <span className="text-foreground">Pedido:</span> {order.orderNumber}
                          </p>
                          <p>
                            <span className="text-foreground">Importe:</span>{' '}
                            {formatCurrency(order.total)}
                          </p>
                          <p>
                            <span className="text-foreground">Motivo:</span>{' '}
                            {reason === 'other'
                              ? customReason
                              : CANCELLATION_REASONS.find((r) => r.value === reason)?.label}
                          </p>
                          <p>
                            <span className="text-foreground">Reembolso:</span>{' '}
                            {REFUND_OPTIONS.find((o) => o.value === refundOption)?.label}
                          </p>
                          <p>
                            <span className="text-foreground">Stock:</span>{' '}
                            {restoreStock ? 'Se restaurara' : 'No se restaurara'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button variant="outline" onClick={() => setStep('refund')}>
                      Atras
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancelar Pedido
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
