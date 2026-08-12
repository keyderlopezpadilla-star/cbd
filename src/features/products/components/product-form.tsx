'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Wand2, Plus, X, ExternalLink } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { PRODUCT_CATEGORIES } from '@/lib/constants'
import { generateSKU, formatCurrency, cn } from '@/lib/utils'
import { Product } from '@/types'

const productSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  sku: z.string().min(1, 'El SKU es obligatorio'),
  description: z.string().optional(),
  category: z.string().min(1, 'La categoria es obligatoria'),
  brand: z.string().optional(),
  price: z.coerce.number().min(0.01, 'El precio debe ser mayor a 0'),
  cost: z.coerce.number().min(0, 'El coste no puede ser negativo'),
  concentration: z.string().optional(),
  composition: z.string().optional(),
  batchNumber: z.string().optional(),
  laboratoryTests: z.string().url('Debe ser una URL valida').optional().or(z.literal('')),
  regulatoryStatus: z.string().optional(),
  requiresAgeVerification: z.boolean().default(false),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: Product
  onSubmit: (data: ProductFormValues & { certifications: string[]; territorialRestrictions: string[] }) => void
  onCancel?: () => void
}

const SKU_PREFIXES: Record<string, string> = {
  oils: 'OIL',
  cosmetics: 'COS',
  flowers: 'FLO',
  capsules: 'CAP',
  creams: 'CRM',
  wellness: 'WEL',
  accessories: 'ACC',
}

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [certifications, setCertifications] = useState<string[]>(initialData?.certifications || [])
  const [certInput, setCertInput] = useState('')
  const [restrictions, setRestrictions] = useState<string[]>(initialData?.territorialRestrictions || [])
  const [restrictionInput, setRestrictionInput] = useState('')
  const [calculatedMargin, setCalculatedMargin] = useState<number>(initialData?.margin || 0)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || '',
      sku: initialData?.sku || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
      brand: initialData?.brand || '',
      price: initialData?.price || 0,
      cost: initialData?.cost || 0,
      concentration: initialData?.concentration || '',
      composition: initialData?.composition || '',
      batchNumber: initialData?.batchNumber || '',
      laboratoryTests: initialData?.laboratoryTests || '',
      regulatoryStatus: initialData?.regulatoryStatus || 'pending',
      requiresAgeVerification: initialData?.requiresAgeVerification || false,
    },
  })

  const watchPrice = form.watch('price')
  const watchCost = form.watch('cost')
  const watchCategory = form.watch('category')

  useEffect(() => {
    const price = Number(watchPrice) || 0
    const cost = Number(watchCost) || 0
    if (price > 0) {
      setCalculatedMargin(((price - cost) / price) * 100)
    } else {
      setCalculatedMargin(0)
    }
  }, [watchPrice, watchCost])

  const handleGenerateSKU = () => {
    const prefix = SKU_PREFIXES[watchCategory] || 'PRD'
    const sku = generateSKU(prefix)
    form.setValue('sku', sku)
  }

  const handleAddCertification = () => {
    if (certInput.trim() && !certifications.includes(certInput.trim())) {
      setCertifications([...certifications, certInput.trim()])
      setCertInput('')
    }
  }

  const handleRemoveCertification = (cert: string) => {
    setCertifications(certifications.filter((c) => c !== cert))
  }

  const handleAddRestriction = () => {
    if (restrictionInput.trim() && !restrictions.includes(restrictionInput.trim())) {
      setRestrictions([...restrictions, restrictionInput.trim()])
      setRestrictionInput('')
    }
  }

  const handleRemoveRestriction = (r: string) => {
    setRestrictions(restrictions.filter((item) => item !== r))
  }

  const handleFormSubmit = (data: ProductFormValues) => {
    onSubmit({
      ...data,
      certifications,
      territorialRestrictions: restrictions,
    })
  }

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Info Basica</TabsTrigger>
          <TabsTrigger value="pricing">Precios</TabsTrigger>
          <TabsTrigger value="images">Imagenes</TabsTrigger>
          <TabsTrigger value="compliance">Compliance CBD</TabsTrigger>
        </TabsList>

        {/* Basic Info */}
        <TabsContent value="basic" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Nombre del producto <span className="text-red-400">*</span>
              </label>
              <Input
                {...form.register('name')}
                placeholder="Ej: Aceite CBD Premium 10%"
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-400">{form.formState.errors.name.message}</p>
              )}
            </div>

            {/* SKU */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                SKU <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <Input {...form.register('sku')} placeholder="OIL-XXXXXXXX" className="flex-1" />
                <Button type="button" variant="outline" size="icon" onClick={handleGenerateSKU} title="Generar SKU">
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>
              {form.formState.errors.sku && (
                <p className="text-xs text-red-400">{form.formState.errors.sku.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Categoria <span className="text-red-400">*</span>
              </label>
              <Select
                value={form.watch('category')}
                onValueChange={(v) => form.setValue('category', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-xs text-red-400">{form.formState.errors.category.message}</p>
              )}
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Marca</label>
              <Input {...form.register('brand')} placeholder="Ej: GreenVita" />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Descripcion</label>
              <textarea
                {...form.register('description')}
                placeholder="Descripcion detallada del producto..."
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Precio de venta (EUR) <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                {...form.register('price')}
                placeholder="0.00"
              />
              {form.formState.errors.price && (
                <p className="text-xs text-red-400">{form.formState.errors.price.message}</p>
              )}
            </div>

            {/* Cost */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Coste (EUR) <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                {...form.register('cost')}
                placeholder="0.00"
              />
              {form.formState.errors.cost && (
                <p className="text-xs text-red-400">{form.formState.errors.cost.message}</p>
              )}
            </div>

            {/* Margin (read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Margen</label>
              <div className="flex h-10 items-center rounded-md border border-input bg-muted/50 px-3">
                <span
                  className={cn(
                    'font-medium',
                    calculatedMargin >= 40
                      ? 'text-green-400'
                      : calculatedMargin >= 20
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  )}
                >
                  {calculatedMargin.toFixed(2)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Calculado automaticamente</p>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <h4 className="mb-3 text-sm font-medium text-muted-foreground">Resumen de precios</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Venta</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(Number(watchPrice) || 0)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Coste</p>
                <p className="text-lg font-bold text-muted-foreground">{formatCurrency(Number(watchCost) || 0)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Beneficio</p>
                <p className="text-lg font-bold text-cbd-green">
                  {formatCurrency((Number(watchPrice) || 0) - (Number(watchCost) || 0))}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Images */}
        <TabsContent value="images" className="space-y-6 pt-4">
          <div>
            <h4 className="mb-4 text-sm font-medium">Imagenes del producto</h4>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="group relative flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border/50 bg-card/30 transition-colors hover:border-cbd-green/50 hover:bg-cbd-green/5"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-cbd-green">
                    <Plus className="h-8 w-8" />
                    <span className="text-xs">Subir imagen</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Formatos aceptados: JPG, PNG, WebP. Tamano maximo: 5MB por imagen.
            </p>
          </div>
        </TabsContent>

        {/* CBD Compliance */}
        <TabsContent value="compliance" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Concentration */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Concentracion CBD</label>
              <Input
                {...form.register('concentration')}
                placeholder="Ej: 10% CBD, 25mg por capsula"
              />
            </div>

            {/* Batch Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Numero de lote</label>
              <Input
                {...form.register('batchNumber')}
                placeholder="Ej: LOT-2024-OIL-001"
              />
            </div>

            {/* Composition */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Composicion</label>
              <textarea
                {...form.register('composition')}
                placeholder="Lista de ingredientes y composicion..."
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Certifications */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Certificaciones</label>
              <div className="flex gap-2">
                <Input
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Ej: GMP, ISO 9001, Organico UE..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddCertification()
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={handleAddCertification}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {certifications.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="gap-1 pr-1">
                      {cert}
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(cert)}
                        className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Laboratory Tests */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Pruebas de laboratorio (URL)</label>
              <div className="flex gap-2">
                <Input
                  {...form.register('laboratoryTests')}
                  placeholder="https://lab.example.com/report"
                  type="url"
                />
                <Button type="button" variant="ghost" size="icon" asChild>
                  <a
                    href={form.watch('laboratoryTests') || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              {form.formState.errors.laboratoryTests && (
                <p className="text-xs text-red-400">{form.formState.errors.laboratoryTests.message}</p>
              )}
            </div>

            {/* Regulatory Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado regulatorio</label>
              <Select
                value={form.watch('regulatoryStatus')}
                onValueChange={(v) => form.setValue('regulatoryStatus', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Aprobado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="under_review">En revision</SelectItem>
                  <SelectItem value="expired">Expirado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Territorial Restrictions */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Restricciones territoriales</label>
              <div className="flex gap-2">
                <Input
                  value={restrictionInput}
                  onChange={(e) => setRestrictionInput(e.target.value)}
                  placeholder="Ej: Canarias, Pais Vasco..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddRestriction()
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={handleAddRestriction}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {restrictions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {restrictions.map((r) => (
                    <Badge key={r} variant="outline" className="gap-1 pr-1 text-yellow-400 border-yellow-500/30">
                      {r}
                      <button
                        type="button"
                        onClick={() => handleRemoveRestriction(r)}
                        className="ml-1 rounded-full p-0.5 hover:bg-foreground/10"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Age Verification */}
            <div className="space-y-2 md:col-span-2">
              <Separator />
              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="text-sm font-medium">Verificacion de edad requerida</label>
                  <p className="text-xs text-muted-foreground">
                    Activa si el producto requiere que el comprador sea mayor de edad
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.watch('requiresAgeVerification')}
                  onClick={() =>
                    form.setValue('requiresAgeVerification', !form.watch('requiresAgeVerification'))
                  }
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    form.watch('requiresAgeVerification') ? 'bg-cbd-green' : 'bg-muted'
                  )}
                >
                  <span
                    className={cn(
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition-transform',
                      form.watch('requiresAgeVerification') ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Form actions */}
      <Separator />
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" className="bg-cbd-green text-black hover:bg-cbd-green/90">
          {initialData ? 'Guardar cambios' : 'Crear producto'}
        </Button>
      </div>
    </form>
  )
}
