'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Percent, Plus, MoreHorizontal, Edit, Trash2,
  ToggleLeft, ToggleRight, Zap, Package, ShoppingBag, Timer,
} from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { MOCK_DISCOUNT_RULES, DiscountRule, DiscountRuleType } from '@/lib/mock-data/marketing'

const ruleTypeConfig: Record<DiscountRuleType, { label: string; icon: React.ElementType; color: string }> = {
  BUY_X_GET_Y: { label: 'Compra X Lleva Y', icon: ShoppingBag, color: 'text-purple-400' },
  VOLUME: { label: 'Volumen', icon: Package, color: 'text-blue-400' },
  BUNDLE: { label: 'Bundle', icon: Zap, color: 'text-amber-400' },
  FLASH_SALE: { label: 'Flash Sale', icon: Timer, color: 'text-red-400' },
}

export function DiscountRules() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<DiscountRuleType>('VOLUME')
  const [newDiscountAmount, setNewDiscountAmount] = useState('')
  const [newMinQuantity, setNewMinQuantity] = useState('')
  const [newStartDate, setNewStartDate] = useState('')
  const [newEndDate, setNewEndDate] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const getDiscountDisplay = (rule: DiscountRule) => {
    switch (rule.discount.type) {
      case 'PERCENTAGE':
        return `${rule.discount.amount}% dto`
      case 'FIXED':
        return `${formatCurrency(rule.discount.amount)} dto`
      case 'FREE_ITEM':
        return 'Articulo Gratis'
      default:
        return `${rule.discount.amount}`
    }
  }

  const getConditionsDisplay = (rule: DiscountRule) => {
    const parts: string[] = []
    if (rule.conditions.minQuantity) parts.push(`Min ${rule.conditions.minQuantity} uds`)
    if (rule.conditions.minAmount) parts.push(`Min ${formatCurrency(rule.conditions.minAmount)}`)
    if (rule.conditions.buyQuantity && rule.conditions.getQuantity) {
      parts.push(`Compra ${rule.conditions.buyQuantity} + ${rule.conditions.getQuantity} gratis`)
    }
    if (rule.conditions.categories?.length) parts.push(`Cat: ${rule.conditions.categories.join(', ')}`)
    return parts.join(' | ')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Percent className="h-5 w-5 text-cbd-green" />
            Reglas de Descuento
          </CardTitle>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
                <Plus className="h-4 w-4 mr-1" /> Nueva Regla
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a2e] border-cbd-green/20 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Nueva Regla de Descuento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-white">Nombre</Label>
                  <Input
                    placeholder="Ej: Descuento por volumen aceites"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-white">Tipo de Regla</Label>
                    <Select value={newType} onValueChange={(v) => setNewType(v as DiscountRuleType)}>
                      <SelectTrigger className="bg-black/20 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VOLUME">Volumen</SelectItem>
                        <SelectItem value="BUY_X_GET_Y">Compra X Lleva Y</SelectItem>
                        <SelectItem value="BUNDLE">Bundle</SelectItem>
                        <SelectItem value="FLASH_SALE">Flash Sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Descuento (%)</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newDiscountAmount}
                      onChange={(e) => setNewDiscountAmount(e.target.value)}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Cantidad Minima</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 3"
                    value={newMinQuantity}
                    onChange={(e) => setNewMinQuantity(e.target.value)}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-white">Fecha Inicio</Label>
                    <Input
                      type="date"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Fecha Fin</Label>
                    <Input
                      type="date"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Descripcion</Label>
                  <Input
                    placeholder="Descripcion de la regla..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="border-white/10">
                    Cancelar
                  </Button>
                  <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
                    Crear Regla
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-3">
          {MOCK_DISCOUNT_RULES.map((rule, index) => {
            const typeConfig = ruleTypeConfig[rule.type]
            const TypeIcon = typeConfig.icon
            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5 hover:border-cbd-green/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'p-2 rounded-lg',
                    rule.isActive ? 'bg-cbd-green/10' : 'bg-gray-500/10'
                  )}>
                    <TypeIcon className={cn('h-5 w-5', rule.isActive ? typeConfig.color : 'text-gray-500')} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-white">{rule.name}</h4>
                      <Badge className={cn(
                        'text-[10px]',
                        rule.isActive
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      )}>
                        {rule.isActive ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {getConditionsDisplay(rule)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-cbd-green">{getDiscountDisplay(rule)}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatDate(rule.startDate)} - {formatDate(rule.endDate)}
                    </p>
                  </div>

                  <Badge className="text-[10px] bg-black/30 text-muted-foreground border-white/10">
                    {typeConfig.label}
                  </Badge>

                  <span className="text-xs text-muted-foreground">P{rule.priority}</span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {rule.isActive ? (
                          <><ToggleLeft className="h-4 w-4 mr-2" /> Desactivar</>
                        ) : (
                          <><ToggleRight className="h-4 w-4 mr-2" /> Activar</>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400">
                        <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
