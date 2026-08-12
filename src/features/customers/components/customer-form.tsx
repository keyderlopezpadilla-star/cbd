'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Customer } from '@/types'
import { DEMO_STORES } from '@/lib/constants'

interface CustomerFormData {
  name: string
  email: string
  phone: string
  birthDate: string
  preferredStoreId: string
  marketingConsent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  birthDate?: string
}

interface CustomerFormProps {
  customer?: Customer
  onSubmit: (data: CustomerFormData) => void
  onCancel: () => void
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string): boolean {
  if (!phone) return true
  return /^\+?[\d\s\-()]{9,15}$/.test(phone)
}

export function CustomerForm({ customer, onSubmit, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: customer?.name ?? '',
    email: customer?.email ?? '',
    phone: customer?.phone ?? '',
    birthDate: customer?.birthDate
      ? customer.birthDate.toISOString().split('T')[0]
      : '',
    preferredStoreId: customer?.preferredStoreId ?? '',
    marketingConsent: customer?.marketingConsent ?? false,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El formato del email no es valido'
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'El formato del telefono no es valido'
    }

    if (formData.birthDate) {
      const date = new Date(formData.birthDate)
      const now = new Date()
      if (date > now) {
        newErrors.birthDate = 'La fecha de nacimiento no puede ser futura'
      }
      const age = (now.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      if (age < 18) {
        newErrors.birthDate = 'El cliente debe ser mayor de 18 anos'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const updateField = (field: keyof CustomerFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">
            {customer ? 'Editar Cliente' : 'Nuevo Cliente'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-white">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Ej: Maria Lopez"
                  className={`bg-background/50 border-white/10 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Ej: maria@email.com"
                  className={`bg-background/50 border-white/10 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm text-white">
                  Telefono
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="Ej: +34 612 345 678"
                  className={`bg-background/50 border-white/10 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-400">{errors.phone}</p>
                )}
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm text-white">
                  Fecha de Nacimiento
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateField('birthDate', e.target.value)}
                  className={`bg-background/50 border-white/10 ${
                    errors.birthDate ? 'border-red-500' : ''
                  }`}
                />
                {errors.birthDate && (
                  <p className="text-xs text-red-400">{errors.birthDate}</p>
                )}
              </div>

              {/* Preferred Store */}
              <div className="space-y-2">
                <Label className="text-sm text-white">Tienda Preferida</Label>
                <Select
                  value={formData.preferredStoreId}
                  onValueChange={(v) => updateField('preferredStoreId', v)}
                >
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue placeholder="Seleccionar tienda" />
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

              {/* Marketing Consent */}
              <div className="space-y-2 flex items-end">
                <label className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/10 cursor-pointer w-full">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => updateField('marketingConsent', e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-background/50 text-cbd-green focus:ring-cbd-green"
                  />
                  <div>
                    <p className="text-sm text-white">Consentimiento Marketing</p>
                    <p className="text-xs text-muted-foreground">
                      Acepta recibir comunicaciones comerciales
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-cbd-green text-black hover:bg-cbd-green-light"
              >
                <Save className="h-4 w-4 mr-2" />
                {customer ? 'Guardar Cambios' : 'Crear Cliente'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
