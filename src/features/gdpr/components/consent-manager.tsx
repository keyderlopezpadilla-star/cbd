'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, CheckCircle, XCircle, Clock, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CONSENT_RECORDS, ConsentRecord, ConsentCategoryId } from '@/lib/mock-data/gdpr'

type FilterType = 'all' | 'full' | 'partial' | 'minimal'

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'full', label: 'Consentimiento Completo' },
  { id: 'partial', label: 'Parcial' },
  { id: 'minimal', label: 'Solo Esenciales' },
]

function getConsentLevel(categories: Record<ConsentCategoryId, boolean>): FilterType {
  const optionalConsents = [categories.analytics, categories.marketing, categories.personalization]
  const allTrue = optionalConsents.every(Boolean)
  const allFalse = optionalConsents.every((v) => !v)
  if (allTrue) return 'full'
  if (allFalse) return 'minimal'
  return 'partial'
}

export function ConsentManager() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [selectedRecord, setSelectedRecord] = useState<ConsentRecord | null>(null)

  const filteredRecords = CONSENT_RECORDS.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase())
    const level = getConsentLevel(record.categories)
    const matchesFilter = activeFilter === 'all' || level === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                activeFilter === filter.id
                  ? 'bg-cbd-green text-black'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Records Table */}
      <Card className="glass border border-white/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5 text-cbd-green" />
            Registros de Consentimiento ({filteredRecords.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <div className="col-span-3">Usuario</div>
              <div className="col-span-2">Fecha</div>
              <div className="col-span-4">Consentimientos</div>
              <div className="col-span-2">Version</div>
              <div className="col-span-1">Accion</div>
            </div>

            {/* Records */}
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="col-span-3">
                  <p className="text-sm font-medium text-foreground">{record.userName}</p>
                  <p className="text-xs text-muted-foreground">{record.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-foreground">
                    {new Date(record.consentDate).toLocaleDateString('es-ES')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(record.consentDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="col-span-4 flex flex-wrap gap-1">
                  {Object.entries(record.categories).map(([key, value]) => (
                    <Badge
                      key={key}
                      variant="outline"
                      className={cn(
                        'text-[10px]',
                        value
                          ? 'border-cbd-green/50 text-cbd-green bg-cbd-green/10'
                          : 'border-white/20 text-muted-foreground'
                      )}
                    >
                      {value ? (
                        <CheckCircle className="h-2.5 w-2.5 mr-1" />
                      ) : (
                        <XCircle className="h-2.5 w-2.5 mr-1" />
                      )}
                      {key === 'essential' ? 'Esencial' :
                       key === 'analytics' ? 'Analitica' :
                       key === 'marketing' ? 'Marketing' : 'Personal.'}
                    </Badge>
                  ))}
                </div>
                <div className="col-span-2">
                  <Badge variant="outline" className="border-white/20 text-xs">
                    v{record.version}
                  </Badge>
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRecord(record)}
                    className="h-8 w-8 p-0 hover:bg-cbd-green/10"
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </motion.div>
            ))}

            {filteredRecords.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No se encontraron registros con los filtros actuales</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedRecord && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedRecord(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass border border-white/10 rounded-xl p-6 max-w-md w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Detalle de Consentimiento</h3>
              <button onClick={() => setSelectedRecord(null)} className="text-muted-foreground hover:text-foreground">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Usuario</p>
                <p className="text-sm font-medium text-foreground">{selectedRecord.userName}</p>
                <p className="text-xs text-muted-foreground">{selectedRecord.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">IP / User Agent</p>
                <p className="text-xs text-foreground">{selectedRecord.ipAddress}</p>
                <p className="text-xs text-muted-foreground truncate">{selectedRecord.userAgent}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fecha de Consentimiento</p>
                <p className="text-sm text-foreground">{new Date(selectedRecord.consentDate).toLocaleString('es-ES')}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ultima Actualizacion</p>
                <p className="text-sm text-foreground">{new Date(selectedRecord.lastUpdated).toLocaleString('es-ES')}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Categorias</p>
                <div className="space-y-1">
                  {Object.entries(selectedRecord.categories).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-foreground capitalize">{key}</span>
                      {value ? (
                        <CheckCircle className="h-4 w-4 text-cbd-green" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              onClick={() => setSelectedRecord(null)}
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
