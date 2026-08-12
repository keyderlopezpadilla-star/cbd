'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, MessageSquare, Bell, Share2,
  MoreHorizontal, Eye, Pause, Play, Edit, Trash2,
  Search, Filter,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn, formatCurrency } from '@/lib/utils'
import {
  Campaign,
  CampaignStatus,
  CampaignType,
  MOCK_CAMPAIGNS,
  getCampaignStatusColor,
  getCampaignStatusLabel,
  getCampaignTypeLabel,
} from '@/lib/mock-data/marketing'

const typeIcons: Record<CampaignType, React.ElementType> = {
  EMAIL: Mail,
  SMS: MessageSquare,
  PUSH: Bell,
  SOCIAL: Share2,
}

interface CampaignListProps {
  onSelectCampaign?: (campaign: Campaign) => void
  onCreateNew?: () => void
}

export function CampaignList({ onSelectCampaign, onCreateNew }: CampaignListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredCampaigns = MOCK_CAMPAIGNS.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Campanas de Marketing</CardTitle>
          <Button
            onClick={onCreateNew}
            className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium"
          >
            + Nueva Campana
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar campanas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-black/20 border-white/10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] bg-black/20 border-white/10">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="DRAFT">Borrador</SelectItem>
                <SelectItem value="ACTIVE">Activa</SelectItem>
                <SelectItem value="PAUSED">Pausada</SelectItem>
                <SelectItem value="COMPLETED">Completada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px] bg-black/20 border-white/10">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="PUSH">Push</SelectItem>
                <SelectItem value="SOCIAL">Social</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign Items */}
          <div className="space-y-3">
            {filteredCampaigns.map((campaign, index) => {
              const TypeIcon = typeIcons[campaign.type]
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5 hover:border-cbd-green/30 transition-colors cursor-pointer"
                  onClick={() => onSelectCampaign?.(campaign)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-cbd-green/10">
                      <TypeIcon className="h-5 w-5 text-cbd-green" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{campaign.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {getCampaignTypeLabel(campaign.type)} &bull; {campaign.targetAudience.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Metrics Preview */}
                    {campaign.metrics.reach > 0 && (
                      <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
                        <div>
                          <span className="text-white font-medium">{campaign.metrics.reach.toLocaleString()}</span>
                          <span className="ml-1">alcance</span>
                        </div>
                        <div>
                          <span className="text-white font-medium">{campaign.metrics.conversions}</span>
                          <span className="ml-1">conv.</span>
                        </div>
                        <div>
                          <span className="text-cbd-green font-medium">{campaign.metrics.roi}%</span>
                          <span className="ml-1">ROI</span>
                        </div>
                      </div>
                    )}

                    <Badge className={cn('text-xs', getCampaignStatusColor(campaign.status))}>
                      {getCampaignStatusLabel(campaign.status)}
                    </Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" /> Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        {campaign.status === 'ACTIVE' && (
                          <DropdownMenuItem>
                            <Pause className="h-4 w-4 mr-2" /> Pausar
                          </DropdownMenuItem>
                        )}
                        {campaign.status === 'PAUSED' && (
                          <DropdownMenuItem>
                            <Play className="h-4 w-4 mr-2" /> Reanudar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-400">
                          <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No se encontraron campanas con los filtros seleccionados.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
