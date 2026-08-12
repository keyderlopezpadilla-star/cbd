'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency } from '@/lib/utils'
import { Package, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { PRODUCT_PERFORMANCE_DATA, type ProductPerformanceData } from '@/lib/mock-data/analytics'

type SortField = 'revenue' | 'unitsSold' | 'margin' | 'marginPercent'
type SortDirection = 'asc' | 'desc'

interface ProductPerformanceProps {
  filters: {
    categories: string[]
  }
}

function MiniSparkline({ data, color = '#00FF66' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 60
  const height = 20

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  )
}

export function ProductPerformance({ filters }: ProductPerformanceProps) {
  const [sortField, setSortField] = useState<SortField>('revenue')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [showTop, setShowTop] = useState(true)

  const filteredProducts = useMemo(() => {
    let data = [...PRODUCT_PERFORMANCE_DATA]
    if (filters.categories.length > 0) {
      data = data.filter((p) => filters.categories.includes(p.category))
    }
    return data
  }, [filters.categories])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      return sortDirection === 'desc' ? bVal - aVal : aVal - bVal
    })
    return sorted
  }, [filteredProducts, sortField, sortDirection])

  const displayedProducts = showTop ? sortedProducts.slice(0, 10) : sortedProducts.slice(-5).reverse()

  const top10ChartData = useMemo(
    () =>
      filteredProducts
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)
        .map((p) => ({
          name: p.productName.length > 20 ? p.productName.substring(0, 20) + '...' : p.productName,
          revenue: p.revenue,
          margin: p.margin,
        })),
    [filteredProducts]
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const categoryLabels: Record<string, string> = {
    oils: 'Aceites',
    cosmetics: 'Cosmetica',
    flowers: 'Flores',
    capsules: 'Capsulas',
    creams: 'Cremas',
    wellness: 'Bienestar',
    accessories: 'Accesorios',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="glass border-cbd-green/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-cbd-green" />
              <div>
                <CardTitle className="text-lg font-semibold text-white">
                  Rendimiento de Productos
                </CardTitle>
                <p className="text-xs text-cbd-gray-light mt-0.5">
                  {showTop ? 'Top 10' : 'Bottom 5'} productos por {sortField === 'revenue' ? 'ingresos' : sortField === 'unitsSold' ? 'unidades' : 'margen'}
                </p>
              </div>
            </div>
            <div className="flex rounded-lg bg-black/30 border border-white/10 p-0.5">
              <button
                onClick={() => setShowTop(true)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                  showTop ? 'bg-cbd-green text-black' : 'text-cbd-gray-light hover:text-white'
                )}
              >
                Top
              </button>
              <button
                onClick={() => setShowTop(false)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                  !showTop ? 'bg-red-500/80 text-white' : 'text-cbd-gray-light hover:text-white'
                )}
              >
                Bottom
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Top 10 Bar Chart */}
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10ChartData} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#888', fontSize: 10 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#888', fontSize: 10 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name === 'revenue' ? 'Ingresos' : 'Margen',
                  ]}
                />
                <Bar dataKey="revenue" fill="#00FF66" radius={[0, 4, 4, 0]} />
                <Bar dataKey="margin" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sortable Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-cbd-gray-light font-medium">Producto</th>
                  <th className="text-left py-2 px-3 text-cbd-gray-light font-medium">Categoria</th>
                  <th className="text-center py-2 px-3 text-cbd-gray-light font-medium">Tendencia</th>
                  <th className="text-right py-2 px-3">
                    <button
                      onClick={() => handleSort('revenue')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'revenue' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      Ingresos
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-2 px-3">
                    <button
                      onClick={() => handleSort('unitsSold')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'unitsSold' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      Uds.
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-2 px-3">
                    <button
                      onClick={() => handleSort('marginPercent')}
                      className={cn(
                        'inline-flex items-center gap-1 font-medium',
                        sortField === 'marginPercent' ? 'text-cbd-green' : 'text-cbd-gray-light hover:text-white'
                      )}
                    >
                      Margen
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((product) => {
                  const trendChange = product.trend.length >= 2
                    ? ((product.trend[product.trend.length - 1] - product.trend[0]) / product.trend[0]) * 100
                    : 0

                  return (
                    <tr key={product.productId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 text-white font-medium max-w-[180px] truncate">
                        {product.productName}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-cbd-gray-light text-[10px]">
                          {categoryLabels[product.category]}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <MiniSparkline
                            data={product.trend}
                            color={trendChange >= 0 ? '#00FF66' : '#ef4444'}
                          />
                          <span
                            className={cn(
                              'text-[10px] font-medium',
                              trendChange >= 0 ? 'text-cbd-green' : 'text-red-400'
                            )}
                          >
                            {trendChange >= 0 ? '+' : ''}{trendChange.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right text-white">{formatCurrency(product.revenue)}</td>
                      <td className="py-2.5 px-3 text-right text-cbd-gray-light">{product.unitsSold}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={cn(
                          'font-medium',
                          product.marginPercent >= 55 ? 'text-cbd-green' : product.marginPercent >= 45 ? 'text-amber-400' : 'text-red-400'
                        )}>
                          {product.marginPercent}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
