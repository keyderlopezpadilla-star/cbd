'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  FileText,
  CheckSquare,
  FileCode,
  Scale,
  Search,
  ExternalLink,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { COMPLIANCE_DOCUMENTS, ComplianceDocument } from '@/lib/mock-data/compliance'

type CategoryFilter = 'all' | 'guide' | 'regulation' | 'checklist' | 'template'

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  guide: { label: 'Guia', icon: BookOpen, color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  regulation: { label: 'Regulacion', icon: Scale, color: 'text-purple-400 bg-purple-400/10 border-purple-400/30' },
  checklist: { label: 'Checklist', icon: CheckSquare, color: 'text-cbd-green bg-cbd-green/10 border-cbd-green/30' },
  template: { label: 'Plantilla', icon: FileCode, color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' },
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  current: { label: 'Vigente', icon: CheckCircle, color: 'text-cbd-green border-cbd-green/30' },
  outdated: { label: 'Desactualizado', icon: AlertCircle, color: 'text-red-400 border-red-400/30' },
  under_review: { label: 'En Revision', icon: Clock, color: 'text-yellow-400 border-yellow-400/30' },
}

const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'guide', label: 'Guias' },
  { id: 'regulation', label: 'Regulaciones' },
  { id: 'checklist', label: 'Checklists' },
  { id: 'template', label: 'Plantillas' },
]

export function ComplianceDocumentation() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all')

  const filteredDocs = COMPLIANCE_DOCUMENTS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeFilter === 'all' || doc.category === activeFilter
    return matchesSearch && matchesCategory
  })

  const currentCount = COMPLIANCE_DOCUMENTS.filter((d) => d.status === 'current').length
  const outdatedCount = COMPLIANCE_DOCUMENTS.filter((d) => d.status === 'outdated').length
  const reviewCount = COMPLIANCE_DOCUMENTS.filter((d) => d.status === 'under_review').length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/10">
              <CheckCircle className="h-5 w-5 text-cbd-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{currentCount}</p>
              <p className="text-xs text-muted-foreground">Documentos Vigentes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{reviewCount}</p>
              <p className="text-xs text-muted-foreground">En Revision</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-400/10">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{outdatedCount}</p>
              <p className="text-xs text-muted-foreground">Desactualizados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-card/50 p-1">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap',
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

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc, index) => {
          const category = categoryConfig[doc.category]
          const status = statusConfig[doc.status]
          const CategoryIcon = category.icon
          const StatusIcon = status.icon

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass border border-white/10 hover:border-white/20 transition-colors h-full">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0', category.color.split(' ')[1])}>
                      <CategoryIcon className={cn('h-4 w-4', category.color.split(' ')[0])} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn('text-[10px]', status.color)}>
                        <StatusIcon className="h-2.5 w-2.5 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">{doc.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{doc.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] border-white/20">
                        <Globe className="h-2.5 w-2.5 mr-1" />
                        {doc.country}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        Act. {doc.lastUpdated}
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 text-xs hover:bg-cbd-green/10 text-cbd-green">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Abrir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No se encontraron documentos con los filtros actuales</p>
        </div>
      )}

      {/* Audit Checklist Preview */}
      <Card className="glass border border-white/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-cbd-green" />
            Checklist de Auditoria Rapida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { label: 'Todos los productos tienen certificado de laboratorio vigente', checked: true },
              { label: 'THC dentro de limites legales en todos los mercados', checked: true },
              { label: 'Etiquetado conforme a regulacion local', checked: true },
              { label: 'Registro Novel Food actualizado (productos orales)', checked: false },
              { label: 'Verificacion de edad implementada en web', checked: true },
              { label: 'Documentacion de cumplimiento al dia', checked: false },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-3 rounded-lg border p-3',
                  item.checked
                    ? 'border-cbd-green/20 bg-cbd-green/5'
                    : 'border-yellow-400/20 bg-yellow-400/5'
                )}
              >
                {item.checked ? (
                  <CheckCircle className="h-4 w-4 text-cbd-green flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                )}
                <span className={cn('text-sm', item.checked ? 'text-foreground' : 'text-muted-foreground')}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
