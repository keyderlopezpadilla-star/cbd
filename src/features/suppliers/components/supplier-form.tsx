'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Save, X } from 'lucide-react'
import { useState } from 'react'
import { SupplierStatus, PaymentTerms } from '@/lib/mock-data/suppliers'

interface SupplierFormProps {
  onSubmit: () => void
  onCancel: () => void
}

export function SupplierForm({ onSubmit, onCancel }: SupplierFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Espana',
    status: 'ACTIVE' as SupplierStatus,
    paymentTerms: 'NET_30' as PaymentTerms,
    leadTimeDays: '',
    categories: '',
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!formData.company.trim()) newErrors.company = 'La empresa es obligatoria'
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalido'
    if (!formData.phone.trim()) newErrors.phone = 'El telefono es obligatorio'
    if (!formData.address.trim()) newErrors.address = 'La direccion es obligatoria'
    if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria'
    if (!formData.leadTimeDays || isNaN(Number(formData.leadTimeDays))) newErrors.leadTimeDays = 'Lead time invalido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) {
      onSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Nuevo Proveedor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Info */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Informacion de la Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-muted-foreground">Empresa *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="Nombre de la empresa"
                  />
                  {errors.company && <p className="text-xs text-red-400">{errors.company}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground">Contacto Principal *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="Nombre del contacto"
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="email@empresa.com"
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-muted-foreground">Telefono *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="+34 XXX XXX XXX"
                  />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Direccion</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="address" className="text-muted-foreground">Direccion *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="Calle, numero, nave..."
                  />
                  {errors.address && <p className="text-xs text-red-400">{errors.address}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-muted-foreground">Ciudad *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="Ciudad"
                  />
                  {errors.city && <p className="text-xs text-red-400">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-muted-foreground">Pais</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="Pais"
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Condiciones Comerciales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Estado</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as SupplierStatus })}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Activo</SelectItem>
                      <SelectItem value="INACTIVE">Inactivo</SelectItem>
                      <SelectItem value="PENDING">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Condiciones de Pago</Label>
                  <Select value={formData.paymentTerms} onValueChange={(v) => setFormData({ ...formData, paymentTerms: v as PaymentTerms })}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NET_15">Neto 15 dias</SelectItem>
                      <SelectItem value="NET_30">Neto 30 dias</SelectItem>
                      <SelectItem value="NET_60">Neto 60 dias</SelectItem>
                      <SelectItem value="PREPAID">Prepago</SelectItem>
                      <SelectItem value="COD">Contra Entrega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadTime" className="text-muted-foreground">Lead Time (dias) *</Label>
                  <Input
                    id="leadTime"
                    type="number"
                    value={formData.leadTimeDays}
                    onChange={(e) => setFormData({ ...formData, leadTimeDays: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="7"
                  />
                  {errors.leadTimeDays && <p className="text-xs text-red-400">{errors.leadTimeDays}</p>}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-muted-foreground">Notas</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full h-24 rounded-md bg-background/50 border border-white/10 p-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cbd-green/50"
                placeholder="Notas adicionales sobre el proveedor..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCancel} className="border-white/10">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" className="bg-cbd-green text-black hover:bg-cbd-green-light">
                <Save className="h-4 w-4 mr-2" />
                Guardar Proveedor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
