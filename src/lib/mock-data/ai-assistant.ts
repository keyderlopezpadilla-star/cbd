// AI Assistant Mock Data

export interface MetricCard {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

export interface ChartDataPoint {
  [key: string]: string | number
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  chartData?: {
    type: 'line' | 'bar' | 'area'
    data: ChartDataPoint[]
    dataKeys: string[]
  }
  metrics?: MetricCard[]
  recommendations?: string[]
}

interface AIResponseConfig {
  keywords: string[]
  response: Omit<AIMessage, 'id' | 'timestamp'>
}

const AI_RESPONSES: AIResponseConfig[] = [
  {
    keywords: ['ventas de hoy', 'ventas hoy', 'sales today'],
    response: {
      role: 'assistant',
      content: 'Aqui tienes el resumen de ventas de hoy. Las ventas muestran un buen rendimiento comparado con la semana anterior.',
      metrics: [
        { label: 'Ventas Totales', value: '12.458 EUR', change: '+12.3%', trend: 'up' },
        { label: 'Transacciones', value: '89', change: '+5.2%', trend: 'up' },
        { label: 'Ticket Medio', value: '139,98 EUR', change: '+6.8%', trend: 'up' },
        { label: 'Conversion', value: '34.2%', change: '-1.1%', trend: 'down' },
      ],
      chartData: {
        type: 'area',
        data: [
          { hora: '09:00', ventas: 890 },
          { hora: '10:00', ventas: 1250 },
          { hora: '11:00', ventas: 1680 },
          { hora: '12:00', ventas: 2100 },
          { hora: '13:00', ventas: 1890 },
          { hora: '14:00', ventas: 1450 },
          { hora: '15:00', ventas: 1720 },
          { hora: '16:00', ventas: 2340 },
          { hora: '17:00', ventas: 2560 },
          { hora: '18:00', ventas: 1980 },
        ],
        dataKeys: ['ventas'],
      },
    },
  },
  {
    keywords: ['productos mas vendidos', 'top productos', 'best sellers', 'mas vendidos'],
    response: {
      role: 'assistant',
      content: 'Los 5 productos mas vendidos esta semana. El Aceite CBD Premium 10% lidera con un margen significativo sobre el resto.',
      metrics: [
        { label: 'Producto Lider', value: 'Aceite CBD 10%', change: '+18.5%', trend: 'up' },
        { label: 'Ingresos Top 5', value: '34.280 EUR', change: '+9.2%', trend: 'up' },
      ],
      chartData: {
        type: 'bar',
        data: [
          { producto: 'Aceite CBD 10%', ingresos: 8920, unidades: 156 },
          { producto: 'Crema Facial CBD', ingresos: 7450, unidades: 132 },
          { producto: 'Flores Premium', ingresos: 6800, unidades: 98 },
          { producto: 'Capsulas Relax', ingresos: 5890, unidades: 210 },
          { producto: 'Balsamo Sport', ingresos: 5220, unidades: 87 },
        ],
        dataKeys: ['ingresos'],
      },
    },
  },
  {
    keywords: ['stock critico', 'stock bajo', 'sin stock', 'stockout', 'inventario bajo'],
    response: {
      role: 'assistant',
      content: 'Hay 7 productos con stock critico que requieren atencion inmediata. Te recomiendo generar ordenes de reposicion para los 3 primeros.',
      metrics: [
        { label: 'Productos Criticos', value: '7', change: '+2', trend: 'down' },
        { label: 'Valor en Riesgo', value: '15.600 EUR', change: 'alto', trend: 'down' },
        { label: 'Dias Promedio Reposicion', value: '4.2', change: '-0.8', trend: 'up' },
        { label: 'Tiendas Afectadas', value: '3', change: '+1', trend: 'down' },
      ],
      recommendations: [
        'Aceite CBD 30% - Madrid Centro: Solo 3 unidades, demanda diaria 2.1 uds. Pedir 50 unidades urgente.',
        'Crema Facial CBD - Valencia Puerto: 5 unidades restantes, demanda alta. Transferir 20 uds desde Barcelona.',
        'Flores Indica Premium - Alicante Marina: Agotado desde ayer. Proveedor con 48h lead time.',
        'Capsulas Relax 30mg - Sevilla Triana: 8 unidades, 3 dias de stock.',
        'Balsamo Deportivo - Barcelona Gotico: 4 unidades, necesita reposicion.',
        'Aceite CBD Mascotas - Madrid Centro: 2 unidades restantes.',
        'Infusion CBD Manzanilla - Valencia Puerto: 6 unidades, tendencia alta.',
      ],
    },
  },
  {
    keywords: ['rendimiento empleados', 'empleados', 'performance', 'equipo'],
    response: {
      role: 'assistant',
      content: 'Analisis de rendimiento del equipo esta semana. Ana Garcia lidera en ventas, mientras que Carlos Ruiz tiene la mejor tasa de conversion.',
      metrics: [
        { label: 'Empleado Top', value: 'Ana Garcia', change: '18.4K EUR', trend: 'up' },
        { label: 'Media Equipo', value: '12.300 EUR', change: '+4.2%', trend: 'up' },
        { label: 'Mejor Conversion', value: 'Carlos Ruiz', change: '42.1%', trend: 'up' },
        { label: 'Objetivo Alcanzado', value: '78%', change: '+5%', trend: 'up' },
      ],
      chartData: {
        type: 'bar',
        data: [
          { nombre: 'Ana G.', ventas: 18400, conversion: 38 },
          { nombre: 'Carlos R.', ventas: 15200, conversion: 42 },
          { nombre: 'Maria L.', ventas: 14800, conversion: 35 },
          { nombre: 'Pedro S.', ventas: 12100, conversion: 31 },
          { nombre: 'Laura M.', ventas: 11600, conversion: 29 },
          { nombre: 'Juan P.', ventas: 9800, conversion: 27 },
        ],
        dataKeys: ['ventas'],
      },
    },
  },
  {
    keywords: ['clientes vip', 'clientes premium', 'mejores clientes', 'vip'],
    response: {
      role: 'assistant',
      content: 'Resumen de clientes VIP. Estos clientes representan el 22% de los ingresos totales con una frecuencia de compra 3x superior al promedio.',
      metrics: [
        { label: 'Clientes VIP', value: '47', change: '+8 este mes', trend: 'up' },
        { label: 'Gasto Medio VIP', value: '385 EUR/mes', change: '+12%', trend: 'up' },
        { label: '% Ingresos VIP', value: '22.4%', change: '+2.1%', trend: 'up' },
        { label: 'Retencion VIP', value: '94.2%', change: '+1.3%', trend: 'up' },
      ],
      chartData: {
        type: 'line',
        data: [
          { mes: 'Jul', clientes: 31, gasto: 11200 },
          { mes: 'Ago', clientes: 33, gasto: 12100 },
          { mes: 'Sep', clientes: 36, gasto: 13400 },
          { mes: 'Oct', clientes: 39, gasto: 14200 },
          { mes: 'Nov', clientes: 43, gasto: 15800 },
          { mes: 'Dic', clientes: 47, gasto: 18100 },
        ],
        dataKeys: ['clientes', 'gasto'],
      },
    },
  },
  {
    keywords: ['comparar tiendas', 'comparacion tiendas', 'tiendas', 'stores'],
    response: {
      role: 'assistant',
      content: 'Comparativa de rendimiento entre tiendas. Madrid Centro lidera en ventas absolutas, pero Barcelona Gotico tiene el mejor crecimiento mensual (+15.2%).',
      metrics: [
        { label: 'Mejor Rendimiento', value: 'Madrid Centro', change: '45.2K EUR', trend: 'up' },
        { label: 'Mayor Crecimiento', value: 'BCN Gotico', change: '+15.2%', trend: 'up' },
        { label: 'Mejor Ticket Medio', value: 'Alicante', change: '168 EUR', trend: 'up' },
        { label: 'Promedio Red', value: '32.100 EUR', change: '+7.8%', trend: 'up' },
      ],
      chartData: {
        type: 'bar',
        data: [
          { tienda: 'Madrid', ventas: 45200, crecimiento: 8.5 },
          { tienda: 'Valencia', ventas: 38400, crecimiento: 11.2 },
          { tienda: 'Barcelona', ventas: 36800, crecimiento: 15.2 },
          { tienda: 'Alicante', ventas: 28600, crecimiento: 9.8 },
          { tienda: 'Sevilla', ventas: 24500, crecimiento: 6.4 },
        ],
        dataKeys: ['ventas'],
      },
    },
  },
  {
    keywords: ['tendencia mensual', 'tendencia', 'trend', 'evolucion'],
    response: {
      role: 'assistant',
      content: 'Tendencia de ventas de los ultimos 30 dias. Se observa un patron de crecimiento constante con picos los fines de semana. La tendencia general es positiva (+8.3% vs mes anterior).',
      metrics: [
        { label: 'Total 30 Dias', value: '156.800 EUR', change: '+8.3%', trend: 'up' },
        { label: 'Media Diaria', value: '5.227 EUR', change: '+6.1%', trend: 'up' },
        { label: 'Mejor Dia', value: 'Sabado 14', change: '8.920 EUR', trend: 'up' },
        { label: 'Peor Dia', value: 'Lunes 2', change: '3.150 EUR', trend: 'neutral' },
      ],
      chartData: {
        type: 'line',
        data: Array.from({ length: 30 }, (_, i) => ({
          dia: `${i + 1}`,
          ventas: Math.round(3500 + Math.random() * 4000 + (i * 50) + (i % 7 >= 5 ? 1500 : 0)),
        })),
        dataKeys: ['ventas'],
      },
    },
  },
  {
    keywords: ['cupones activos', 'cupones', 'descuentos', 'coupons'],
    response: {
      role: 'assistant',
      content: 'Resumen de cupones y descuentos activos. El cupon NAVIDAD2024 tiene el mejor rendimiento con una tasa de uso del 34%.',
      metrics: [
        { label: 'Cupones Activos', value: '8', change: '+2 nuevos', trend: 'up' },
        { label: 'Tasa Uso Media', value: '18.4%', change: '+3.2%', trend: 'up' },
        { label: 'Descuento Total', value: '4.280 EUR', change: 'este mes', trend: 'neutral' },
        { label: 'ROI Cupones', value: '3.2x', change: '+0.4x', trend: 'up' },
      ],
      recommendations: [
        'NAVIDAD2024 (20% dto) - 340 usos de 1000, expira en 15 dias. Rendimiento excelente.',
        'BIENVENIDA10 (10% dto) - 89 usos, sin limite. Buena captacion de nuevos clientes.',
        'CBD2X1 (2x1 en aceites) - 56 usos, expira en 7 dias. Considerar extension.',
        'FIDELIDAD15 (15% dto VIP) - 124 usos, exclusivo VIP. Alta conversion.',
        'FLASH30 (30% dto flash) - Lanzar este viernes 18:00-22:00. Expectativa: 200 usos.',
        'SPORT20 (20% dto linea sport) - 45 usos. Rendimiento moderado.',
        'PRIMERACOMPRA (5 EUR dto) - 210 usos. Mejor canal de adquisicion.',
        'REFERIDO10 (10% dto referidos) - 67 usos. Programa en crecimiento.',
      ],
    },
  },
  {
    keywords: ['prediccion', 'proxima semana', 'forecast', 'prevision'],
    response: {
      role: 'assistant',
      content: 'Prediccion de ventas para la proxima semana basada en datos historicos y tendencias actuales. Ten en cuenta que estas son estimaciones y pueden variar.',
      metrics: [
        { label: 'Prevision Semanal', value: '38.500 EUR', change: '+5.2% vs actual', trend: 'up' },
        { label: 'Dia Pico Esperado', value: 'Sabado', change: '7.200 EUR', trend: 'up' },
        { label: 'Confianza Modelo', value: '82.4%', change: 'Alta', trend: 'neutral' },
        { label: 'Productos Estrella', value: 'Aceite 10%', change: '~45 uds', trend: 'up' },
      ],
      chartData: {
        type: 'area',
        data: [
          { dia: 'Lun', previsto: 4200, minimo: 3600, maximo: 4800 },
          { dia: 'Mar', previsto: 4500, minimo: 3900, maximo: 5100 },
          { dia: 'Mie', previsto: 4800, minimo: 4100, maximo: 5500 },
          { dia: 'Jue', previsto: 5100, minimo: 4400, maximo: 5800 },
          { dia: 'Vie', previsto: 6200, minimo: 5400, maximo: 7000 },
          { dia: 'Sab', previsto: 7200, minimo: 6300, maximo: 8100 },
          { dia: 'Dom', previsto: 6500, minimo: 5700, maximo: 7300 },
        ],
        dataKeys: ['previsto', 'minimo', 'maximo'],
      },
      recommendations: [
        'Asegurar stock de Aceite CBD 10% y Crema Facial: prevision de alta demanda.',
        'Reforzar personal el sabado: se espera el pico de la semana.',
        'Considerar promocion flash el lunes para compensar inicio lento.',
        'Disclaimer: Estas predicciones son estimaciones basadas en patrones historicos. Los resultados reales pueden variar significativamente.',
      ],
    },
  },
  {
    keywords: ['recomendaciones', 'sugerencias', 'que hacer', 'mejoras'],
    response: {
      role: 'assistant',
      content: 'Basandome en el analisis de datos de tu negocio, estas son mis principales recomendaciones para mejorar el rendimiento esta semana:',
      metrics: [
        { label: 'Oportunidad Estimada', value: '+12.500 EUR', change: 'mensual', trend: 'up' },
        { label: 'Acciones Pendientes', value: '6', change: 'prioritarias', trend: 'neutral' },
      ],
      recommendations: [
        'Optimizar stock en Madrid Centro: Transferir 30 uds de Flores Premium desde Barcelona (exceso de inventario).',
        'Lanzar campaña de reactivacion para 23 clientes inactivos >60 dias con cupon personalizado.',
        'Renegociar condiciones con proveedor CannabisTech: volumen actual justifica -8% en precios.',
        'Ampliar horario de Valencia Puerto los sabados: datos muestran demanda no cubierta despues de las 20:00.',
        'Formar a Pedro S. y Juan P. en tecnicas de upselling: su ticket medio esta 25% por debajo de la media.',
        'Introducir bundle "Kit Bienestar" (aceite + capsulas + crema): productos frecuentemente comprados juntos.',
        'Revisar precios de la linea Sport: margen actual 18% vs media del 35%. Posible ajuste sin impacto en volumen.',
        'Implementar programa de fidelidad para mascotas: segmento en crecimiento del 40% trimestral.',
      ],
    },
  },
]

export const SUGGESTED_QUERIES = [
  { text: 'Ventas de hoy', icon: 'ShoppingCart', category: 'Ventas' },
  { text: 'Productos mas vendidos', icon: 'TrendingUp', category: 'Ventas' },
  { text: 'Tendencia mensual', icon: 'LineChart', category: 'Ventas' },
  { text: 'Stock critico', icon: 'AlertTriangle', category: 'Inventario' },
  { text: 'Prediccion proxima semana', icon: 'BrainCircuit', category: 'Inventario' },
  { text: 'Clientes VIP', icon: 'Crown', category: 'Clientes' },
  { text: 'Cupones activos', icon: 'Ticket', category: 'Clientes' },
  { text: 'Rendimiento empleados', icon: 'Users', category: 'Rendimiento' },
  { text: 'Comparar tiendas', icon: 'BarChart3', category: 'Rendimiento' },
  { text: 'Recomendaciones', icon: 'Lightbulb', category: 'Rendimiento' },
]

export const WELCOME_MESSAGE: AIMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hola! Soy tu asistente de negocio con IA. Puedo ayudarte a analizar ventas, inventario, rendimiento del equipo y mas. Preguntame lo que necesites o usa las sugerencias rapidas.',
  timestamp: new Date(),
}

export function getMockAIResponse(query: string): AIMessage {
  const normalizedQuery = query.toLowerCase().trim()

  // Find matching response by keywords
  const matchedConfig = AI_RESPONSES.find((config) =>
    config.keywords.some((keyword) => normalizedQuery.includes(keyword))
  )

  if (matchedConfig) {
    return {
      id: `ai-${Date.now()}`,
      timestamp: new Date(),
      ...matchedConfig.response,
    }
  }

  // Default response when no match found
  return {
    id: `ai-${Date.now()}`,
    role: 'assistant',
    content: 'Entiendo tu consulta, pero no tengo datos especificos para responder a eso en este momento. Prueba a preguntarme sobre ventas, inventario, clientes, rendimiento del equipo o recomendaciones de negocio.',
    timestamp: new Date(),
    recommendations: [
      'Intenta preguntar "Ventas de hoy" para ver el resumen diario.',
      'Pregunta "Stock critico" para ver alertas de inventario.',
      'Consulta "Recomendaciones" para obtener sugerencias de mejora.',
      'Prueba "Comparar tiendas" para ver el rendimiento comparativo.',
    ],
  }
}
