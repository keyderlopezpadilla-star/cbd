'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { DATA_REQUESTS, DataRequest, DataRequestStatus, DataRequestType } from '@/lib/mock-data/gdpr'

type FilterTab = 'all' | 'export' | 'deletion'

const statusConfig: Record<DataRequestStatus, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: 'Pendiente', icon: Clock, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  processing: { label: 'Procesando', icon: Loader2, color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  completed: { label: 'Completada', icon: CheckCircle, color: 'text-cbd-green bg-cbd-green/10 border-cbd-green/30' },
  rejected: { label: 'Rechazada', icon: XCircle, color: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

const typeConfig: Record<DataRequestType, { label: string; icon: React.ElementType; color: string }> = {
  export: { label: 'Exportacion', icon: Download, color: 'text-blue-400 border-blue-400/30' },
  deletion: { label: 'Eliminacion', icon: Trash2, color: 'text-red-400 border-red-400/30' },
}

export function DataRequests() {
  const [filterTab, setFilterTab] = useState<FilterTab>('all')
  const [requests, setRequests] = useState<DataRequest[]>(DATA_REQUESTS)
  const [selectedRequest, setSelectedRequest] = useState<DataRequest | null>(null)

  const filteredRequests = requests.filter((req) => {
    if (filterTab === 'all') return true
    return req.type === filterTab
  })

  const pendingCount = requests.filter((r) => r.status === 'pending').length
  const processingCount = requests.filter((r) => r.status === 'processing').length

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: 'processing' as DataRequestStatus, processedBy: 'admin@cbdsaas.com' }
          : req
      )
    )
  }

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'rejected' as DataRequestStatus,
              processedDate: new Date().toISOString(),
              processedBy: 'admin@cbdsaas.com',
            }
          : req
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10">
              <Loader2 className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{processingCount}</p>
              <p className="text-xs text-muted-foreground">En Proceso</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/10">
              <CheckCircle className="h-5 w-5 text-cbd-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{requests.length}</p>
              <p className="text-xs text-muted-foreground">Total Solicitudes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1 w-fit">
        {[
          { id: 'all' as FilterTab, label: 'Todas' },
          { id: 'export' as FilterTab, label: 'Exportacion' },
          { id: 'deletion' as FilterTab, label: 'Eliminacion' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              filterTab === tab.id
                ? 'bg-cbd-green text-black'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <Card className="glass border border-white/10">
        <CardHeader>
          <CardTitle className="text-lg">Solicitudes de Datos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredRequests.map((request, index) => {
            const status = statusConfig[request.status]
            const type = typeConfig[request.type]
            const StatusIcon = status.icon
            const TypeIcon = type.icon

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-lg border border-white/5 bg-white/5 p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', type.color.replace('text-', 'bg-').replace('border-', '').split(' ')[0] + '/10')}>
                      <TypeIcon className={cn('h-4 w-4', type.color.split(' ')[0])} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-foreground">{request.userName}</p>
                        <Badge variant="outline" className={cn('text-[10px]', type.color)}>
                          {type.label}
                        </Badge>
                        <Badge variant="outline" className={cn('text-[10px]', status.color)}>
                          <StatusIcon className="h-2.5 w-2.5 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{request.email}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{request.reason}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Solicitada: {new Date(request.requestDate).toLocaleDateString('es-ES')}
                        {request.processedDate && (
                          <> | Procesada: {new Date(request.processedDate).toLocaleDateString('es-ES')}</>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    {request.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                          className="bg-cbd-green text-black hover:bg-cbd-green/90 h-8"
                        >
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                          className="border-red-400/30 text-red-400 hover:bg-red-400/10 h-8"
                        >
                          <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                          Rechazar
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedRequest(request)}
                      className="h-8 w-8 p-0 hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No hay solicitudes con el filtro seleccionado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass border border-white/10 rounded-xl p-6 max-w-lg w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Detalle de Solicitud</h3>
              <button onClick={() => setSelectedRequest(null)} className="text-muted-foreground hover:text-foreground">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Usuario</p>
                  <p className="text-sm font-medium text-foreground">{selectedRequest.userName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tipo</p>
                  <p className="text-sm text-foreground">{typeConfig[selectedRequest.type].label}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estado</p>
                  <p className="text-sm text-foreground">{statusConfig[selectedRequest.status].label}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Razon</p>
                <p className="text-sm text-foreground">{selectedRequest.reason}</p>
              </div>
              {selectedRequest.notes && (
                <div>
                  <p className="text-xs text-muted-foreground">Notas</p>
                  <p className="text-sm text-foreground">{selectedRequest.notes}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Fecha Solicitud</p>
                  <p className="text-sm text-foreground">
                    {new Date(selectedRequest.requestDate).toLocaleString('es-ES')}
                  </p>
                </div>
                {selectedRequest.processedDate && (
                  <div>
                    <p className="text-xs text-muted-foreground">Fecha Proceso</p>
                    <p className="text-sm text-foreground">
                      {new Date(selectedRequest.processedDate).toLocaleString('es-ES')}
                    </p>
                  </div>
                )}
              </div>
              {selectedRequest.processedBy && (
                <div>
                  <p className="text-xs text-muted-foreground">Procesado por</p>
                  <p className="text-sm text-foreground">{selectedRequest.processedBy}</p>
                </div>
              )}
            </div>
            <Button
              onClick={() => setSelectedRequest(null)}
              className="w-full bg-cbd-green text-black hover:bg-cbd-green/90"
            >
              Cerrar
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
