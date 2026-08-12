'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, ArrowRightLeft } from 'lucide-react'
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
import { DEMO_STORES } from '@/lib/constants'
import { mockProducts } from '@/lib/mock-data/products'
import { cn } from '@/lib/utils'

const transferItemSchema = z.object({
  productId: z.string().min(1, 'Selecciona un producto'),
  productName: z.string(),
  quantity: z.number().min(1, 'Cantidad minima: 1'),
})

const transferFormSchema = z.object({
  fromStoreId: z.string().min(1, 'Selecciona la tienda de origen'),
  toStoreId: z.string().min(1, 'Selecciona la tienda de destino'),
  items: z.array(transferItemSchema).min(1, 'Agrega al menos un producto'),
  notes: z.string().optional(),
}).refine((data) => data.fromStoreId !== data.toStoreId, {
  message: 'La tienda de origen y destino deben ser diferentes',
  path: ['toStoreId'],
})

type TransferFormData = z.infer<typeof transferFormSchema>

export function TransferForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      fromStoreId: '',
      toStoreId: '',
      items: [{ productId: '', productName: '', quantity: 1 }],
      notes: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const watchFromStore = watch('fromStoreId')

  const onSubmit = (data: TransferFormData) => {
    // In a real app this would call an API
    console.log('Transfer request:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="glass">
        <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="h-16 w-16 rounded-full bg-cbd-green/20 flex items-center justify-center">
            <ArrowRightLeft className="h-8 w-8 text-cbd-green" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Transferencia Solicitada
          </h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Tu solicitud de transferencia ha sido creada y esta pendiente de aprobacion.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="mt-2"
          >
            Crear otra transferencia
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Source and Destination */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">Tiendas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Source Store */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Tienda de Origen *
              </label>
              <Select
                onValueChange={(value) => setValue('fromStoreId', value, { shouldValidate: true })}
              >
                <SelectTrigger className={cn(errors.fromStoreId && 'border-red-500')}>
                  <SelectValue placeholder="Seleccionar tienda origen" />
                </SelectTrigger>
                <SelectContent>
                  {DEMO_STORES.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name} - {store.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fromStoreId && (
                <p className="text-xs text-red-400">{errors.fromStoreId.message}</p>
              )}
            </div>

            {/* Destination Store */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Tienda de Destino *
              </label>
              <Select
                onValueChange={(value) => setValue('toStoreId', value, { shouldValidate: true })}
              >
                <SelectTrigger className={cn(errors.toStoreId && 'border-red-500')}>
                  <SelectValue placeholder="Seleccionar tienda destino" />
                </SelectTrigger>
                <SelectContent>
                  {DEMO_STORES.filter((store) => store.id !== watchFromStore).map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name} - {store.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.toStoreId && (
                <p className="text-xs text-red-400">{errors.toStoreId.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Productos</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ productId: '', productName: '', quantity: 1 })}
          >
            <Plus className="h-4 w-4" />
            Agregar Producto
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50"
            >
              {/* Product Select */}
              <div className="flex-1 space-y-1">
                <label className="text-xs text-muted-foreground">Producto</label>
                <Select
                  onValueChange={(value) => {
                    const product = mockProducts.find((p) => p.id === value)
                    if (product) {
                      setValue(`items.${index}.productId`, product.id, { shouldValidate: true })
                      setValue(`items.${index}.productName`, product.name)
                    }
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      'h-9',
                      errors.items?.[index]?.productId && 'border-red-500'
                    )}
                  >
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts
                      .filter((p) => p.isActive)
                      .map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.items?.[index]?.productId && (
                  <p className="text-xs text-red-400">
                    {errors.items[index]?.productId?.message}
                  </p>
                )}
              </div>

              {/* Quantity Input */}
              <div className="w-28 space-y-1">
                <label className="text-xs text-muted-foreground">Cantidad</label>
                <Input
                  type="number"
                  min={1}
                  className={cn(
                    'h-9',
                    errors.items?.[index]?.quantity && 'border-red-500'
                  )}
                  {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                />
                {errors.items?.[index]?.quantity && (
                  <p className="text-xs text-red-400">
                    {errors.items[index]?.quantity?.message}
                  </p>
                )}
              </div>

              {/* Remove Button */}
              <div className="pt-5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-red-400"
                  onClick={() => fields.length > 1 && remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {errors.items?.message && (
            <p className="text-xs text-red-400">{errors.items.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Notas adicionales sobre la transferencia (opcional)"
            {...register('notes')}
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium"
        >
          <ArrowRightLeft className="h-4 w-4" />
          Solicitar Transferencia
        </Button>
      </div>
    </form>
  )
}
