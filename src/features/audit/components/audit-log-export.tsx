'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileJson, FileSpreadsheet, FileText, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuditLogExportProps {
  onClose: () => void
}

type ExportFormat = 'csv' | 'json' | 'pdf'

const formats: { id: ExportFormat; label: string; icon: typeof FileJson; description: string }[] = [
  { id: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Hoja de calculo compatible con Excel' },
  { id: 'json', label: 'JSON', icon: FileJson, description: 'Datos estructurados para integraciones' },
  { id: 'pdf', label: 'PDF', icon: FileText, description: 'Documento formateado para impresion' },
]

const columns = [
  { id: 'timestamp', label: 'Fecha/Hora', default: true },
  { id: 'userName', label: 'Usuario', default: true },
  { id: 'action', label: 'Accion', default: true },
  { id: 'resource', label: 'Recurso', default: true },
  { id: 'result', label: 'Resultado', default: true },
  { id: 'ipAddress', label: 'Direccion IP', default: true },
  { id: 'storeName', label: 'Tienda', default: false },
  { id: 'userAgent', label: 'User Agent', default: false },
  { id: 'details', label: 'Detalles', default: false },
  { id: 'sessionId', label: 'Session ID', default: false },
]

export function AuditLogExport({ onClose }: AuditLogExportProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv')
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.filter((c) => c.default).map((c) => c.id)
  )
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)

  const toggleColumn = (id: string) => {
    setSelectedColumns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      setExported(true)
      setTimeout(() => setExported(false), 3000)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-strong rounded-xl border border-white/10 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-cbd-green" />
            <h3 className="text-lg font-semibold text-white">Exportar Registros</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-cbd-black-secondary text-cbd-gray hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-5">
          {/* Format selection */}
          <div>
            <p className="text-xs text-cbd-gray mb-2">Formato de Exportacion</p>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all',
                    selectedFormat === format.id
                      ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
                      : 'bg-cbd-black-secondary border-white/5 text-cbd-gray hover:text-white hover:border-white/10'
                  )}
                >
                  <format.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div>
            <p className="text-xs text-cbd-gray mb-2">Rango de Fechas</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-cbd-gray block mb-1">Desde</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cbd-green/50"
                />
              </div>
              <div>
                <label className="text-[10px] text-cbd-gray block mb-1">Hasta</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full bg-cbd-black-secondary border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cbd-green/50"
                />
              </div>
            </div>
          </div>

          {/* Column selection */}
          <div>
            <p className="text-xs text-cbd-gray mb-2">Columnas a Incluir</p>
            <div className="grid grid-cols-2 gap-2">
              {columns.map((col) => (
                <button
                  key={col.id}
                  onClick={() => toggleColumn(col.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors text-left',
                    selectedColumns.includes(col.id)
                      ? 'bg-cbd-green/10 border-cbd-green/30 text-cbd-green'
                      : 'bg-cbd-black-secondary border-white/5 text-cbd-gray hover:text-white'
                  )}
                >
                  <div className={cn(
                    'w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0',
                    selectedColumns.includes(col.id)
                      ? 'bg-cbd-green border-cbd-green'
                      : 'border-white/20'
                  )}>
                    {selectedColumns.includes(col.id) && <Check className="h-2.5 w-2.5 text-black" />}
                  </div>
                  {col.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-cbd-gray hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleExport}
            disabled={exporting || selectedColumns.length === 0}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              exported
                ? 'bg-cbd-green/20 text-cbd-green border border-cbd-green/50'
                : 'bg-cbd-green text-black hover:bg-cbd-green-light disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {exporting ? (
              <>
                <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Exportando...
              </>
            ) : exported ? (
              <>
                <Check className="h-4 w-4" />
                Descargado
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Exportar
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
