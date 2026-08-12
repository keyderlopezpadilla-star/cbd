'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, DollarSign, Users, Mail, MessageSquare, Bell, Share2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { CampaignType, Campaign } from '@/lib/mock-data/marketing'
import { CustomerSegment } from '@/lib/mock-data/customers'

const campaignTypes: { value: CampaignType; label: string; icon: React.ElementType }[] = [
  { value: 'EMAIL', label: 'Email', icon: Mail },
  { value: 'SMS', label: 'SMS', icon: MessageSquare },
  { value: 'PUSH', label: 'Push', icon: Bell },
  { value: 'SOCIAL', label: 'Redes Sociales', icon: Share2 },
]

const segments: { value: CustomerSegment; label: string }[] = [
  { value: 'NEW', label: 'Nuevos Clientes' },
  { value: 'RECURRING', label: 'Recurrentes' },
  { value: 'VIP', label: 'VIP' },
  { value: 'INACTIVE', label: 'Inactivos' },
  { value: 'HIGH_VALUE', label: 'Alto Valor' },
]

interface CampaignFormProps {
  campaign?: Campaign | null
  onClose?: () => void
  onSave?: (data: Partial<Campaign>) => void
}

export function CampaignForm({ campaign, onClose, onSave }: CampaignFormProps) {
  const [name, setName] = useState(campaign?.name || '')
  const [type, setType] = useState<CampaignType>(campaign?.type || 'EMAIL')
  const [description, setDescription] = useState(campaign?.description || '')
  const [budget, setBudget] = useState(campaign?.budget?.toString() || '')
  const [startDate, setStartDate] = useState(
    campaign?.startDate ? campaign.startDate.toISOString().split('T')[0] : ''
  )
  const [endDate, setEndDate] = useState(
    campaign?.endDate ? campaign.endDate.toISOString().split('T')[0] : ''
  )
  const [selectedSegments, setSelectedSegments] = useState<CustomerSegment[]>(
    campaign?.targetAudience || []
  )
  const [selectedChannels, setSelectedChannels] = useState<CampaignType[]>(
    campaign?.channels || ['EMAIL']
  )

  const toggleSegment = (segment: CustomerSegment) => {
    setSelectedSegments((prev) =>
      prev.includes(segment) ? prev.filter((s) => s !== segment) : [...prev, segment]
    )
  }

  const toggleChannel = (channel: CampaignType) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    )
  }

  const handleSubmit = () => {
    onSave?.({
      name,
      type,
      description,
      budget: parseFloat(budget) || 0,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      targetAudience: selectedSegments,
      channels: selectedChannels,
    })
  }

  const isEditing = !!campaign

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">
            {isEditing ? 'Editar Campana' : 'Nueva Campana'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Nombre de la Campana</Label>
              <Input
                placeholder="Ej: Campana Black Friday CBD"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Descripcion</Label>
              <Input
                placeholder="Descripcion breve de la campana..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Tipo de Campana</Label>
              <Select value={type} onValueChange={(v) => setType(v as CampaignType)}>
                <SelectTrigger className="bg-black/20 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {campaignTypes.map((ct) => (
                    <SelectItem key={ct.value} value={ct.value}>
                      {ct.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="border-white/10" />

          {/* Target Audience */}
          <div className="space-y-3">
            <Label className="text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-cbd-green" />
              Audiencia Objetivo
            </Label>
            <div className="flex flex-wrap gap-2">
              {segments.map((seg) => (
                <Badge
                  key={seg.value}
                  className={cn(
                    'cursor-pointer transition-colors',
                    selectedSegments.includes(seg.value)
                      ? 'bg-cbd-green/20 text-cbd-green border-cbd-green/50'
                      : 'bg-black/20 text-muted-foreground border-white/10 hover:border-white/30'
                  )}
                  onClick={() => toggleSegment(seg.value)}
                >
                  {seg.label}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="border-white/10" />

          {/* Channels */}
          <div className="space-y-3">
            <Label className="text-white">Canales</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {campaignTypes.map((ct) => {
                const Icon = ct.icon
                const isSelected = selectedChannels.includes(ct.value)
                return (
                  <button
                    key={ct.value}
                    onClick={() => toggleChannel(ct.value)}
                    className={cn(
                      'flex items-center gap-2 p-3 rounded-lg border transition-colors',
                      isSelected
                        ? 'bg-cbd-green/10 border-cbd-green/50 text-cbd-green'
                        : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/30'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{ct.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <Separator className="border-white/10" />

          {/* Schedule & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cbd-green" />
                Fecha Inicio
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cbd-green" />
                Fecha Fin
              </Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-cbd-green" />
                Presupuesto (EUR)
              </Label>
              <Input
                type="number"
                placeholder="0.00"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-black/20 border-white/10"
              />
            </div>
          </div>

          <Separator className="border-white/10" />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="border-white/10">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium"
              disabled={!name || selectedSegments.length === 0}
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Campana'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
