// AI Predictions Mock Data

export interface StockoutRisk {
  productId: string
  productName: string
  currentStock: number
  dailyAvgSales: number
  daysUntilStockout: number
  riskLevel: 'high' | 'medium' | 'low'
  store: string
  recommendedAction: string
}

export interface DemandForecast {
  date: string
  actual: number | null
  predicted: number
  lower: number
  upper: number
}

export interface ProductVelocity {
  productId: string
  productName: string
  category: string
  velocity: 'fast' | 'normal' | 'slow'
  avgDailySales: number
  trend: 'up' | 'down' | 'stable'
  revenueImpact: number
  daysOfStock: number
}

export interface ReorderRecommendation {
  productId: string
  productName: string
  currentStock: number
  predictedDemand30d: number
  suggestedQuantity: number
  optimalOrderDate: string
  supplier: string
  estimatedCost: number
  priority: 'urgent' | 'normal' | 'low'
}

export interface SeasonalTrend {
  month: string
  historicalDemand: number
  predictedDemand: number
  events: string[]
}

export interface PredictionAccuracy {
  overall: number
  mae: number
  mape: number
  rSquared: number
  lastUpdated: string
}

// Stockout Risk Data - 15+ records
export const STOCKOUT_RISKS: StockoutRisk[] = [
  {
    productId: 'PRD-001',
    productName: 'Aceite CBD Premium 30%',
    currentStock: 3,
    dailyAvgSales: 2.1,
    daysUntilStockout: 1,
    riskLevel: 'high',
    store: 'Madrid Centro',
    recommendedAction: 'Pedido urgente: 50 unidades. Lead time proveedor: 48h.',
  },
  {
    productId: 'PRD-002',
    productName: 'Crema Facial CBD Anti-edad',
    currentStock: 5,
    dailyAvgSales: 1.8,
    daysUntilStockout: 3,
    riskLevel: 'high',
    store: 'Valencia Puerto',
    recommendedAction: 'Transferir 20 uds desde Barcelona (exceso stock). Pedir 30 al proveedor.',
  },
  {
    productId: 'PRD-003',
    productName: 'Flores Indica Premium',
    currentStock: 0,
    dailyAvgSales: 3.2,
    daysUntilStockout: 0,
    riskLevel: 'high',
    store: 'Alicante Marina',
    recommendedAction: 'AGOTADO. Pedido urgente ya realizado. Llegada estimada: manana.',
  },
  {
    productId: 'PRD-004',
    productName: 'Capsulas Relax 30mg',
    currentStock: 8,
    dailyAvgSales: 2.5,
    daysUntilStockout: 3,
    riskLevel: 'high',
    store: 'Sevilla Triana',
    recommendedAction: 'Pedir 60 unidades. Demanda creciente por temporada invernal.',
  },
  {
    productId: 'PRD-005',
    productName: 'Balsamo Deportivo CBD',
    currentStock: 4,
    dailyAvgSales: 1.3,
    daysUntilStockout: 3,
    riskLevel: 'high',
    store: 'Barcelona Gotico',
    recommendedAction: 'Pedir 40 unidades. Promocion deportiva activa incrementa demanda.',
  },
  {
    productId: 'PRD-006',
    productName: 'Aceite CBD Mascotas',
    currentStock: 2,
    dailyAvgSales: 0.8,
    daysUntilStockout: 2,
    riskLevel: 'high',
    store: 'Madrid Centro',
    recommendedAction: 'Pedir 25 unidades. Segmento mascotas en crecimiento rapido.',
  },
  {
    productId: 'PRD-007',
    productName: 'Infusion CBD Manzanilla',
    currentStock: 12,
    dailyAvgSales: 1.5,
    daysUntilStockout: 8,
    riskLevel: 'medium',
    store: 'Valencia Puerto',
    recommendedAction: 'Programar pedido para la proxima semana. Stock suficiente por ahora.',
  },
  {
    productId: 'PRD-008',
    productName: 'Serum CBD Noche',
    currentStock: 15,
    dailyAvgSales: 1.2,
    daysUntilStockout: 12,
    riskLevel: 'medium',
    store: 'Barcelona Gotico',
    recommendedAction: 'Monitorizar. Revisar pedido en 5 dias.',
  },
  {
    productId: 'PRD-009',
    productName: 'Gomitas CBD 25mg',
    currentStock: 18,
    dailyAvgSales: 2.0,
    daysUntilStockout: 9,
    riskLevel: 'medium',
    store: 'Madrid Centro',
    recommendedAction: 'Pedir 45 unidades antes del viernes.',
  },
  {
    productId: 'PRD-010',
    productName: 'Vaporizador CBD Starter Kit',
    currentStock: 10,
    dailyAvgSales: 0.9,
    daysUntilStockout: 11,
    riskLevel: 'medium',
    store: 'Alicante Marina',
    recommendedAction: 'Stock moderado. Programar reposicion normal.',
  },
  {
    productId: 'PRD-011',
    productName: 'Aceite CBD 5% Basico',
    currentStock: 22,
    dailyAvgSales: 1.6,
    daysUntilStockout: 14,
    riskLevel: 'medium',
    store: 'Sevilla Triana',
    recommendedAction: 'Niveles aceptables. Siguiente pedido en 7 dias.',
  },
  {
    productId: 'PRD-012',
    productName: 'Pack Bienestar Completo',
    currentStock: 35,
    dailyAvgSales: 1.0,
    daysUntilStockout: 35,
    riskLevel: 'low',
    store: 'Madrid Centro',
    recommendedAction: 'Stock saludable. Sin accion necesaria.',
  },
  {
    productId: 'PRD-013',
    productName: 'Crema Corporal CBD 200ml',
    currentStock: 28,
    dailyAvgSales: 0.7,
    daysUntilStockout: 40,
    riskLevel: 'low',
    store: 'Valencia Puerto',
    recommendedAction: 'Exceso de stock. Considerar promocion para rotar.',
  },
  {
    productId: 'PRD-014',
    productName: 'Aceite CBD 10% Standard',
    currentStock: 45,
    dailyAvgSales: 2.8,
    daysUntilStockout: 16,
    riskLevel: 'low',
    store: 'Barcelona Gotico',
    recommendedAction: 'Buen nivel. Reposicion programada automaticamente.',
  },
  {
    productId: 'PRD-015',
    productName: 'Jabon CBD Artesanal',
    currentStock: 52,
    dailyAvgSales: 1.1,
    daysUntilStockout: 47,
    riskLevel: 'low',
    store: 'Alicante Marina',
    recommendedAction: 'Stock elevado. Posible sobrestock, revisar frecuencia de pedido.',
  },
  {
    productId: 'PRD-016',
    productName: 'Champu CBD Fortalecedor',
    currentStock: 40,
    dailyAvgSales: 0.9,
    daysUntilStockout: 44,
    riskLevel: 'low',
    store: 'Sevilla Triana',
    recommendedAction: 'Sin accion requerida.',
  },
]

// Demand Forecast Data - 30 days for multiple products
function generateForecastData(baseValue: number, variance: number): DemandForecast[] {
  const data: DemandForecast[] = []
  const today = new Date()

  for (let i = -15; i < 15; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    const dayStr = date.toISOString().split('T')[0]

    const seasonalFactor = 1 + 0.2 * Math.sin((i + 15) * Math.PI / 15)
    const predicted = Math.round(baseValue * seasonalFactor + (Math.random() - 0.5) * variance * 0.3)
    const actual = i <= 0 ? Math.round(predicted + (Math.random() - 0.5) * variance) : null
    const lower = Math.round(predicted - variance * 0.4)
    const upper = Math.round(predicted + variance * 0.4)

    data.push({ date: dayStr, actual, predicted, lower, upper })
  }

  return data
}

export const DEMAND_FORECASTS: Record<string, { productName: string; data: DemandForecast[] }> = {
  'PRD-001': {
    productName: 'Aceite CBD Premium 30%',
    data: generateForecastData(12, 5),
  },
  'PRD-002': {
    productName: 'Crema Facial CBD Anti-edad',
    data: generateForecastData(9, 4),
  },
  'PRD-003': {
    productName: 'Flores Indica Premium',
    data: generateForecastData(15, 6),
  },
  'PRD-009': {
    productName: 'Gomitas CBD 25mg',
    data: generateForecastData(11, 4),
  },
}

// Product Velocity Data - 20+ records
export const PRODUCT_VELOCITY: ProductVelocity[] = [
  {
    productId: 'PRD-003',
    productName: 'Flores Indica Premium',
    category: 'Flores',
    velocity: 'fast',
    avgDailySales: 3.2,
    trend: 'up',
    revenueImpact: 2880,
    daysOfStock: 0,
  },
  {
    productId: 'PRD-001',
    productName: 'Aceite CBD Premium 30%',
    category: 'Aceites',
    velocity: 'fast',
    avgDailySales: 2.8,
    trend: 'up',
    revenueImpact: 3920,
    daysOfStock: 16,
  },
  {
    productId: 'PRD-004',
    productName: 'Capsulas Relax 30mg',
    category: 'Capsulas',
    velocity: 'fast',
    avgDailySales: 2.5,
    trend: 'up',
    revenueImpact: 1875,
    daysOfStock: 3,
  },
  {
    productId: 'PRD-009',
    productName: 'Gomitas CBD 25mg',
    category: 'Comestibles',
    velocity: 'fast',
    avgDailySales: 2.0,
    trend: 'stable',
    revenueImpact: 1400,
    daysOfStock: 9,
  },
  {
    productId: 'PRD-002',
    productName: 'Crema Facial CBD Anti-edad',
    category: 'Cosmeticos',
    velocity: 'fast',
    avgDailySales: 1.8,
    trend: 'up',
    revenueImpact: 2340,
    daysOfStock: 3,
  },
  {
    productId: 'PRD-014',
    productName: 'Aceite CBD 10% Standard',
    category: 'Aceites',
    velocity: 'fast',
    avgDailySales: 2.8,
    trend: 'stable',
    revenueImpact: 2520,
    daysOfStock: 16,
  },
  {
    productId: 'PRD-011',
    productName: 'Aceite CBD 5% Basico',
    category: 'Aceites',
    velocity: 'normal',
    avgDailySales: 1.6,
    trend: 'stable',
    revenueImpact: 960,
    daysOfStock: 14,
  },
  {
    productId: 'PRD-007',
    productName: 'Infusion CBD Manzanilla',
    category: 'Infusiones',
    velocity: 'normal',
    avgDailySales: 1.5,
    trend: 'up',
    revenueImpact: 675,
    daysOfStock: 8,
  },
  {
    productId: 'PRD-005',
    productName: 'Balsamo Deportivo CBD',
    category: 'Topicos',
    velocity: 'normal',
    avgDailySales: 1.3,
    trend: 'up',
    revenueImpact: 1170,
    daysOfStock: 3,
  },
  {
    productId: 'PRD-008',
    productName: 'Serum CBD Noche',
    category: 'Cosmeticos',
    velocity: 'normal',
    avgDailySales: 1.2,
    trend: 'stable',
    revenueImpact: 1440,
    daysOfStock: 12,
  },
  {
    productId: 'PRD-015',
    productName: 'Jabon CBD Artesanal',
    category: 'Cosmeticos',
    velocity: 'normal',
    avgDailySales: 1.1,
    trend: 'down',
    revenueImpact: 495,
    daysOfStock: 47,
  },
  {
    productId: 'PRD-012',
    productName: 'Pack Bienestar Completo',
    category: 'Packs',
    velocity: 'normal',
    avgDailySales: 1.0,
    trend: 'stable',
    revenueImpact: 2500,
    daysOfStock: 35,
  },
  {
    productId: 'PRD-010',
    productName: 'Vaporizador CBD Starter Kit',
    category: 'Accesorios',
    velocity: 'normal',
    avgDailySales: 0.9,
    trend: 'down',
    revenueImpact: 1260,
    daysOfStock: 11,
  },
  {
    productId: 'PRD-016',
    productName: 'Champu CBD Fortalecedor',
    category: 'Cosmeticos',
    velocity: 'slow',
    avgDailySales: 0.9,
    trend: 'down',
    revenueImpact: 630,
    daysOfStock: 44,
  },
  {
    productId: 'PRD-006',
    productName: 'Aceite CBD Mascotas',
    category: 'Mascotas',
    velocity: 'slow',
    avgDailySales: 0.8,
    trend: 'up',
    revenueImpact: 560,
    daysOfStock: 2,
  },
  {
    productId: 'PRD-013',
    productName: 'Crema Corporal CBD 200ml',
    category: 'Cosmeticos',
    velocity: 'slow',
    avgDailySales: 0.7,
    trend: 'down',
    revenueImpact: 490,
    daysOfStock: 40,
  },
  {
    productId: 'PRD-017',
    productName: 'Parches CBD Transdermicos',
    category: 'Topicos',
    velocity: 'slow',
    avgDailySales: 0.5,
    trend: 'stable',
    revenueImpact: 375,
    daysOfStock: 60,
  },
  {
    productId: 'PRD-018',
    productName: 'Spray Bucal CBD Menta',
    category: 'Sublingual',
    velocity: 'slow',
    avgDailySales: 0.4,
    trend: 'down',
    revenueImpact: 240,
    daysOfStock: 75,
  },
  {
    productId: 'PRD-019',
    productName: 'Incienso CBD Lavanda',
    category: 'Aromaterapia',
    velocity: 'slow',
    avgDailySales: 0.3,
    trend: 'down',
    revenueImpact: 135,
    daysOfStock: 100,
  },
  {
    productId: 'PRD-020',
    productName: 'Collar CBD Mascotas',
    category: 'Mascotas',
    velocity: 'slow',
    avgDailySales: 0.2,
    trend: 'stable',
    revenueImpact: 90,
    daysOfStock: 150,
  },
  {
    productId: 'PRD-021',
    productName: 'Kit Cultivo CBD Indoor',
    category: 'Accesorios',
    velocity: 'slow',
    avgDailySales: 0.15,
    trend: 'down',
    revenueImpact: 225,
    daysOfStock: 200,
  },
]

// Reorder Recommendations - 12+ records
export const REORDER_RECOMMENDATIONS: ReorderRecommendation[] = [
  {
    productId: 'PRD-003',
    productName: 'Flores Indica Premium',
    currentStock: 0,
    predictedDemand30d: 96,
    suggestedQuantity: 120,
    optimalOrderDate: 'Hoy',
    supplier: 'GreenLeaf Farms',
    estimatedCost: 4800,
    priority: 'urgent',
  },
  {
    productId: 'PRD-001',
    productName: 'Aceite CBD Premium 30%',
    currentStock: 3,
    predictedDemand30d: 63,
    suggestedQuantity: 80,
    optimalOrderDate: 'Hoy',
    supplier: 'CBD Extracts Pro',
    estimatedCost: 5600,
    priority: 'urgent',
  },
  {
    productId: 'PRD-004',
    productName: 'Capsulas Relax 30mg',
    currentStock: 8,
    predictedDemand30d: 75,
    suggestedQuantity: 90,
    optimalOrderDate: 'Hoy',
    supplier: 'NaturaCaps',
    estimatedCost: 2700,
    priority: 'urgent',
  },
  {
    productId: 'PRD-002',
    productName: 'Crema Facial CBD Anti-edad',
    currentStock: 5,
    predictedDemand30d: 54,
    suggestedQuantity: 70,
    optimalOrderDate: 'Manana',
    supplier: 'CBD Cosmetics Lab',
    estimatedCost: 3150,
    priority: 'urgent',
  },
  {
    productId: 'PRD-005',
    productName: 'Balsamo Deportivo CBD',
    currentStock: 4,
    predictedDemand30d: 39,
    suggestedQuantity: 50,
    optimalOrderDate: 'Manana',
    supplier: 'SportCBD Solutions',
    estimatedCost: 1750,
    priority: 'urgent',
  },
  {
    productId: 'PRD-006',
    productName: 'Aceite CBD Mascotas',
    currentStock: 2,
    predictedDemand30d: 24,
    suggestedQuantity: 35,
    optimalOrderDate: '2 dias',
    supplier: 'PetWellness CBD',
    estimatedCost: 1050,
    priority: 'normal',
  },
  {
    productId: 'PRD-009',
    productName: 'Gomitas CBD 25mg',
    currentStock: 18,
    predictedDemand30d: 60,
    suggestedQuantity: 60,
    optimalOrderDate: '3 dias',
    supplier: 'NaturaCaps',
    estimatedCost: 1800,
    priority: 'normal',
  },
  {
    productId: 'PRD-007',
    productName: 'Infusion CBD Manzanilla',
    currentStock: 12,
    predictedDemand30d: 45,
    suggestedQuantity: 50,
    optimalOrderDate: '4 dias',
    supplier: 'HerbalCBD Tea Co.',
    estimatedCost: 750,
    priority: 'normal',
  },
  {
    productId: 'PRD-010',
    productName: 'Vaporizador CBD Starter Kit',
    currentStock: 10,
    predictedDemand30d: 27,
    suggestedQuantity: 30,
    optimalOrderDate: '5 dias',
    supplier: 'VapeTech Industries',
    estimatedCost: 2100,
    priority: 'normal',
  },
  {
    productId: 'PRD-008',
    productName: 'Serum CBD Noche',
    currentStock: 15,
    predictedDemand30d: 36,
    suggestedQuantity: 35,
    optimalOrderDate: '6 dias',
    supplier: 'CBD Cosmetics Lab',
    estimatedCost: 2450,
    priority: 'normal',
  },
  {
    productId: 'PRD-011',
    productName: 'Aceite CBD 5% Basico',
    currentStock: 22,
    predictedDemand30d: 48,
    suggestedQuantity: 40,
    optimalOrderDate: '7 dias',
    supplier: 'CBD Extracts Pro',
    estimatedCost: 1200,
    priority: 'low',
  },
  {
    productId: 'PRD-012',
    productName: 'Pack Bienestar Completo',
    currentStock: 35,
    predictedDemand30d: 30,
    suggestedQuantity: 20,
    optimalOrderDate: '15 dias',
    supplier: 'CBD Extracts Pro',
    estimatedCost: 2000,
    priority: 'low',
  },
  {
    productId: 'PRD-015',
    productName: 'Jabon CBD Artesanal',
    currentStock: 52,
    predictedDemand30d: 33,
    suggestedQuantity: 0,
    optimalOrderDate: 'No recomendado',
    supplier: 'Artisan CBD Soaps',
    estimatedCost: 0,
    priority: 'low',
  },
]

// Seasonal Trends - 12 months
export const SEASONAL_TRENDS: SeasonalTrend[] = [
  { month: 'Enero', historicalDemand: 28500, predictedDemand: 30200, events: ['Rebajas invierno'] },
  { month: 'Febrero', historicalDemand: 26800, predictedDemand: 28100, events: ['San Valentin'] },
  { month: 'Marzo', historicalDemand: 30200, predictedDemand: 32500, events: ['Dia del Padre', 'Primavera'] },
  { month: 'Abril', historicalDemand: 32100, predictedDemand: 34800, events: ['Semana Santa'] },
  { month: 'Mayo', historicalDemand: 34500, predictedDemand: 37200, events: ['Dia de la Madre'] },
  { month: 'Junio', historicalDemand: 36800, predictedDemand: 39500, events: ['Inicio verano'] },
  { month: 'Julio', historicalDemand: 38200, predictedDemand: 41000, events: ['Turismo alto'] },
  { month: 'Agosto', historicalDemand: 35600, predictedDemand: 37800, events: ['Vacaciones'] },
  { month: 'Septiembre', historicalDemand: 33400, predictedDemand: 35900, events: ['Vuelta al cole'] },
  { month: 'Octubre', historicalDemand: 31200, predictedDemand: 33800, events: ['Halloween'] },
  { month: 'Noviembre', historicalDemand: 42500, predictedDemand: 46200, events: ['Black Friday', 'Singles Day'] },
  { month: 'Diciembre', historicalDemand: 48900, predictedDemand: 52500, events: ['Navidad', 'Fin de ano'] },
]

// Prediction Accuracy Metrics
export const PREDICTION_ACCURACY: PredictionAccuracy = {
  overall: 87.3,
  mae: 2.4,
  mape: 12.7,
  rSquared: 0.89,
  lastUpdated: '2024-01-15T08:30:00Z',
}
