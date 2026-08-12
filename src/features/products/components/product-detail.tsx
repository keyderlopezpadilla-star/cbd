'use client'

import { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PRODUCT_CATEGORIES, DEMO_STORES } from '@/lib/constants'
import { formatCurrency, cn } from '@/lib/utils'
import { ComplianceBadge, CertificationBadges } from './compliance-badge'
import {
  Package,
  Tag,
  Building2,
  FlaskConical,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  ExternalLink,
  Calendar,
} from 'lucide-react'

interface ProductDetailProps {
  product: Product
}

function getCategoryLabel(value: string): string {
  const cat = PRODUCT_CATEGORIES.find((c) => c.value === value)
  return cat?.label || value
}

function getMarginColor(margin: number): string {
  if (margin >= 40) return 'text-green-400'
  if (margin >= 20) return 'text-yellow-400'
  return 'text-red-400'
}

function getMarginBarColor(margin: number): string {
  if (margin >= 40) return 'bg-green-500'
  if (margin >= 20) return 'bg-yellow-500'
  return 'bg-red-500'
}

// Mock stock data for stores
const mockStoreStock = [
  { storeId: '1', storeName: 'Madrid Centro', quantity: 45, status: 'normal' },
  { storeId: '2', storeName: 'Valencia Puerto', quantity: 8, status: 'low' },
  { storeId: '3', storeName: 'Barcelona Gotico', quantity: 32, status: 'normal' },
  { storeId: '4', storeName: 'Alicante Marina', quantity: 3, status: 'critical' },
  { storeId: '5', storeName: 'Sevilla Triana', quantity: 0, status: 'out' },
]

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="space-y-6">
      {/* Top section: Image + Info */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Image gallery */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-cbd-green/15 via-cbd-green/5 to-transparent border border-border/50 flex items-center justify-center">
              <Package className="h-16 w-16 text-muted-foreground/30" />
            </div>
            {/* Thumbnail row */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'aspect-square rounded-md border border-border/50 bg-card/50',
                    i === 0 && 'border-cbd-green/50'
                  )}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{getCategoryLabel(product.category)}</Badge>
                  <ComplianceBadge status={product.regulatoryStatus} />
                  <div
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
                      product.isActive
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    )}
                  >
                    <div
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        product.isActive ? 'bg-green-500' : 'bg-red-500'
                      )}
                    />
                    {product.isActive ? 'Activo' : 'Inactivo'}
                  </div>
                </div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.sku}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic details grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Tag className="h-3 w-3" /> Marca
                </p>
                <p className="text-sm font-medium">{product.brand || 'Sin marca'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <FlaskConical className="h-3 w-3" /> Concentracion
                </p>
                <p className="text-sm font-medium">{product.concentration || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Package className="h-3 w-3" /> Lote
                </p>
                <p className="text-sm font-medium">{product.batchNumber || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Actualizado
                </p>
                <p className="text-sm font-medium">
                  {new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(
                    product.updatedAt instanceof Date ? product.updatedAt : new Date(product.updatedAt)
                  )}
                </p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Descripcion</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Composition */}
            {product.composition && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Composicion</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.composition}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pricing card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Precios y margen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Precio de venta</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(product.price)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Coste</p>
              <p className="text-2xl font-bold text-muted-foreground">{formatCurrency(product.cost)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Beneficio unitario</p>
              <p className="text-2xl font-bold text-cbd-green">
                {formatCurrency(product.price - product.cost)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Margen</p>
              <p className={cn('text-2xl font-bold', getMarginColor(product.margin))}>
                {product.margin.toFixed(1)}%
              </p>
              {/* Visual bar */}
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div
                  className={cn('h-full rounded-full transition-all', getMarginBarColor(product.margin))}
                  style={{ width: `${Math.min(product.margin, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-5 w-5 text-cbd-green" />
            Compliance CBD
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Regulatory Status */}
            <div className="space-y-2 rounded-lg border border-border/50 p-3">
              <p className="text-xs text-muted-foreground">Estado regulatorio</p>
              <ComplianceBadge status={product.regulatoryStatus} />
            </div>

            {/* Age Verification */}
            <div className="space-y-2 rounded-lg border border-border/50 p-3">
              <p className="text-xs text-muted-foreground">Verificacion de edad</p>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'h-3 w-3 rounded-full',
                    product.requiresAgeVerification ? 'bg-yellow-500' : 'bg-green-500'
                  )}
                />
                <span className="text-sm font-medium">
                  {product.requiresAgeVerification ? 'Requerida (+18)' : 'No requerida'}
                </span>
              </div>
            </div>

            {/* Lab Tests */}
            <div className="space-y-2 rounded-lg border border-border/50 p-3">
              <p className="text-xs text-muted-foreground">Pruebas de laboratorio</p>
              {product.laboratoryTests ? (
                <a
                  href={product.laboratoryTests}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-cbd-green hover:underline"
                >
                  Ver informe <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-sm text-muted-foreground">No disponible</span>
              )}
            </div>
          </div>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Certificaciones</p>
              <CertificationBadges certifications={product.certifications} />
            </div>
          )}

          {/* Territorial Restrictions */}
          {product.territorialRestrictions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Restricciones territoriales
              </p>
              <div className="flex flex-wrap gap-2">
                {product.territorialRestrictions.map((r) => (
                  <Badge key={r} variant="outline" className="border-yellow-500/30 text-yellow-400">
                    <MapPin className="mr-1 h-3 w-3" />
                    {r}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock across stores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-5 w-5 text-cbd-green" />
            Stock por tienda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-card/80 border-b border-border/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Tienda</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Cantidad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockStoreStock.map((store) => (
                  <tr key={store.storeId} className="border-b border-border/30">
                    <td className="px-4 py-3 text-sm font-medium">{store.storeName}</td>
                    <td className="px-4 py-3 text-sm">{store.quantity} uds.</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          store.status === 'normal'
                            ? 'success'
                            : store.status === 'low'
                              ? 'warning'
                              : 'destructive'
                        }
                        className="text-xs"
                      >
                        {store.status === 'normal' && 'Normal'}
                        {store.status === 'low' && 'Bajo'}
                        {store.status === 'critical' && 'Critico'}
                        {store.status === 'out' && 'Sin stock'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
