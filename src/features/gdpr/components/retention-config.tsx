'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Database,
  Clock,
  Shield,
  ToggleLeft,
  ToggleRight,
  Calendar,
  AlertTriangle,
  Edit3,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { RETENTION_RULES, RetentionRule } from '@/lib/mock-data/gdpr'

const legalBases = [
  'Consentimiento',
  'Ejecucion de contrato',
  'Obligacion legal',
  'Interes legitimo (seguridad)',
  'Interes legitimo (demostrar cumplimiento)',
  'Interes vital',
]

export function RetentionConfig() {
  const [rules, setRules] = useState<RetentionRule[]>(RETENTION_RULES)
  const [editingRule, setEditingRule] = useState<string | null>(null)

  const toggleAutoDelete = (id: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, autoDelete: !rule.autoDelete } : rule
      )
    )
  }

  const autoDeleteCount = rules.filter((r) => r.autoDelete).length
  const totalRules = rules.length
  const nextReview = rules
    .map((r) => r.nextReview)
    .sort()[0]

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/10">
              <Database className="h-5 w-5 text-cbd-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalRules}</p>
              <p className="text-xs text-muted-foreground">Tipos de Datos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10">
              <ToggleRight className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{autoDeleteCount}/{totalRules}</p>
              <p className="text-xs text-muted-foreground">Auto-Eliminacion Activa</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400/10">
              <Calendar className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{nextReview}</p>
              <p className="text-xs text-muted-foreground">Proxima Revision</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules List */}
      <Card className="glass border border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-cbd-green" />
              Reglas de Retencion de Datos
            </CardTitle>
            <Button variant="outline" className="border-white/20 text-foreground hover:bg-white/5">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
              Revisar Todas
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'rounded-lg border p-4 transition-colors',
                editingRule === rule.id
                  ? 'border-cbd-green/50 bg-cbd-green/5'
                  : 'border-white/5 bg-white/5 hover:bg-white/10'
              )}
            >
              {editingRule === rule.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Tipo de Datos</Label>
                      <Input
                        defaultValue={rule.dataType}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Periodo de Retencion</Label>
                      <Input
                        defaultValue={rule.retentionPeriod}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Dias de Retencion</Label>
                      <Input
                        type="number"
                        defaultValue={rule.retentionDays}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Base Legal</Label>
                      <Select defaultValue={rule.legalBasis}>
                        <SelectTrigger className="bg-white/5 border-white/10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {legalBases.map((basis) => (
                            <SelectItem key={basis} value={basis}>
                              {basis}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Descripcion</Label>
                    <Input
                      defaultValue={rule.description}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      onClick={() => setEditingRule(null)}
                      className="bg-cbd-green text-black hover:bg-cbd-green/90"
                    >
                      Guardar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingRule(null)}
                      className="text-muted-foreground"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{rule.dataType}</p>
                      <Badge variant="outline" className="text-[10px] border-white/20">
                        {rule.retentionPeriod}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {rule.legalBasis}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Revision: {rule.nextReview}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Auto Delete Toggle */}
                    <button
                      onClick={() => toggleAutoDelete(rule.id)}
                      className="flex items-center gap-2"
                    >
                      {rule.autoDelete ? (
                        <ToggleRight className="h-6 w-6 text-cbd-green" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-muted-foreground" />
                      )}
                      <span className={cn(
                        'text-xs font-medium',
                        rule.autoDelete ? 'text-cbd-green' : 'text-muted-foreground'
                      )}>
                        Auto-eliminar
                      </span>
                    </button>
                    <Separator orientation="vertical" className="h-6 bg-white/10" />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingRule(rule.id)}
                      className="h-8 hover:bg-white/10"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
