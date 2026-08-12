// Analytics Mock Data - Time-series, store comparisons, product performance, employee metrics

export interface DailySalesData {
  date: string
  revenue: number
  orders: number
  avgTicket: number
  customers: number
  storeId: string
}

export interface StoreComparisonData {
  storeId: string
  storeName: string
  revenue: number
  orders: number
  avgTicket: number
  growth: number
  customers: number
  conversionRate: number
}

export interface ProductPerformanceData {
  productId: string
  productName: string
  category: string
  revenue: number
  unitsSold: number
  margin: number
  marginPercent: number
  trend: number[] // 7-day sparkline data
}

export interface EmployeePerformanceData {
  id: string
  name: string
  storeId: string
  storeName: string
  salesCount: number
  revenue: number
  avgTicket: number
  conversionRate: number
  hoursWorked: number
  revenuePerHour: number
}

export interface MarginByCategoryData {
  category: string
  categoryLabel: string
  revenue: number
  cost: number
  margin: number
  marginPercent: number
  products: number
}

export interface RevenueByChannelData {
  channel: string
  revenue: number
  percentage: number
}

export interface RevenueByPaymentData {
  method: string
  revenue: number
  percentage: number
}

export interface RevenueByCategoryData {
  category: string
  categoryLabel: string
  revenue: number
  percentage: number
}

// Seed-based deterministic random for consistent data
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

// Generate 90 days of daily sales data for all stores
function generateDailySalesData(): DailySalesData[] {
  const data: DailySalesData[] = []
  const storeBaseRevenue: Record<string, number> = {
    '1': 2400,
    '2': 1850,
    '3': 3100,
    '4': 1500,
    '5': 950,
  }
  const storeNames: Record<string, string> = {
    '1': 'Madrid Centro',
    '2': 'Valencia Puerto',
    '3': 'Barcelona Gotico',
    '4': 'Alicante Marina',
    '5': 'Sevilla Triana',
  }

  const today = new Date('2024-01-15')

  for (let dayOffset = 89; dayOffset >= 0; dayOffset--) {
    const date = new Date(today)
    date.setDate(date.getDate() - dayOffset)
    const dateStr = date.toISOString().split('T')[0]
    const dayOfWeek = date.getDay()

    for (const storeId of Object.keys(storeBaseRevenue)) {
      const base = storeBaseRevenue[storeId]
      const seed = dayOffset * 10 + parseInt(storeId)

      // Weekend boost
      const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.35 : 1.0
      // Seasonal trend (slight growth over 90 days)
      const trendMultiplier = 1 + (90 - dayOffset) * 0.002
      // Random variance
      const variance = 0.7 + seededRandom(seed) * 0.6

      const revenue = Math.round(base * weekendMultiplier * trendMultiplier * variance * 100) / 100
      const orders = Math.max(5, Math.round(revenue / (120 + seededRandom(seed + 1) * 40)))
      const avgTicket = Math.round((revenue / orders) * 100) / 100
      const customers = Math.round(orders * (1.2 + seededRandom(seed + 2) * 0.5))

      data.push({
        date: dateStr,
        revenue,
        orders,
        avgTicket,
        customers,
        storeId,
      })
    }
  }

  return data
}

export const DAILY_SALES_DATA: DailySalesData[] = generateDailySalesData()

// Aggregate functions
export function getFilteredSalesData(
  days: number,
  storeIds?: string[]
): DailySalesData[] {
  let data = DAILY_SALES_DATA
  if (days < 90) {
    data = data.slice(-(days * 5)) // 5 stores per day
  }
  if (storeIds && storeIds.length > 0) {
    data = data.filter((d) => storeIds.includes(d.storeId))
  }
  return data
}

export function aggregateByDate(data: DailySalesData[]): {
  date: string
  revenue: number
  orders: number
  avgTicket: number
  customers: number
}[] {
  const map = new Map<string, { revenue: number; orders: number; customers: number }>()

  for (const item of data) {
    const existing = map.get(item.date) || { revenue: 0, orders: 0, customers: 0 }
    existing.revenue += item.revenue
    existing.orders += item.orders
    existing.customers += item.customers
    map.set(item.date, existing)
  }

  return Array.from(map.entries())
    .map(([date, values]) => ({
      date,
      revenue: Math.round(values.revenue * 100) / 100,
      orders: values.orders,
      avgTicket: values.orders > 0 ? Math.round((values.revenue / values.orders) * 100) / 100 : 0,
      customers: values.customers,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function aggregateByWeek(data: DailySalesData[]): {
  date: string
  revenue: number
  orders: number
  avgTicket: number
  customers: number
}[] {
  const map = new Map<string, { revenue: number; orders: number; customers: number; firstDate: string }>()

  for (const item of data) {
    const d = new Date(item.date)
    const weekStart = new Date(d)
    weekStart.setDate(d.getDate() - d.getDay() + 1)
    const weekKey = weekStart.toISOString().split('T')[0]

    const existing = map.get(weekKey) || { revenue: 0, orders: 0, customers: 0, firstDate: weekKey }
    existing.revenue += item.revenue
    existing.orders += item.orders
    existing.customers += item.customers
    map.set(weekKey, existing)
  }

  return Array.from(map.entries())
    .map(([date, values]) => ({
      date,
      revenue: Math.round(values.revenue * 100) / 100,
      orders: values.orders,
      avgTicket: values.orders > 0 ? Math.round((values.revenue / values.orders) * 100) / 100 : 0,
      customers: values.customers,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function aggregateByMonth(data: DailySalesData[]): {
  date: string
  revenue: number
  orders: number
  avgTicket: number
  customers: number
}[] {
  const map = new Map<string, { revenue: number; orders: number; customers: number }>()

  for (const item of data) {
    const monthKey = item.date.substring(0, 7) // YYYY-MM
    const existing = map.get(monthKey) || { revenue: 0, orders: 0, customers: 0 }
    existing.revenue += item.revenue
    existing.orders += item.orders
    existing.customers += item.customers
    map.set(monthKey, existing)
  }

  return Array.from(map.entries())
    .map(([date, values]) => ({
      date,
      revenue: Math.round(values.revenue * 100) / 100,
      orders: values.orders,
      avgTicket: values.orders > 0 ? Math.round((values.revenue / values.orders) * 100) / 100 : 0,
      customers: values.customers,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Store comparison data
export const STORE_COMPARISON_DATA: StoreComparisonData[] = [
  {
    storeId: '1',
    storeName: 'Madrid Centro',
    revenue: 52340,
    orders: 385,
    avgTicket: 135.95,
    growth: 12.3,
    customers: 298,
    conversionRate: 68.5,
  },
  {
    storeId: '2',
    storeName: 'Valencia Puerto',
    revenue: 41200,
    orders: 305,
    avgTicket: 135.08,
    growth: 8.7,
    customers: 234,
    conversionRate: 64.2,
  },
  {
    storeId: '3',
    storeName: 'Barcelona Gotico',
    revenue: 68500,
    orders: 483,
    avgTicket: 141.82,
    growth: 15.1,
    customers: 372,
    conversionRate: 71.8,
  },
  {
    storeId: '4',
    storeName: 'Alicante Marina',
    revenue: 33800,
    orders: 242,
    avgTicket: 139.67,
    growth: 5.4,
    customers: 187,
    conversionRate: 62.1,
  },
  {
    storeId: '5',
    storeName: 'Sevilla Triana',
    revenue: 18900,
    orders: 142,
    avgTicket: 133.10,
    growth: -2.1,
    customers: 118,
    conversionRate: 55.3,
  },
]

// Product performance data
export const PRODUCT_PERFORMANCE_DATA: ProductPerformanceData[] = [
  {
    productId: 'prod-003',
    productName: 'Aceite CBD Ultra 20%',
    category: 'oils',
    revenue: 18450,
    unitsSold: 205,
    margin: 10670,
    marginPercent: 57.8,
    trend: [620, 680, 650, 710, 690, 730, 750],
  },
  {
    productId: 'prod-002',
    productName: 'Aceite CBD Intenso 10%',
    category: 'oils',
    revenue: 15200,
    unitsSold: 304,
    margin: 9120,
    marginPercent: 60.0,
    trend: [480, 510, 490, 520, 540, 530, 560],
  },
  {
    productId: 'prod-009',
    productName: 'Crema Facial CBD Anti-Edad',
    category: 'cosmetics',
    revenue: 12800,
    unitsSold: 256,
    margin: 7680,
    marginPercent: 60.0,
    trend: [380, 410, 420, 400, 430, 450, 470],
  },
  {
    productId: 'prod-001',
    productName: 'Aceite CBD Premium 5%',
    category: 'oils',
    revenue: 11400,
    unitsSold: 380,
    margin: 6650,
    marginPercent: 58.3,
    trend: [350, 360, 370, 380, 365, 390, 400],
  },
  {
    productId: 'prod-013',
    productName: 'Pack Bienestar CBD',
    category: 'wellness',
    revenue: 10500,
    unitsSold: 150,
    margin: 5250,
    marginPercent: 50.0,
    trend: [310, 340, 330, 360, 350, 380, 400],
  },
  {
    productId: 'prod-007',
    productName: 'Flores CBD Sativa Premium',
    category: 'flowers',
    revenue: 9800,
    unitsSold: 245,
    margin: 5880,
    marginPercent: 60.0,
    trend: [280, 300, 310, 290, 320, 340, 350],
  },
  {
    productId: 'prod-011',
    productName: 'Capsulas CBD 25mg x60',
    category: 'capsules',
    revenue: 8900,
    unitsSold: 178,
    margin: 4895,
    marginPercent: 55.0,
    trend: [260, 270, 280, 265, 290, 300, 310],
  },
  {
    productId: 'prod-015',
    productName: 'Balsamo CBD Sport',
    category: 'creams',
    revenue: 7600,
    unitsSold: 253,
    margin: 4180,
    marginPercent: 55.0,
    trend: [220, 235, 240, 250, 245, 260, 270],
  },
  {
    productId: 'prod-005',
    productName: 'Aceite CBD Full Spectrum 15%',
    category: 'oils',
    revenue: 7200,
    unitsSold: 120,
    margin: 4320,
    marginPercent: 60.0,
    trend: [200, 210, 220, 215, 230, 240, 250],
  },
  {
    productId: 'prod-010',
    productName: 'Serum CBD Vitamina C',
    category: 'cosmetics',
    revenue: 6800,
    unitsSold: 170,
    margin: 3740,
    marginPercent: 55.0,
    trend: [190, 200, 195, 210, 220, 215, 230],
  },
  {
    productId: 'prod-014',
    productName: 'Infusion CBD Relax',
    category: 'wellness',
    revenue: 5400,
    unitsSold: 360,
    margin: 2700,
    marginPercent: 50.0,
    trend: [160, 170, 165, 175, 180, 185, 190],
  },
  {
    productId: 'prod-008',
    productName: 'Flores CBD Indica Night',
    category: 'flowers',
    revenue: 5100,
    unitsSold: 170,
    margin: 3060,
    marginPercent: 60.0,
    trend: [150, 155, 160, 158, 165, 170, 175],
  },
  {
    productId: 'prod-016',
    productName: 'Crema Corporal CBD 200ml',
    category: 'creams',
    revenue: 4800,
    unitsSold: 160,
    margin: 2640,
    marginPercent: 55.0,
    trend: [140, 145, 148, 150, 155, 158, 160],
  },
  {
    productId: 'prod-012',
    productName: 'Capsulas CBD Melatonina',
    category: 'capsules',
    revenue: 4500,
    unitsSold: 150,
    margin: 2475,
    marginPercent: 55.0,
    trend: [130, 135, 138, 140, 142, 145, 148],
  },
  {
    productId: 'prod-017',
    productName: 'Vaporizador CBD Pen',
    category: 'accessories',
    revenue: 4200,
    unitsSold: 140,
    margin: 1890,
    marginPercent: 45.0,
    trend: [120, 125, 128, 130, 132, 135, 138],
  },
  {
    productId: 'prod-018',
    productName: 'Grinder Premium CBD',
    category: 'accessories',
    revenue: 3600,
    unitsSold: 180,
    margin: 1620,
    marginPercent: 45.0,
    trend: [100, 105, 108, 110, 112, 115, 118],
  },
  {
    productId: 'prod-019',
    productName: 'Gomitas CBD 10mg x30',
    category: 'wellness',
    revenue: 3200,
    unitsSold: 213,
    margin: 1600,
    marginPercent: 50.0,
    trend: [90, 95, 92, 98, 100, 102, 105],
  },
  {
    productId: 'prod-006',
    productName: 'Aceite CBD Mascotas 3%',
    category: 'oils',
    revenue: 2800,
    unitsSold: 140,
    margin: 1540,
    marginPercent: 55.0,
    trend: [80, 82, 85, 83, 88, 90, 92],
  },
  {
    productId: 'prod-020',
    productName: 'Jabon Artesanal CBD',
    category: 'cosmetics',
    revenue: 2400,
    unitsSold: 200,
    margin: 1200,
    marginPercent: 50.0,
    trend: [70, 72, 74, 73, 76, 78, 80],
  },
  {
    productId: 'prod-021',
    productName: 'Protector Labial CBD',
    category: 'cosmetics',
    revenue: 1800,
    unitsSold: 300,
    margin: 900,
    marginPercent: 50.0,
    trend: [55, 57, 56, 58, 60, 61, 63],
  },
  {
    productId: 'prod-022',
    productName: 'Papel de Liar Organico',
    category: 'accessories',
    revenue: 1200,
    unitsSold: 400,
    margin: 480,
    marginPercent: 40.0,
    trend: [35, 36, 37, 38, 38, 39, 40],
  },
]

// Employee performance data
export const EMPLOYEE_PERFORMANCE_DATA: EmployeePerformanceData[] = [
  {
    id: 'emp-001',
    name: 'Carlos Martinez',
    storeId: '1',
    storeName: 'Madrid Centro',
    salesCount: 142,
    revenue: 19280,
    avgTicket: 135.77,
    conversionRate: 72.5,
    hoursWorked: 168,
    revenuePerHour: 114.76,
  },
  {
    id: 'emp-002',
    name: 'Ana Garcia',
    storeId: '2',
    storeName: 'Valencia Puerto',
    salesCount: 118,
    revenue: 15930,
    avgTicket: 135.00,
    conversionRate: 68.3,
    hoursWorked: 160,
    revenuePerHour: 99.56,
  },
  {
    id: 'emp-003',
    name: 'Miguel Torres',
    storeId: '3',
    storeName: 'Barcelona Gotico',
    salesCount: 167,
    revenue: 24350,
    avgTicket: 145.81,
    conversionRate: 74.2,
    hoursWorked: 172,
    revenuePerHour: 141.57,
  },
  {
    id: 'emp-004',
    name: 'Laura Fernandez',
    storeId: '4',
    storeName: 'Alicante Marina',
    salesCount: 98,
    revenue: 13720,
    avgTicket: 140.00,
    conversionRate: 65.8,
    hoursWorked: 160,
    revenuePerHour: 85.75,
  },
  {
    id: 'emp-005',
    name: 'Pablo Ruiz',
    storeId: '5',
    storeName: 'Sevilla Triana',
    salesCount: 72,
    revenue: 9580,
    avgTicket: 133.06,
    conversionRate: 58.4,
    hoursWorked: 152,
    revenuePerHour: 63.03,
  },
  {
    id: 'emp-006',
    name: 'Sofia Morales',
    storeId: '1',
    storeName: 'Madrid Centro',
    salesCount: 128,
    revenue: 17150,
    avgTicket: 134.00,
    conversionRate: 70.1,
    hoursWorked: 168,
    revenuePerHour: 102.08,
  },
  {
    id: 'emp-007',
    name: 'Diego Navarro',
    storeId: '3',
    storeName: 'Barcelona Gotico',
    salesCount: 155,
    revenue: 22100,
    avgTicket: 142.58,
    conversionRate: 71.9,
    hoursWorked: 168,
    revenuePerHour: 131.55,
  },
  {
    id: 'emp-008',
    name: 'Elena Vega',
    storeId: '2',
    storeName: 'Valencia Puerto',
    salesCount: 105,
    revenue: 14200,
    avgTicket: 135.24,
    conversionRate: 66.7,
    hoursWorked: 160,
    revenuePerHour: 88.75,
  },
  {
    id: 'emp-009',
    name: 'Javier Castro',
    storeId: '3',
    storeName: 'Barcelona Gotico',
    salesCount: 148,
    revenue: 21500,
    avgTicket: 145.27,
    conversionRate: 73.1,
    hoursWorked: 168,
    revenuePerHour: 127.98,
  },
  {
    id: 'emp-010',
    name: 'Carmen Herrera',
    storeId: '1',
    storeName: 'Madrid Centro',
    salesCount: 115,
    revenue: 15910,
    avgTicket: 138.35,
    conversionRate: 69.2,
    hoursWorked: 160,
    revenuePerHour: 99.44,
  },
  {
    id: 'emp-011',
    name: 'Alejandro Gil',
    storeId: '4',
    storeName: 'Alicante Marina',
    salesCount: 88,
    revenue: 12080,
    avgTicket: 137.27,
    conversionRate: 63.5,
    hoursWorked: 160,
    revenuePerHour: 75.50,
  },
  {
    id: 'emp-012',
    name: 'Lucia Romero',
    storeId: '2',
    storeName: 'Valencia Puerto',
    salesCount: 82,
    revenue: 11070,
    avgTicket: 135.00,
    conversionRate: 62.1,
    hoursWorked: 152,
    revenuePerHour: 72.83,
  },
]

// Margin by category data
export const MARGIN_BY_CATEGORY_DATA: MarginByCategoryData[] = [
  {
    category: 'oils',
    categoryLabel: 'Aceites CBD',
    revenue: 55050,
    cost: 22850,
    margin: 32200,
    marginPercent: 58.5,
    products: 5,
  },
  {
    category: 'cosmetics',
    categoryLabel: 'Cosmetica',
    revenue: 23800,
    cost: 10710,
    margin: 13090,
    marginPercent: 55.0,
    products: 4,
  },
  {
    category: 'flowers',
    categoryLabel: 'Flores',
    revenue: 14900,
    cost: 5960,
    margin: 8940,
    marginPercent: 60.0,
    products: 2,
  },
  {
    category: 'capsules',
    categoryLabel: 'Capsulas',
    revenue: 13400,
    cost: 6030,
    margin: 7370,
    marginPercent: 55.0,
    products: 2,
  },
  {
    category: 'creams',
    categoryLabel: 'Cremas',
    revenue: 12400,
    cost: 5580,
    margin: 6820,
    marginPercent: 55.0,
    products: 2,
  },
  {
    category: 'wellness',
    categoryLabel: 'Bienestar',
    revenue: 19100,
    cost: 9550,
    margin: 9550,
    marginPercent: 50.0,
    products: 3,
  },
  {
    category: 'accessories',
    categoryLabel: 'Accesorios',
    revenue: 9000,
    cost: 5130,
    margin: 3870,
    marginPercent: 43.0,
    products: 3,
  },
]

// Revenue breakdown by channel
export const REVENUE_BY_CHANNEL_DATA: RevenueByChannelData[] = [
  { channel: 'Tienda Fisica', revenue: 108920, percentage: 62.5 },
  { channel: 'Online Web', revenue: 45680, percentage: 26.2 },
  { channel: 'Marketplace', revenue: 14250, percentage: 8.2 },
  { channel: 'Mayorista', revenue: 5400, percentage: 3.1 },
]

// Revenue breakdown by payment method
export const REVENUE_BY_PAYMENT_DATA: RevenueByPaymentData[] = [
  { method: 'Tarjeta', revenue: 89450, percentage: 51.3 },
  { method: 'Efectivo', revenue: 41200, percentage: 23.6 },
  { method: 'Bizum', revenue: 26100, percentage: 15.0 },
  { method: 'Transferencia', revenue: 12800, percentage: 7.3 },
  { method: 'PayPal', revenue: 4700, percentage: 2.7 },
]

// Revenue breakdown by category
export const REVENUE_BY_CATEGORY_DATA: RevenueByCategoryData[] = [
  { category: 'oils', categoryLabel: 'Aceites CBD', revenue: 55050, percentage: 31.6 },
  { category: 'cosmetics', categoryLabel: 'Cosmetica', revenue: 23800, percentage: 13.7 },
  { category: 'wellness', categoryLabel: 'Bienestar', revenue: 19100, percentage: 11.0 },
  { category: 'flowers', categoryLabel: 'Flores', revenue: 14900, percentage: 8.6 },
  { category: 'capsules', categoryLabel: 'Capsulas', revenue: 13400, percentage: 7.7 },
  { category: 'creams', categoryLabel: 'Cremas', revenue: 12400, percentage: 7.1 },
  { category: 'accessories', categoryLabel: 'Accesorios', revenue: 9000, percentage: 5.2 },
]

// Trend indicator data (last 7 days summary)
export interface TrendIndicator {
  label: string
  value: number
  formattedValue: string
  change: number
  sparkline: number[]
  unit: string
}

export const TREND_INDICATORS: TrendIndicator[] = [
  {
    label: 'Ingresos Totales',
    value: 174250,
    formattedValue: '174.250',
    change: 11.2,
    sparkline: [22400, 23100, 24800, 23900, 25600, 26200, 28250],
    unit: 'EUR',
  },
  {
    label: 'Pedidos',
    value: 1257,
    formattedValue: '1.257',
    change: 8.5,
    sparkline: [162, 170, 178, 175, 185, 192, 195],
    unit: '',
  },
  {
    label: 'Ticket Medio',
    value: 138.62,
    formattedValue: '138,62',
    change: 2.8,
    sparkline: [134, 136, 139, 137, 138, 140, 142],
    unit: 'EUR',
  },
  {
    label: 'Clientes Nuevos',
    value: 89,
    formattedValue: '89',
    change: 15.6,
    sparkline: [10, 12, 11, 14, 13, 15, 14],
    unit: '',
  },
  {
    label: 'Tasa Conversion',
    value: 67.4,
    formattedValue: '67,4',
    change: 3.2,
    sparkline: [64, 65, 66, 67, 66, 68, 69],
    unit: '%',
  },
  {
    label: 'Margen Bruto',
    value: 55.8,
    formattedValue: '55,8',
    change: 1.4,
    sparkline: [54, 55, 55, 56, 55, 56, 57],
    unit: '%',
  },
]
