'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Store } from '@/types'
import { STORE_MANAGERS } from '@/lib/mock-data/stores'

const storeSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  address: z.string().min(1, 'La direccion es obligatoria'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  postalCode: z.string().min(1, 'El codigo postal es obligatorio'),
  country: z.string().min(1, 'El pais es obligatorio'),
  phone: z.string().min(1, 'El telefono es obligatorio'),
  email: z.string().email('Email no valido'),
  managerId: z.string().nullable(),
  latitude: z.coerce.number().nullable().optional(),
  longitude: z.coerce.number().nullable().optional(),
  isActive: z.boolean(),
})

type StoreFormData = z.infer<typeof storeSchema>

interface StoreFormProps {
  initialData?: Store
  onSubmit?: (data: StoreFormData) => void
}

export function StoreForm({ initialData, onSubmit }: StoreFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          address: initialData.address,
          city: initialData.city,
          postalCode: initialData.postalCode,
          country: initialData.country,
          phone: initialData.phone,
          email: initialData.email,
          managerId: initialData.managerId,
          latitude: initialData.latitude,
          longitude: initialData.longitude,
          isActive: initialData.isActive,
        }
      : {
          name: '',
          address: '',
          city: '',
          postalCode: '',
          country: 'España',
          phone: '',
          email: '',
          managerId: null,
          latitude: null,
          longitude: null,
          isActive: true,
        },
  })

  const isActive = watch('isActive')
  const managerId = watch('managerId')

  const handleFormSubmit = (data: StoreFormData) => {
    if (onSubmit) {
      onSubmit(data)
    }
    // In demo mode, just navigate back
    router.push('/dashboard/stores')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card className="glass border-cbd-green/10">
          <CardHeader>
            <CardTitle className="text-lg text-white">Informacion Basica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-cbd-gray-light">Nombre *</label>
                <Input
                  {...register('name')}
                  placeholder="Nombre de la tienda"
                  className="bg-cbd-black/50 border-cbd-green/20 text-white"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-cbd-gray-light">Email *</label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="tienda@cbdsaas.com"
                  className="bg-cbd-black/50 border-cbd-green/20 text-white"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-cbd-gray-light">Direccion *</label>
              <Input
                {...register('address')}
                placeholder="Calle, numero, piso..."
                className="bg-cbd-black/50 border-cbd-green/20 text-white"
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-cbd-gray-light">Ciudad *</label>
                <Input
                  {...register('city')}
                  placeholder="Ciudad"
                  className="bg-cbd-black/50 border-cbd-green/20 text-white"
                />
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-cbd-gray-light">Codigo Postal *</label>
                <Input
                  {...register('postalCode')}
                  placeholder="28001"
                  className="bg-cbd-black/50 border-cbd-green/20 text-white"
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500">{errors.postalCode.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-cbd-gray-light">Pais *</label>
                <Input
                  {...register('country')}
                  placeholder="España"
                  className="bg-cbd-black/50 border-cbd-green/20 text-white"
                />
                {errors.country && (
                  <p className="text-xs text-red-500">{errors.country.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-cbd-gray-light">Telefono *</label>
              <Input
                {...register('phone')}
                placeholder="+34 91 234 5678"
                className="bg-cbd-black/50 border-cbd-green/20 text-white"
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Manager & Settings */}
        <Card className="glass border-cbd-green/10">
          <CardHeader>
            <CardTitle className="text-lg text-white">Gestion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-cbd-gray-light">Manager</label>
              <Select
                value={managerId || ''}
                onValueChange={(value) => setValue('managerId', value || null)}
              >
                <SelectTrigger className="bg-cbd-black/50 border-cbd-green/20 text-white">
                  <SelectValue placeholder="Seleccionar manager" />
                </SelectTrigger>
                <SelectContent className="bg-cbd-black border-cbd-green/20">
                  {STORE_MANAGERS.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-cbd-black/50 border border-cbd-green/10">
              <div>
                <p className="text-sm font-medium text-white">Tienda Activa</p>
                <p className="text-xs text-cbd-gray-light">
                  Las tiendas inactivas no procesan pedidos
                </p>
              </div>
              <button
                type="button"
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isActive ? 'bg-cbd-green' : 'bg-cbd-gray/30'
                }`}
                onClick={() => setValue('isActive', !isActive)}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    isActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Coordinates (Optional) */}
        <Card className="glass border-cbd-green/10">
          <CardHeader>
            <CardTitle className="text-lg text-white">Coordenadas (Opcional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-cbd-gray-light">Latitud</label>
                <Input
                  {...register('latitude', { valueAsNumber: true })}
                  type="number"
                  step="any"
                  placeholder="40.4168"
                  className="bg-cbd-black/50 border-cbd-green/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-cbd-gray-light">Longitud</label>
                <Input
                  {...register('longitude', { valueAsNumber: true })}
                  type="number"
                  step="any"
                  placeholder="-3.7038"
                  className="bg-cbd-black/50 border-cbd-green/20 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/stores')}
            className="border-cbd-green/20 text-cbd-gray-light hover:text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-cbd-green text-cbd-black hover:bg-cbd-green-light font-semibold"
          >
            <Save className="h-4 w-4 mr-2" />
            {initialData ? 'Guardar Cambios' : 'Crear Tienda'}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
