'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FlaskConical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  FileText,
  Package,
  Search,
  Edit3,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  PRODUCT_COMPLIANCE_RECORDS,
  ProductComplianceRecord,
  RegulatoryCategory,
} from '@/lib/mock-data/compliance'

const categoryLabels: Record<RegulatoryCategory, string> = {
  novel_food: 'Novel Food',
  cosmetics: 'Cosmeticos',
  supplements: 'Suplementos',
  raw_material: 'Materia Prima',
}

const novelFoodLabels = {
  registered: 'Registrado',
  pending: 'Pendiente',
  not_required: 'No Requerido',
  exempt: 'Exento',
}

const countries = ['ES', 'PT', 'FR', 'DE', 'IT', 'UK', 'NL', 'BE', 'AT', 'CH']

export function ProductComplianceForm() {
  const [products] = useState<ProductComplianceRecord[]>(PRODUCT_COMPLIANCE_RECORDS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ProductComplianceRecord | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const filteredProducts = products.filter(
    (p) =>
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const compliantCount = products.filter((p) => p.compliant).length
  const nonCompliantCount = products.filter((p) => !p.compliant).length

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cbd-green/10">
              <CheckCircle className="h-5 w-5 text-cbd-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{compliantCount}</p>
              <p className="text-xs text-muted-foreground">Productos Conformes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-400/10">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{nonCompliantCount}</p>
              <p className="text-xs text-muted-foreground">Requieren Atencion</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
              <p className="text-xs text-muted-foreground">Total Productos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar producto por nombre o SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-white/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <Card className="glass border border-white/10 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-cbd-green" />
              Productos ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'rounded-lg border p-3 cursor-pointer transition-colors',
                  selectedProduct?.id === product.id
                    ? 'border-cbd-green/50 bg-cbd-green/5'
                    : 'border-white/5 bg-white/5 hover:bg-white/10'
                )}
                onClick={() => {
                  setSelectedProduct(product)
                  setIsEditing(false)
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{product.productName}</span>
                  {product.compliant ? (
                    <CheckCircle className="h-4 w-4 text-cbd-green flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] border-white/20">
                    {product.sku}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] border-white/20">
                    {categoryLabels[product.regulatoryCategory]}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Product Detail / Form */}
        <Card className="glass border border-white/10 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-cbd-green" />
                {selectedProduct
                  ? isEditing
                    ? 'Editar Cumplimiento'
                    : 'Detalle de Cumplimiento'
                  : 'Selecciona un Producto'}
              </CardTitle>
              {selectedProduct && !isEditing && (
                <Button
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="bg-cbd-green text-black hover:bg-cbd-green/90"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  Editar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedProduct ? (
              <div className="space-y-6">
                {/* Status */}
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-xs',
                      selectedProduct.compliant
                        ? 'border-cbd-green/50 text-cbd-green bg-cbd-green/10'
                        : 'border-red-400/50 text-red-400 bg-red-400/10'
                    )}
                  >
                    {selectedProduct.compliant ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Conforme</>
                    ) : (
                      <><XCircle className="h-3 w-3 mr-1" /> No Conforme</>
                    )}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-white/20">
                    {categoryLabels[selectedProduct.regulatoryCategory]}
                  </Badge>
                </div>

                {isEditing ? (
                  /* Edit Form */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">THC % (Maximo: {selectedProduct.maxThcAllowed}%)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={selectedProduct.thcPercentage}
                          className="bg-white/5 border-white/10"
                        />
                        <p className="text-[10px] text-muted-foreground">EU: max 0.2% | US: max 0.3%</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">CBD %</Label>
                        <Input
                          type="number"
                          step="0.1"
                          defaultValue={selectedProduct.cbdPercentage}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Certificado Laboratorio</Label>
                        <Input
                          defaultValue={selectedProduct.labCertificateId}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Numero de Lote</Label>
                        <Input
                          defaultValue={selectedProduct.batchNumber}
                          className="bg-white/5 border-white/10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Categoria Regulatoria</Label>
                        <Select defaultValue={selectedProduct.regulatoryCategory}>
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(categoryLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Estado Novel Food</Label>
                        <Select defaultValue={selectedProduct.novelFoodStatus}>
                          <SelectTrigger className="bg-white/5 border-white/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(novelFoodLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Disponibilidad por Pais</Label>
                      <div className="flex flex-wrap gap-2">
                        {countries.map((country) => (
                          <Badge
                            key={country}
                            variant="outline"
                            className={cn(
                              'cursor-pointer text-xs',
                              selectedProduct.countryAvailability.includes(country)
                                ? 'border-cbd-green/50 text-cbd-green bg-cbd-green/10'
                                : 'border-white/20 text-muted-foreground'
                            )}
                          >
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Certificado de Laboratorio (PDF)</Label>
                      <div className="rounded-lg border border-dashed border-white/20 p-4 text-center">
                        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          Arrastra un archivo o haz clic para subir
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          PDF, max 10MB
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-cbd-green text-black hover:bg-cbd-green/90">
                        Guardar Cambios
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="text-muted-foreground"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* View Detail */
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                        <p className="text-xs text-muted-foreground">THC %</p>
                        <p className={cn(
                          'text-lg font-bold',
                          selectedProduct.thcPercentage > selectedProduct.maxThcAllowed
                            ? 'text-red-400'
                            : 'text-cbd-green'
                        )}>
                          {selectedProduct.thcPercentage}%
                        </p>
                        <p className="text-[10px] text-muted-foreground">Max: {selectedProduct.maxThcAllowed}%</p>
                      </div>
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                        <p className="text-xs text-muted-foreground">CBD %</p>
                        <p className="text-lg font-bold text-foreground">{selectedProduct.cbdPercentage}%</p>
                      </div>
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                        <p className="text-xs text-muted-foreground">Novel Food</p>
                        <p className="text-sm font-medium text-foreground">
                          {novelFoodLabels[selectedProduct.novelFoodStatus]}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Certificado Lab</p>
                        <p className="text-sm text-foreground">{selectedProduct.labCertificateId}</p>
                        <p className="text-xs text-muted-foreground">
                          Valido: {selectedProduct.labCertificateDate} - {selectedProduct.labCertificateExpiry}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Lote</p>
                        <p className="text-sm text-foreground">{selectedProduct.batchNumber}</p>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div>
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Disponibilidad por Pais
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.countryAvailability.map((country) => (
                          <Badge key={country} variant="outline" className="text-xs border-cbd-green/30 text-cbd-green">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Etiquetas de Advertencia</p>
                      <div className="space-y-1">
                        {selectedProduct.warningLabels.map((label, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-foreground">
                            <AlertTriangle className="h-3 w-3 text-yellow-400" />
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProduct.notes && (
                      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                        <p className="text-xs text-muted-foreground mb-1">Notas</p>
                        <p className="text-sm text-foreground">{selectedProduct.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <FlaskConical className="h-12 w-12 mb-3 opacity-50" />
                <p className="text-sm">Selecciona un producto para ver sus campos regulatorios</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
