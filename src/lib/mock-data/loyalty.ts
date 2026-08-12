import { LoyaltyTier } from '@/lib/constants'

// Tier Configuration
export interface TierConfig {
  tier: LoyaltyTier
  name: string
  minPoints: number
  maxPoints: number | null
  color: string
  bgColor: string
  borderColor: string
  iconColor: string
  benefits: string[]
  discount: number
  multiplier: number
  memberCount: number
}

export const TIER_CONFIGS: TierConfig[] = [
  {
    tier: LoyaltyTier.STARTER,
    name: 'Starter',
    minPoints: 0,
    maxPoints: 499,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    iconColor: 'text-gray-400',
    benefits: [
      'Acumulacion basica de puntos',
      'Acceso a ofertas generales',
      'Newsletter exclusivo',
    ],
    discount: 0,
    multiplier: 1,
    memberCount: 7,
  },
  {
    tier: LoyaltyTier.PREMIUM,
    name: 'Premium',
    minPoints: 500,
    maxPoints: 1499,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    benefits: [
      '5% descuento en todas las compras',
      'Soporte prioritario',
      'Acceso anticipado a nuevos productos',
      'Puntos x1.5 en eventos especiales',
    ],
    discount: 5,
    multiplier: 1.5,
    memberCount: 6,
  },
  {
    tier: LoyaltyTier.VIP,
    name: 'VIP',
    minPoints: 1500,
    maxPoints: 4999,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    benefits: [
      '10% descuento en todas las compras',
      'Envio gratuito',
      'Eventos exclusivos VIP',
      'Productos de edicion limitada',
      'Puntos x2 en eventos especiales',
      'Regalos de cumpleanos',
    ],
    discount: 10,
    multiplier: 2,
    memberCount: 6,
  },
  {
    tier: LoyaltyTier.BLACK,
    name: 'Black',
    minPoints: 5000,
    maxPoints: null,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    benefits: [
      '15% descuento en todas las compras',
      'Asesor personal dedicado',
      'Envio gratuito express',
      'Acceso early-bird a lanzamientos',
      'Eventos exclusivos Black',
      'Puntos x3 en eventos especiales',
      'Regalos de cumpleanos premium',
      'Invitaciones a eventos privados',
    ],
    discount: 15,
    multiplier: 3,
    memberCount: 4,
  },
]

// Point Transaction Types
export type PointTransactionType = 'earned' | 'redeemed' | 'expired' | 'adjusted'

export interface PointTransaction {
  id: string
  customerId: string
  customerName: string
  type: PointTransactionType
  points: number
  balance: number
  description: string
  orderId?: string
  date: Date
}

const now = new Date()
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

export const MOCK_POINT_TRANSACTIONS: PointTransaction[] = [
  { id: 'pt-001', customerId: 'cust-012', customerName: 'Roberto Castro', type: 'earned', points: 215, balance: 7450, description: 'Compra ORD-2024-0213', orderId: 'ORD-2024-0213', date: daysAgo(1) },
  { id: 'pt-002', customerId: 'cust-002', customerName: 'Carlos Garcia', type: 'earned', points: 209, balance: 5890, description: 'Compra ORD-2024-0210', orderId: 'ORD-2024-0210', date: daysAgo(1) },
  { id: 'pt-003', customerId: 'cust-007', customerName: 'Elena Sanchez', type: 'earned', points: 179, balance: 3200, description: 'Compra ORD-2024-0212', orderId: 'ORD-2024-0212', date: daysAgo(2) },
  { id: 'pt-004', customerId: 'cust-001', customerName: 'Maria Lopez', type: 'earned', points: 91, balance: 2450, description: 'Compra ORD-2024-0201', orderId: 'ORD-2024-0201', date: daysAgo(3) },
  { id: 'pt-005', customerId: 'cust-021', customerName: 'Natalia Jimenez', type: 'earned', points: 80, balance: 1560, description: 'Compra ORD-2024-0211', orderId: 'ORD-2024-0211', date: daysAgo(3) },
  { id: 'pt-006', customerId: 'cust-016', customerName: 'Fernando Ramos', type: 'earned', points: 185, balance: 2100, description: 'Compra ORD-2024-0209', orderId: 'ORD-2024-0209', date: daysAgo(4) },
  { id: 'pt-007', customerId: 'cust-001', customerName: 'Maria Lopez', type: 'redeemed', points: -500, balance: 2359, description: 'Canje: Descuento 5€ en compra', date: daysAgo(5) },
  { id: 'pt-008', customerId: 'cust-010', customerName: 'Miguel Hernandez', type: 'earned', points: 120, balance: 2780, description: 'Compra ORD-2024-0208', orderId: 'ORD-2024-0208', date: daysAgo(5) },
  { id: 'pt-009', customerId: 'cust-019', customerName: 'Laura Serrano', type: 'earned', points: 115, balance: 3450, description: 'Compra ORD-2024-0207', orderId: 'ORD-2024-0207', date: daysAgo(6) },
  { id: 'pt-010', customerId: 'cust-005', customerName: 'Lucia Fernandez', type: 'earned', points: 78, balance: 1890, description: 'Compra ORD-2024-0205', orderId: 'ORD-2024-0205', date: daysAgo(7) },
  { id: 'pt-011', customerId: 'cust-002', customerName: 'Carlos Garcia', type: 'redeemed', points: -1000, balance: 5681, description: 'Canje: Aceite CBD Premium gratis', date: daysAgo(8) },
  { id: 'pt-012', customerId: 'cust-002', customerName: 'Carlos Garcia', type: 'earned', points: 89, balance: 6681, description: 'Compra ORD-2024-0198', orderId: 'ORD-2024-0198', date: daysAgo(8) },
  { id: 'pt-013', customerId: 'cust-012', customerName: 'Roberto Castro', type: 'earned', points: 65, balance: 7235, description: 'Compra ORD-2024-0190', orderId: 'ORD-2024-0190', date: daysAgo(12) },
  { id: 'pt-014', customerId: 'cust-004', customerName: 'Pablo Ruiz', type: 'expired', points: -100, balance: 456, description: 'Puntos expirados (inactividad 90+ dias)', date: daysAgo(15) },
  { id: 'pt-015', customerId: 'cust-007', customerName: 'Elena Sanchez', type: 'adjusted', points: 200, balance: 3021, description: 'Bonificacion: Evento doble puntos Navidad', date: daysAgo(18) },
  { id: 'pt-016', customerId: 'cust-005', customerName: 'Lucia Fernandez', type: 'redeemed', points: -300, balance: 1812, description: 'Canje: Envio gratuito en pedido', date: daysAgo(20) },
  { id: 'pt-017', customerId: 'cust-019', customerName: 'Laura Serrano', type: 'adjusted', points: 500, balance: 3335, description: 'Bonificacion: Aniversario como cliente', date: daysAgo(22) },
  { id: 'pt-018', customerId: 'cust-009', customerName: 'Sofia Diaz', type: 'expired', points: -50, balance: 145, description: 'Puntos expirados (inactividad 90+ dias)', date: daysAgo(25) },
  { id: 'pt-019', customerId: 'cust-010', customerName: 'Miguel Hernandez', type: 'redeemed', points: -750, balance: 2660, description: 'Canje: Pack Bienestar con descuento', date: daysAgo(28) },
  { id: 'pt-020', customerId: 'cust-012', customerName: 'Roberto Castro', type: 'adjusted', points: 1000, balance: 7170, description: 'Bonificacion: Cliente del mes', date: daysAgo(30) },
]

// Redemption Catalog
export type RedemptionCategory = 'discount' | 'product' | 'experience' | 'shipping'

export interface RedemptionItem {
  id: string
  name: string
  description: string
  category: RedemptionCategory
  pointsCost: number
  availability: 'available' | 'limited' | 'out_of_stock'
  stock?: number
  imageUrl?: string
  minTier: LoyaltyTier
}

export const MOCK_REDEMPTION_CATALOG: RedemptionItem[] = [
  { id: 'red-001', name: 'Descuento 5€', description: '5€ de descuento en tu proxima compra', category: 'discount', pointsCost: 500, availability: 'available', minTier: LoyaltyTier.STARTER },
  { id: 'red-002', name: 'Descuento 10€', description: '10€ de descuento en compras superiores a 50€', category: 'discount', pointsCost: 900, availability: 'available', minTier: LoyaltyTier.STARTER },
  { id: 'red-003', name: 'Descuento 25€', description: '25€ de descuento en compras superiores a 100€', category: 'discount', pointsCost: 2000, availability: 'available', minTier: LoyaltyTier.PREMIUM },
  { id: 'red-004', name: 'Descuento 50€', description: '50€ de descuento en compras superiores a 200€', category: 'discount', pointsCost: 4000, availability: 'limited', stock: 10, minTier: LoyaltyTier.VIP },
  { id: 'red-005', name: 'Envio Gratuito', description: 'Envio gratis en tu siguiente pedido online', category: 'shipping', pointsCost: 300, availability: 'available', minTier: LoyaltyTier.STARTER },
  { id: 'red-006', name: 'Envio Express Gratis', description: 'Envio express gratuito (24h) en tu siguiente pedido', category: 'shipping', pointsCost: 600, availability: 'available', minTier: LoyaltyTier.PREMIUM },
  { id: 'red-007', name: 'Aceite CBD Premium 10% Gratis', description: 'Un bote de Aceite CBD Premium 10% (30ml)', category: 'product', pointsCost: 4500, availability: 'limited', stock: 5, minTier: LoyaltyTier.VIP },
  { id: 'red-008', name: 'Pack Infusiones CBD', description: 'Pack de 5 infusiones CBD variadas', category: 'product', pointsCost: 1200, availability: 'available', minTier: LoyaltyTier.STARTER },
  { id: 'red-009', name: 'Crema Facial CBD Mini', description: 'Muestra exclusiva de crema facial CBD (15ml)', category: 'product', pointsCost: 800, availability: 'available', minTier: LoyaltyTier.STARTER },
  { id: 'red-010', name: 'Pack Bienestar Completo', description: 'Pack con aceite, crema y capsulas CBD', category: 'product', pointsCost: 8000, availability: 'limited', stock: 3, minTier: LoyaltyTier.BLACK },
  { id: 'red-011', name: 'Taller CBD & Bienestar', description: 'Entrada para taller exclusivo sobre CBD y salud', category: 'experience', pointsCost: 2500, availability: 'limited', stock: 15, minTier: LoyaltyTier.PREMIUM },
  { id: 'red-012', name: 'Visita a Laboratorio', description: 'Visita guiada al laboratorio de produccion CBD', category: 'experience', pointsCost: 5000, availability: 'limited', stock: 8, minTier: LoyaltyTier.VIP },
  { id: 'red-013', name: 'Cena Exclusiva CBD', description: 'Cena gourmet maridaje CBD para 2 personas', category: 'experience', pointsCost: 10000, availability: 'limited', stock: 4, minTier: LoyaltyTier.BLACK },
  { id: 'red-014', name: 'Spa Day CBD', description: 'Dia completo de spa con tratamientos CBD', category: 'experience', pointsCost: 7500, availability: 'out_of_stock', stock: 0, minTier: LoyaltyTier.VIP },
]

// Loyalty Member Stats
export interface LoyaltyMemberStats {
  totalMembers: number
  activeMembers: number
  totalPointsIssued: number
  totalPointsRedeemed: number
  redemptionRate: number
  avgPointsPerMember: number
  tierUpgradesThisMonth: number
  pointsIssuedToday: number
}

export const MOCK_LOYALTY_STATS: LoyaltyMemberStats = {
  totalMembers: 22,
  activeMembers: 16,
  totalPointsIssued: 45890,
  totalPointsRedeemed: 12350,
  redemptionRate: 26.9,
  avgPointsPerMember: 2086,
  tierUpgradesThisMonth: 3,
  pointsIssuedToday: 424,
}

// Loyalty Configuration
export interface LoyaltyConfig {
  pointsPerEuro: number
  pointsRedemptionValue: number
  expiryDays: number
  enableAutoUpgrade: boolean
  enableAutoDowngrade: boolean
  downgradeInactivityDays: number
  bonusEvents: BonusEvent[]
}

export interface BonusEvent {
  id: string
  name: string
  multiplier: number
  startDate: Date
  endDate: Date
  isActive: boolean
}

export const MOCK_LOYALTY_CONFIG: LoyaltyConfig = {
  pointsPerEuro: 1,
  pointsRedemptionValue: 0.01,
  expiryDays: 365,
  enableAutoUpgrade: true,
  enableAutoDowngrade: false,
  downgradeInactivityDays: 180,
  bonusEvents: [
    { id: 'evt-001', name: 'Black Friday x3', multiplier: 3, startDate: new Date('2024-11-29'), endDate: new Date('2024-12-02'), isActive: false },
    { id: 'evt-002', name: 'Navidad x2', multiplier: 2, startDate: new Date('2024-12-15'), endDate: new Date('2024-12-31'), isActive: false },
    { id: 'evt-003', name: 'Aniversario CBD x2', multiplier: 2, startDate: new Date('2025-03-01'), endDate: new Date('2025-03-07'), isActive: true },
    { id: 'evt-004', name: 'Verano Puntos Extra', multiplier: 1.5, startDate: new Date('2025-06-01'), endDate: new Date('2025-08-31'), isActive: false },
  ],
}

// Tier distribution for chart
export interface TierDistribution {
  tier: string
  count: number
  color: string
}

export const MOCK_TIER_DISTRIBUTION: TierDistribution[] = [
  { tier: 'Starter', count: 7, color: '#9CA3AF' },
  { tier: 'Premium', count: 6, color: '#60A5FA' },
  { tier: 'VIP', count: 6, color: '#A78BFA' },
  { tier: 'Black', count: 4, color: '#FBBF24' },
]

// Helper functions
export function getTierConfig(tier: LoyaltyTier): TierConfig {
  return TIER_CONFIGS.find((t) => t.tier === tier) || TIER_CONFIGS[0]
}

export function getNextTier(currentTier: LoyaltyTier): TierConfig | null {
  const index = TIER_CONFIGS.findIndex((t) => t.tier === currentTier)
  if (index < TIER_CONFIGS.length - 1) {
    return TIER_CONFIGS[index + 1]
  }
  return null
}

export function calculateProgressToNextTier(points: number, currentTier: LoyaltyTier): number {
  const current = getTierConfig(currentTier)
  const next = getNextTier(currentTier)
  if (!next) return 100
  const range = next.minPoints - current.minPoints
  const progress = points - current.minPoints
  return Math.min(Math.round((progress / range) * 100), 100)
}

export function getPointsToNextTier(points: number, currentTier: LoyaltyTier): number {
  const next = getNextTier(currentTier)
  if (!next) return 0
  return Math.max(next.minPoints - points, 0)
}
