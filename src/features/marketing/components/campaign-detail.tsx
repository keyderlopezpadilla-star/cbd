'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Users, Eye, MousePointer, ShoppingCart,
  DollarSign, TrendingUp, Mail, MessageSquare, Bell, Share2,
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import {
  Campaign,
  CampaignType,
  getCampaignStatusColor,
  getCampaignStatusLabel,
  getCampaignTypeLabel,
  getCampaignROIData,
} from '@/lib/mock-data/marketing'

const typeIcons: Record<CampaignType, React.ElementType> = {
  EMAIL: Mail,
  SMS: MessageSquare,
  PUSH: Bell,
  SOCIAL: Share2,
}

interface CampaignDetailProps {
  campaign: Campaign
  onBack?: () => void
}

export function CampaignDetail({ campaign, onBack }: CampaignDetailProps) {
  const roiData = getCampaignROIData(campaign.id)
  const TypeIcon = typeIcons[campaign.type]

  const metricCards = [
    { label: 'Alcance', value: campaign.metrics.reach.toLocaleString('es-ES'), icon: Users, color: 'text-blue-400' },
    { label: 'Impresiones', value: campaign.metrics.impressions.toLocaleString('es-ES'), icon: Eye, color: 'text-purple-400' },
    { label: 'Tasa Apertura', value: `${campaign.metrics.openRate}%`, icon: Mail, color: 'text-amber-400' },
    { label: 'Tasa Click', value: `${campaign.metrics.clickRate}%`, icon: MousePointer, color: 'text-cyan-400' },
    { label: 'Conversiones', value: campaign.metrics.conversions.toLocaleString('es-ES'), icon: ShoppingCart, color: 'text-green-400' },
    { label: 'Revenue', value: formatCurrency(campaign.metrics.revenue), icon: DollarSign, color: 'text-cbd-green' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass border-cbd-green/20">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="p-3 rounded-lg bg-cbd-green/10">
                <TypeIcon className="h-6 w-6 text-cbd-green" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{campaign.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge className={cn('text-xs', getCampaignStatusColor(campaign.status))}>
                    {getCampaignStatusLabel(campaign.status)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {getCampaignTypeLabel(campaign.type)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-cbd-green">
                <TrendingUp className="h-4 w-4" />
                <span className="text-2xl font-bold">{campaign.metrics.roi}%</span>
              </div>
              <p className="text-xs text-muted-foreground">ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {metricCards.map((metric) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass border-white/5">
                <CardContent className="pt-4 pb-4 px-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={cn('h-4 w-4', metric.color)} />
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                  </div>
                  <p className="text-lg font-bold text-white">{metric.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Spend Chart */}
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Revenue vs Gasto Diario</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#666" tick={{ fill: '#999', fontSize: 11 }} />
                <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(0, 255, 102, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00FF66"
                  strokeWidth={2}
                  name="Revenue"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="spend"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Gasto"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversions Chart */}
        <Card className="glass border-cbd-green/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Conversiones Diarias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#666" tick={{ fill: '#999', fontSize: 11 }} />
                <YAxis stroke="#666" tick={{ fill: '#999', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid rgba(0, 255, 102, 0.2)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="conversions" fill="#00FF66" radius={[4, 4, 0, 0]} name="Conversiones" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Info */}
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-white text-sm">Presupuesto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Presupuesto Total</p>
              <p className="text-lg font-bold text-white">{formatCurrency(campaign.budget)}</p>
            </div>
            <Separator orientation="vertical" className="h-10 border-white/10" />
            <div>
              <p className="text-xs text-muted-foreground">Gastado</p>
              <p className="text-lg font-bold text-amber-400">{formatCurrency(campaign.spent)}</p>
            </div>
            <Separator orientation="vertical" className="h-10 border-white/10" />
            <div>
              <p className="text-xs text-muted-foreground">Restante</p>
              <p className="text-lg font-bold text-cbd-green">
                {formatCurrency(campaign.budget - campaign.spent)}
              </p>
            </div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-black/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-cbd-green transition-all"
                  style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {((campaign.spent / campaign.budget) * 100).toFixed(1)}% utilizado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
