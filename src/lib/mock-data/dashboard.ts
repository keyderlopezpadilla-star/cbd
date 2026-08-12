import { KPIMetrics, SalesChartData, StorePerformance } from '@/types'

// KPI Metrics
export const kpiMetrics: KPIMetrics = {
  dailySales: 4850.75,
  monthlySales: 142680.50,
  profit: 38520.30,
  averageTicket: 67.40,
  productsSold: 312,
  newCustomers: 28,
  pendingOrders: 14,
  lowStock: 7,
  criticalStock: 3,
}

// Previous day metrics for comparison
export const previousDayMetrics: KPIMetrics = {
  dailySales: 4320.50,
  monthlySales: 138450.00,
  profit: 35890.20,
  averageTicket: 62.80,
  productsSold: 287,
  newCustomers: 22,
  pendingOrders: 18,
  lowStock: 5,
  criticalStock: 2,
}

// Sales trend data - last 30 days
export const salesTrendData: SalesChartData[] = [
  { date: '01 Mar', sales: 3250, orders: 48 },
  { date: '02 Mar', sales: 4100, orders: 61 },
  { date: '03 Mar', sales: 3800, orders: 56 },
  { date: '04 Mar', sales: 4500, orders: 67 },
  { date: '05 Mar', sales: 4200, orders: 63 },
  { date: '06 Mar', sales: 5100, orders: 76 },
  { date: '07 Mar', sales: 5400, orders: 80 },
  { date: '08 Mar', sales: 3900, orders: 58 },
  { date: '09 Mar', sales: 4300, orders: 64 },
  { date: '10 Mar', sales: 4700, orders: 70 },
  { date: '11 Mar', sales: 4100, orders: 61 },
  { date: '12 Mar', sales: 3600, orders: 54 },
  { date: '13 Mar', sales: 5200, orders: 77 },
  { date: '14 Mar', sales: 5600, orders: 83 },
  { date: '15 Mar', sales: 4800, orders: 71 },
  { date: '16 Mar', sales: 4400, orders: 65 },
  { date: '17 Mar', sales: 4900, orders: 73 },
  { date: '18 Mar', sales: 5300, orders: 79 },
  { date: '19 Mar', sales: 4600, orders: 68 },
  { date: '20 Mar', sales: 5800, orders: 86 },
  { date: '21 Mar', sales: 6100, orders: 91 },
  { date: '22 Mar', sales: 5500, orders: 82 },
  { date: '23 Mar', sales: 4200, orders: 63 },
  { date: '24 Mar', sales: 4700, orders: 70 },
  { date: '25 Mar', sales: 5000, orders: 74 },
  { date: '26 Mar', sales: 5400, orders: 80 },
  { date: '27 Mar', sales: 5900, orders: 88 },
  { date: '28 Mar', sales: 5200, orders: 77 },
  { date: '29 Mar', sales: 4800, orders: 71 },
  { date: '30 Mar', sales: 4850, orders: 72 },
]

// Store performance data
export const storePerformanceData: StorePerformance[] = [
  {
    storeId: '1',
    storeName: 'Madrid Centro',
    sales: 42850.00,
    orders: 635,
    averageTicket: 67.48,
    growth: 12.5,
  },
  {
    storeId: '2',
    storeName: 'Valencia Puerto',
    sales: 35420.00,
    orders: 528,
    averageTicket: 67.08,
    growth: 8.3,
  },
  {
    storeId: '3',
    storeName: 'Barcelona Gotico',
    sales: 38900.00,
    orders: 580,
    averageTicket: 67.07,
    growth: 15.2,
  },
  {
    storeId: '4',
    storeName: 'Alicante Marina',
    sales: 28650.00,
    orders: 426,
    averageTicket: 67.25,
    growth: 5.7,
  },
  {
    storeId: '5',
    storeName: 'Sevilla Triana',
    sales: 31200.00,
    orders: 465,
    averageTicket: 67.10,
    growth: -2.4,
  },
]

// Revenue by store (for bar chart)
export const revenueByStoreData = [
  { name: 'Madrid', revenue: 42850 },
  { name: 'Valencia', revenue: 35420 },
  { name: 'Barcelona', revenue: 38900 },
  { name: 'Alicante', revenue: 28650 },
  { name: 'Sevilla', revenue: 31200 },
]

// Recent activity items
export interface ActivityItem {
  id: string
  type: 'order' | 'stock_alert' | 'transfer' | 'customer' | 'sale'
  title: string
  description: string
  timestamp: string
  store?: string
}

export const recentActivityData: ActivityItem[] = [
  {
    id: '1',
    type: 'sale',
    title: 'Nueva venta completada',
    description: 'Venta #VNT-4521 por 89.50 EUR en Madrid Centro',
    timestamp: '2024-03-30T14:32:00Z',
    store: 'Madrid Centro',
  },
  {
    id: '2',
    type: 'stock_alert',
    title: 'Alerta de stock bajo',
    description: 'CBD Oil 10% - Solo quedan 4 unidades en Valencia Puerto',
    timestamp: '2024-03-30T13:45:00Z',
    store: 'Valencia Puerto',
  },
  {
    id: '3',
    type: 'order',
    title: 'Nuevo pedido recibido',
    description: 'Pedido #ORD-8834 - 3 productos, 156.00 EUR',
    timestamp: '2024-03-30T12:20:00Z',
    store: 'Barcelona Gotico',
  },
  {
    id: '4',
    type: 'transfer',
    title: 'Transferencia completada',
    description: 'Transfer #TRF-220 de Alicante Marina a Sevilla Triana',
    timestamp: '2024-03-30T11:10:00Z',
    store: 'Alicante Marina',
  },
  {
    id: '5',
    type: 'customer',
    title: 'Nuevo cliente registrado',
    description: 'Maria Garcia se registro en Madrid Centro',
    timestamp: '2024-03-30T10:05:00Z',
    store: 'Madrid Centro',
  },
  {
    id: '6',
    type: 'sale',
    title: 'Venta de alto valor',
    description: 'Venta #VNT-4520 por 245.00 EUR en Barcelona Gotico',
    timestamp: '2024-03-30T09:30:00Z',
    store: 'Barcelona Gotico',
  },
  {
    id: '7',
    type: 'stock_alert',
    title: 'Stock critico',
    description: 'CBD Capsules 25mg - Solo 2 unidades en Sevilla Triana',
    timestamp: '2024-03-30T08:15:00Z',
    store: 'Sevilla Triana',
  },
  {
    id: '8',
    type: 'order',
    title: 'Pedido enviado',
    description: 'Pedido #ORD-8832 enviado a cliente - Tracking activo',
    timestamp: '2024-03-30T07:45:00Z',
    store: 'Madrid Centro',
  },
]

// Top products
export interface TopProduct {
  id: string
  name: string
  category: string
  unitsSold: number
  revenue: number
  trend: number
}

export const topProductsData: TopProduct[] = [
  {
    id: '1',
    name: 'CBD Oil Premium 10%',
    category: 'Aceites CBD',
    unitsSold: 145,
    revenue: 7250.00,
    trend: 18.5,
  },
  {
    id: '2',
    name: 'CBD Cream Recovery',
    category: 'Cremas',
    unitsSold: 98,
    revenue: 4410.00,
    trend: 12.3,
  },
  {
    id: '3',
    name: 'CBD Capsules 25mg',
    category: 'Capsulas',
    unitsSold: 87,
    revenue: 3480.00,
    trend: 8.7,
  },
  {
    id: '4',
    name: 'CBD Flower Relax',
    category: 'Flores',
    unitsSold: 76,
    revenue: 2280.00,
    trend: -3.2,
  },
  {
    id: '5',
    name: 'CBD Serum Facial',
    category: 'Cosmetica',
    unitsSold: 64,
    revenue: 3840.00,
    trend: 22.1,
  },
]
