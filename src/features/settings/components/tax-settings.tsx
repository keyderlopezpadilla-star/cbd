'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Receipt, Plus, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { TAX_RATES, TaxRate } from '@/lib/mock-data/settings'

export function TaxSettings() {
  const [taxes, setTaxes] = useState<TaxRate[]>(TAX_RATES)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTax, setNewTax] = useState({
    name: '',
    region: '',
    rate: '',
    productType: '',
  })

  const handleToggle = (id: string) => {
    setTaxes((prev) =>
      prev.map((tax) =>
        tax.id === id ? { ...tax, isActive: !tax.isActive } : tax
      )
    )
  }

  const handleDelete = (id: string) => {
    setTaxes((prev) => prev.filter((tax) => tax.id !== id))
  }

  const handleAdd = () => {
    if (newTax.name && newTax.region && newTax.rate && newTax.productType) {
      const tax: TaxRate = {
        id: `tax-${Date.now()}`,
        name: newTax.name,
        region: newTax.region,
        rate: parseFloat(newTax.rate),
        productType: newTax.productType,
        isActive: true,
      }
      setTaxes((prev) => [...prev, tax])
      setNewTax({ name: '', region: '', rate: '', productType: '' })
      setIsAdding(false)
    }
  }

  const groupedByRegion = taxes.reduce<Record<string, TaxRate[]>>((acc, tax) => {
    if (!acc[tax.region]) acc[tax.region] = []
    acc[tax.region].push(tax)
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass border-cbd-green/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Receipt className="h-5 w-5 text-cbd-green" />
            Configuracion de Impuestos
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setIsAdding(true)}
            className="bg-cbd-green text-black hover:bg-cbd-green/90"
          >
            <Plus className="h-4 w-4 mr-1" />
            Anadir Tasa
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Configura las tasas de impuestos por region y tipo de producto. Las tasas activas se aplicaran automaticamente a los pedidos correspondientes.
          </p>
        </CardContent>
      </Card>

      {/* Add New Tax Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="glass border-cbd-green/30">
            <CardHeader>
              <CardTitle className="text-white text-base">Nueva Tasa Impositiva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Nombre</Label>
                  <Input
                    placeholder="Ej: IVA General"
                    value={newTax.name}
                    onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Region</Label>
                  <Input
                    placeholder="Ej: Espana"
                    value={newTax.region}
                    onChange={(e) => setNewTax({ ...newTax, region: e.target.value })}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Tasa (%)</Label>
                  <Input
                    type="number"
                    placeholder="21"
                    value={newTax.rate}
                    onChange={(e) => setNewTax({ ...newTax, rate: e.target.value })}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Tipo de Producto</Label>
                  <Input
                    placeholder="Ej: General"
                    value={newTax.productType}
                    onChange={(e) => setNewTax({ ...newTax, productType: e.target.value })}
                    className="bg-black/20 border-white/10"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsAdding(false)} className="border-white/10">
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleAdd} className="bg-cbd-green text-black hover:bg-cbd-green/90">
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tax Rates by Region */}
      {Object.entries(groupedByRegion).map(([region, regionTaxes]) => (
        <Card key={region} className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <span className="text-cbd-green">{region}</span>
              <Badge variant="outline" className="text-xs border-white/20">
                {regionTaxes.length} tasas
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regionTaxes.map((tax) => (
              <div
                key={tax.id}
                className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggle(tax.id)}
                    className={cn(
                      'w-10 h-5 rounded-full relative transition-colors',
                      tax.isActive ? 'bg-cbd-green' : 'bg-white/20'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform',
                        tax.isActive ? 'translate-x-5' : 'translate-x-0.5'
                      )}
                    />
                  </button>
                  <div>
                    <p className="text-sm font-medium text-white">{tax.name}</p>
                    <p className="text-xs text-muted-foreground">{tax.productType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-cbd-green">{tax.rate}%</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(editingId === tax.id ? null : tax.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(tax.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-cbd-green text-black hover:bg-cbd-green/90 font-medium">
          Guardar Cambios
        </Button>
      </div>
    </motion.div>
  )
}
