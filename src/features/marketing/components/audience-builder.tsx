'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, Trash2, GitBranch, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { AudienceGroup, AudienceCondition } from '@/lib/mock-data/marketing'

const fieldOptions = [
  { value: 'total_spent', label: 'Gasto Total' },
  { value: 'total_purchases', label: 'Numero Compras' },
  { value: 'loyalty_tier', label: 'Nivel Fidelidad' },
  { value: 'last_purchase_days', label: 'Dias Ultima Compra' },
  { value: 'average_ticket', label: 'Ticket Medio' },
  { value: 'preferred_store', label: 'Tienda Preferida' },
  { value: 'marketing_consent', label: 'Consentimiento Marketing' },
  { value: 'age', label: 'Edad' },
  { value: 'city', label: 'Ciudad' },
  { value: 'segment', label: 'Segmento' },
]

const operatorOptions = [
  { value: 'equals', label: 'Igual a' },
  { value: 'not_equals', label: 'No igual a' },
  { value: 'greater_than', label: 'Mayor que' },
  { value: 'less_than', label: 'Menor que' },
  { value: 'contains', label: 'Contiene' },
  { value: 'in', label: 'Esta en' },
]

const loyaltyTierValues = ['STARTER', 'PREMIUM', 'VIP', 'BLACK']
const segmentValues = ['NEW', 'RECURRING', 'VIP', 'INACTIVE', 'HIGH_VALUE']
const cityValues = ['Madrid', 'Barcelona', 'Valencia', 'Alicante', 'Sevilla']

function getValueOptions(field: string): string[] | null {
  switch (field) {
    case 'loyalty_tier':
      return loyaltyTierValues
    case 'segment':
      return segmentValues
    case 'preferred_store':
      return ['Madrid Centro', 'Valencia Puerto', 'Barcelona Gotico', 'Alicante Marina', 'Sevilla Triana']
    case 'city':
      return cityValues
    case 'marketing_consent':
      return ['true', 'false']
    default:
      return null
  }
}

// Initial demo groups
const initialGroups: AudienceGroup[] = [
  {
    id: 'grp-1',
    logic: 'AND',
    conditions: [
      { id: 'cond-1', field: 'total_spent', operator: 'greater_than', value: 500 },
      { id: 'cond-2', field: 'loyalty_tier', operator: 'in', value: 'VIP,BLACK' },
      { id: 'cond-3', field: 'marketing_consent', operator: 'equals', value: 'true' },
    ],
  },
  {
    id: 'grp-2',
    logic: 'OR',
    conditions: [
      { id: 'cond-4', field: 'last_purchase_days', operator: 'less_than', value: 30 },
      { id: 'cond-5', field: 'segment', operator: 'equals', value: 'NEW' },
    ],
  },
]

export function AudienceBuilder() {
  const [groups, setGroups] = useState<AudienceGroup[]>(initialGroups)
  const [estimatedReach, setEstimatedReach] = useState(1245)

  const addGroup = () => {
    const newGroup: AudienceGroup = {
      id: `grp-${Date.now()}`,
      logic: 'AND',
      conditions: [
        { id: `cond-${Date.now()}`, field: 'total_spent', operator: 'greater_than', value: 0 },
      ],
    }
    setGroups([...groups, newGroup])
  }

  const removeGroup = (groupId: string) => {
    setGroups(groups.filter((g) => g.id !== groupId))
  }

  const addCondition = (groupId: string) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              conditions: [
                ...g.conditions,
                { id: `cond-${Date.now()}`, field: 'total_spent', operator: 'greater_than', value: 0 },
              ],
            }
          : g
      )
    )
  }

  const removeCondition = (groupId: string, conditionId: string) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? { ...g, conditions: g.conditions.filter((c) => c.id !== conditionId) }
          : g
      )
    )
  }

  const updateCondition = (
    groupId: string,
    conditionId: string,
    field: keyof AudienceCondition,
    value: string | number
  ) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              conditions: g.conditions.map((c) =>
                c.id === conditionId ? { ...c, [field]: value } : c
              ),
            }
          : g
      )
    )
  }

  const toggleGroupLogic = (groupId: string) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId ? { ...g, logic: g.logic === 'AND' ? 'OR' : 'AND' } : g
      )
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-cbd-green" />
              Constructor de Audiencia
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Define segmentos personalizados combinando criterios
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Alcance Estimado</p>
              <p className="text-lg font-bold text-cbd-green">{estimatedReach.toLocaleString('es-ES')} clientes</p>
            </div>
            <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
              <Save className="h-4 w-4 mr-1" /> Guardar Segmento
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
            >
              {groupIndex > 0 && (
                <div className="flex items-center justify-center my-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <Badge className="mx-3 bg-purple-500/20 text-purple-400 border-purple-500/30">
                    AND
                  </Badge>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              )}

              <div className="rounded-lg border border-white/10 p-4 bg-black/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-white font-medium">Grupo {groupIndex + 1}</span>
                    <button
                      onClick={() => toggleGroupLogic(group.id)}
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-bold border transition-colors',
                        group.logic === 'AND'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      )}
                    >
                      {group.logic}
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addCondition(group.id)}
                      className="h-7 text-xs text-cbd-green hover:text-cbd-green"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Condicion
                    </Button>
                    {groups.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGroup(group.id)}
                        className="h-7 text-xs text-red-400 hover:text-red-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {group.conditions.map((condition, condIndex) => {
                    const valueOpts = getValueOptions(condition.field)
                    return (
                      <div key={condition.id} className="flex items-center gap-2">
                        {condIndex > 0 && (
                          <span className={cn(
                            'text-[10px] font-bold w-8 text-center',
                            group.logic === 'AND' ? 'text-blue-400' : 'text-amber-400'
                          )}>
                            {group.logic}
                          </span>
                        )}
                        {condIndex === 0 && <span className="w-8" />}

                        <Select
                          value={condition.field}
                          onValueChange={(v) => updateCondition(group.id, condition.id, 'field', v)}
                        >
                          <SelectTrigger className="w-[160px] h-8 text-xs bg-black/20 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldOptions.map((f) => (
                              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={condition.operator}
                          onValueChange={(v) => updateCondition(group.id, condition.id, 'operator', v)}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs bg-black/20 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {operatorOptions.map((o) => (
                              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {valueOpts ? (
                          <Select
                            value={String(condition.value)}
                            onValueChange={(v) => updateCondition(group.id, condition.id, 'value', v)}
                          >
                            <SelectTrigger className="flex-1 h-8 text-xs bg-black/20 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {valueOpts.map((v) => (
                                <SelectItem key={v} value={v}>{v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value={String(condition.value)}
                            onChange={(e) => updateCondition(group.id, condition.id, 'value', e.target.value)}
                            className="flex-1 h-8 text-xs bg-black/20 border-white/10"
                            placeholder="Valor..."
                          />
                        )}

                        {group.conditions.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCondition(group.id, condition.id)}
                            className="h-7 w-7 p-0 text-red-400 hover:text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Group Button */}
          <Button
            variant="outline"
            onClick={addGroup}
            className="w-full border-dashed border-white/20 text-muted-foreground hover:text-white hover:border-cbd-green/50"
          >
            <Plus className="h-4 w-4 mr-2" /> Agregar Grupo de Condiciones
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
