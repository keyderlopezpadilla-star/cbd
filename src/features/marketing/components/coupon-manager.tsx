'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Ticket, Plus, Search, Copy, MoreHorizontal,
  Edit, Trash2, ToggleLeft, ToggleRight, Calendar,
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
import { MOCK_COUPONS, Coupon, CouponType, getCouponTypeLabel } from '@/lib/mock-data/marketing'

export function CouponManager() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Form state
  const [newCode, setNewCode] = useState('')
  const [newType, setNewType] = useState<CouponType>('PERCENTAGE')
  const [newValue, setNewValue] = useState('')
  const [newMinPurchase, setNewMinPurchase] = useState('')
  const [newMaxUses, setNewMaxUses] = useState('')
  const [newExpiry, setNewExpiry] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const filteredCoupons = MOCK_COUPONS.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(search.toLowerCase()) ||
      coupon.description.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && coupon.isActive) ||
      (statusFilter === 'inactive' && !coupon.isActive)
    return matchesSearch && matchesStatus
  })

  const getCouponValueDisplay = (coupon: Coupon) => {
    switch (coupon.type) {
      case 'PERCENTAGE':
        return `${coupon.value}%`
      case 'FIXED':
        return formatCurrency(coupon.value)
      case 'FREE_SHIPPING':
        return 'Gratis'
      case 'BUY_X_GET_Y':
        return '2x1'
      default:
        return `${coupon.value}`
    }
  }

  const getUsagePercentage = (coupon: Coupon) => {
    return Math.min((coupon.currentUses / coupon.maxUses) * 100, 100)
  }

  const isExpired = (coupon: Coupon) => {
    return new Date() > coupon.expiryDate
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
            <Ticket className="h-5 w-5 text-cbd-green" />
            Gestion de Cupones
          </CardTitle>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
                <Plus className="h-4 w-4 mr-1" /> Nuevo Cupon
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a1a2e] border-cbd-green/20 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Crear Cupon</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-white">Codigo</Label>
                  <Input
                    placeholder="Ej: VERANO30"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    className="bg-black/20 border-white/10 uppercase"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-white">Tipo</Label>
                    <Select value={newType} onValueChange={(v) => setNewType(v as CouponType)}>
                      <SelectTrigger className="bg-black/20 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">Porcentaje</SelectItem>
                        <SelectItem value="FIXED">Importe Fijo</SelectItem>
                        <SelectItem value="FREE_SHIPPING">Envio Gratis</SelectItem>
                        <SelectItem value="BUY_X_GET_Y">Compra X Lleva Y</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Valor</Label>
                    <Input
                      type="number"
                      placeholder={newType === 'PERCENTAGE' ? '0%' : '0 EUR'}
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-white">Compra Minima</Label>
                    <Input
                      type="number"
                      placeholder="0 EUR"
                      value={newMinPurchase}
                      onChange={(e) => setNewMinPurchase(e.target.value)}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Usos Maximos</Label>
                    <Input
                      type="number"
                      placeholder="Sin limite"
                      value={newMaxUses}
                      onChange={(e) => setNewMaxUses(e.target.value)}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Fecha Expiracion</Label>
                  <Input
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Descripcion</Label>
                  <Input
                    placeholder="Descripcion del cupon..."
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
                    Crear Cupon
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por codigo o descripcion..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-black/20 border-white/10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-black/20 border-white/10">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Coupon List */}
          <div className="space-y-2">
            {filteredCoupons.map((coupon, index) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5 hover:border-cbd-green/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'p-2 rounded-lg',
                    coupon.isActive ? 'bg-cbd-green/10' : 'bg-red-500/10'
                  )}>
                    <Ticket className={cn(
                      'h-5 w-5',
                      coupon.isActive ? 'text-cbd-green' : 'text-red-400'
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded">
                        {coupon.code}
                      </code>
                      <Badge className="text-[10px] bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {getCouponTypeLabel(coupon.type)}
                      </Badge>
                      {isExpired(coupon) && (
                        <Badge className="text-[10px] bg-red-500/20 text-red-400 border-red-500/30">
                          Expirado
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{coupon.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Value */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-cbd-green">{getCouponValueDisplay(coupon)}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Min: {coupon.minPurchase > 0 ? formatCurrency(coupon.minPurchase) : 'Sin min'}
                    </p>
                  </div>

                  {/* Usage */}
                  <div className="hidden md:block w-28">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>{coupon.currentUses} usos</span>
                      <span>{coupon.maxUses} max</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/30 overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          getUsagePercentage(coupon) >= 90 ? 'bg-red-400' : 'bg-cbd-green'
                        )}
                        style={{ width: `${getUsagePercentage(coupon)}%` }}
                      />
                    </div>
                  </div>

                  {/* Expiry */}
                  <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(coupon.expiryDate)}</span>
                  </div>

                  {/* Status Badge */}
                  <Badge className={cn(
                    'text-[10px]',
                    coupon.isActive
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  )}>
                    {coupon.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" /> Copiar Codigo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {coupon.isActive ? (
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
            ))}
          </div>

          {filteredCoupons.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No se encontraron cupones.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
