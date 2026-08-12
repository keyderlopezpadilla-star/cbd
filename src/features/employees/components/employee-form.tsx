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
import { UserRole, DEMO_STORES } from '@/lib/constants'
import { EmployeeStatus } from '@/lib/mock-data/employees'

interface EmployeeFormProps {
  onSubmit: () => void
  onCancel: () => void
}

export function EmployeeForm({ onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: UserRole.EMPLOYEE as UserRole,
    storeId: '1',
    status: 'ACTIVE' as EmployeeStatus,
    department: 'Ventas',
    salary: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalido'
    if (!formData.phone.trim()) newErrors.phone = 'El telefono es obligatorio'
    if (!formData.salary || isNaN(Number(formData.salary))) newErrors.salary = 'Salario invalido'

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
          <CardTitle className="text-lg text-white">Nuevo Empleado</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Informacion Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="Nombre y apellidos"
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground">Email Corporativo *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="nombre@cbdsaas.com"
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
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-muted-foreground">Departamento</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="Ventas"
                  />
                </div>
              </div>
            </div>

            {/* Work Info */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Informacion Laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Rol *</Label>
                  <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v as UserRole })}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.EMPLOYEE}>Empleado</SelectItem>
                      <SelectItem value={UserRole.MANAGER}>Gerente</SelectItem>
                      <SelectItem value={UserRole.MARKETING}>Marketing</SelectItem>
                      <SelectItem value={UserRole.ACCOUNTING}>Contabilidad</SelectItem>
                      <SelectItem value={UserRole.ADMIN}>Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Tienda *</Label>
                  <Select value={formData.storeId} onValueChange={(v) => setFormData({ ...formData, storeId: v })}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEMO_STORES.map((store) => (
                        <SelectItem key={store.id} value={store.id}>
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-muted-foreground">Salario Mensual (EUR) *</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="bg-background/50 border-white/10"
                    placeholder="2000"
                  />
                  {errors.salary && <p className="text-xs text-red-400">{errors.salary}</p>}
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
                placeholder="Notas adicionales sobre el empleado..."
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
                Guardar Empleado
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
