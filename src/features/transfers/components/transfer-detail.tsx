'use client'

import { useState } from 'react'
import { MapPin, Package } from 'lucide-react'
import { StockTransfer } from '@/types'
import { TransferStatus } from '@/lib/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TransferStatusBadge } from './transfer-status-badge'
import { TransferTimeline } from './transfer-timeline'
import { TransferActions } from './transfer-actions'
import { TransferTimelineEntry, getStoreName, getStoreCity } from '@/lib/mock-data/transfers'
import { formatDateTime } from '@/lib/utils'

interface TransferDetailProps {
  transfer: StockTransfer
  timeline: TransferTimelineEntry[]
}

export function TransferDetail({ transfer, timeline }: TransferDetailProps) {
  const [currentStatus, setCurrentStatus] = useState<TransferStatus>(transfer.status)

  const handleStatusChange = (newStatus: TransferStatus) => {
    setCurrentStatus(newStatus)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground">
                  {transfer.transferNumber}
                </h2>
                <TransferStatusBadge status={currentStatus} />
              </div>
              <p className="text-sm text-muted-foreground">
                Creada el {formatDateTime(transfer.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                Solicitada por <span className="text-foreground">{transfer.requestedBy}</span>
                {transfer.approvedBy && (
                  <>
                    {' '}| Aprobada por <span className="text-foreground">{transfer.approvedBy}</span>
                  </>
                )}
              </p>
            </div>
            <TransferActions status={currentStatus} onStatusChange={handleStatusChange} />
          </div>
        </CardContent>
      </Card>

      {/* From / To Stores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Origen</p>
                <p className="text-base font-semibold text-foreground mt-0.5">
                  {getStoreName(transfer.fromStoreId)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {getStoreCity(transfer.fromStoreId)}, Espana
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/20">
                <MapPin className="h-5 w-5 text-cbd-green" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Destino</p>
                <p className="text-base font-semibold text-foreground mt-0.5">
                  {getStoreName(transfer.toStoreId)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {getStoreCity(transfer.toStoreId)}, Espana
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4 text-cbd-green" />
            Productos ({transfer.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {transfer.items.map((item, index) => (
                  <tr key={index} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{item.productName}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-foreground">
                        {item.quantity} uds
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border/50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-muted-foreground">Total items</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-bold text-foreground">
                      {transfer.items.reduce((acc, item) => acc + item.quantity, 0)} uds
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">Historial de Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <TransferTimeline timeline={timeline} currentStatus={currentStatus} />
        </CardContent>
      </Card>

      {/* Notes */}
      {transfer.notes && (
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Notas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{transfer.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
