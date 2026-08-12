import { LoyaltyTier } from '@/lib/constants'
import { CustomerSegment } from '@/lib/mock-data/customers'

// Campaign Types & Status
export type CampaignType = 'EMAIL' | 'SMS' | 'PUSH' | 'SOCIAL'
export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED'
export type CouponType = 'PERCENTAGE' | 'FIXED' | 'FREE_SHIPPING' | 'BUY_X_GET_Y'
export type DiscountRuleType = 'BUY_X_GET_Y' | 'VOLUME' | 'BUNDLE' | 'FLASH_SALE'

export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  targetAudience: CustomerSegment[]
  channels: CampaignType[]
  startDate: Date
  endDate: Date
  budget: number
  spent: number
  metrics: CampaignMetrics
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface CampaignMetrics {
  reach: number
  impressions: number
  openRate: number
  clickRate: number
  conversions: number
  revenue: number
  roi: number
}

export interface Coupon {
  id: string
  code: string
  type: CouponType
  value: number
  minPurchase: number
  maxUses: number
  currentUses: number
  expiryDate: Date
  isActive: boolean
  description: string
  applicableProducts: string[]
  createdAt: Date
}

export interface DiscountRule {
  id: string
  name: string
  type: DiscountRuleType
  isActive: boolean
  conditions: DiscountCondition
  discount: DiscountValue
  startDate: Date
  endDate: Date
  priority: number
  description: string
}

export interface DiscountCondition {
  minQuantity?: number
  minAmount?: number
  products?: string[]
  categories?: string[]
  buyQuantity?: number
  getQuantity?: number
}

export interface DiscountValue {
  type: 'PERCENTAGE' | 'FIXED' | 'FREE_ITEM'
  amount: number
  maxDiscount?: number
}

export interface CalendarEvent {
  id: string
  title: string
  type: 'campaign' | 'coupon' | 'flash_sale' | 'event'
  date: Date
  endDate?: Date
  color: string
  relatedId: string
}

export interface AudienceCondition {
  id: string
  field: string
  operator: string
  value: string | number
}

export interface AudienceGroup {
  id: string
  logic: 'AND' | 'OR'
  conditions: AudienceCondition[]
}

const now = new Date()
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Black Friday CBD',
    type: 'EMAIL',
    status: 'COMPLETED',
    targetAudience: ['VIP', 'HIGH_VALUE', 'RECURRING'],
    channels: ['EMAIL', 'SMS', 'PUSH'],
    startDate: daysAgo(45),
    endDate: daysAgo(42),
    budget: 2500,
    spent: 2340,
    metrics: { reach: 4520, impressions: 12800, openRate: 42.5, clickRate: 18.3, conversions: 234, revenue: 18750, roi: 701 },
    description: 'Campana de Black Friday con descuentos exclusivos en aceites premium',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(42),
  },
  {
    id: 'camp-002',
    name: 'Bienvenida Nuevos Clientes',
    type: 'EMAIL',
    status: 'ACTIVE',
    targetAudience: ['NEW'],
    channels: ['EMAIL'],
    startDate: daysAgo(30),
    endDate: daysFromNow(60),
    budget: 800,
    spent: 245,
    metrics: { reach: 890, impressions: 2100, openRate: 55.2, clickRate: 22.1, conversions: 67, revenue: 3450, roi: 1308 },
    description: 'Email de bienvenida automatico con cupon del 15% para primera compra',
    createdAt: daysAgo(35),
    updatedAt: daysAgo(1),
  },
  {
    id: 'camp-003',
    name: 'Reactivacion Clientes Inactivos',
    type: 'SMS',
    status: 'ACTIVE',
    targetAudience: ['INACTIVE'],
    channels: ['SMS', 'EMAIL'],
    startDate: daysAgo(14),
    endDate: daysFromNow(16),
    budget: 1200,
    spent: 560,
    metrics: { reach: 1250, impressions: 1250, openRate: 78.4, clickRate: 12.8, conversions: 45, revenue: 2890, roi: 416 },
    description: 'Campana SMS para reactivar clientes sin compras en 90+ dias',
    createdAt: daysAgo(20),
    updatedAt: daysAgo(2),
  },
  {
    id: 'camp-004',
    name: 'Lanzamiento Aceite Premium 30%',
    type: 'PUSH',
    status: 'DRAFT',
    targetAudience: ['VIP', 'HIGH_VALUE'],
    channels: ['PUSH', 'EMAIL', 'SOCIAL'],
    startDate: daysFromNow(7),
    endDate: daysFromNow(21),
    budget: 3000,
    spent: 0,
    metrics: { reach: 0, impressions: 0, openRate: 0, clickRate: 0, conversions: 0, revenue: 0, roi: 0 },
    description: 'Lanzamiento del nuevo aceite CBD Full Spectrum 30% con early access para VIPs',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
  },
  {
    id: 'camp-005',
    name: 'Navidad CBD Wellness',
    type: 'SOCIAL',
    status: 'DRAFT',
    targetAudience: ['VIP', 'RECURRING', 'HIGH_VALUE'],
    channels: ['SOCIAL', 'EMAIL', 'PUSH'],
    startDate: daysFromNow(14),
    endDate: daysFromNow(35),
    budget: 5000,
    spent: 0,
    metrics: { reach: 0, impressions: 0, openRate: 0, clickRate: 0, conversions: 0, revenue: 0, roi: 0 },
    description: 'Campana navidena con packs regalo y descuentos especiales',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
  },
  {
    id: 'camp-006',
    name: 'Flash Sale Cosmetica',
    type: 'PUSH',
    status: 'PAUSED',
    targetAudience: ['RECURRING', 'VIP'],
    channels: ['PUSH', 'SMS'],
    startDate: daysAgo(7),
    endDate: daysFromNow(3),
    budget: 600,
    spent: 320,
    metrics: { reach: 2100, impressions: 4500, openRate: 65.3, clickRate: 28.7, conversions: 89, revenue: 4230, roi: 1221 },
    description: 'Venta flash 48h en toda la linea de cosmetica CBD',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(2),
  },
  {
    id: 'camp-007',
    name: 'Programa Referidos VIP',
    type: 'EMAIL',
    status: 'ACTIVE',
    targetAudience: ['VIP', 'HIGH_VALUE'],
    channels: ['EMAIL'],
    startDate: daysAgo(60),
    endDate: daysFromNow(30),
    budget: 1500,
    spent: 890,
    metrics: { reach: 680, impressions: 1800, openRate: 48.9, clickRate: 15.6, conversions: 32, revenue: 5670, roi: 537 },
    description: 'Programa de referidos exclusivo para clientes VIP con bonus doble',
    createdAt: daysAgo(65),
    updatedAt: daysAgo(3),
  },
  {
    id: 'camp-008',
    name: 'Encuesta Satisfaccion Q4',
    type: 'EMAIL',
    status: 'COMPLETED',
    targetAudience: ['RECURRING', 'VIP', 'HIGH_VALUE'],
    channels: ['EMAIL'],
    startDate: daysAgo(30),
    endDate: daysAgo(15),
    budget: 200,
    spent: 180,
    metrics: { reach: 3200, impressions: 3200, openRate: 38.2, clickRate: 25.4, conversions: 412, revenue: 0, roi: -100 },
    description: 'Encuesta de satisfaccion trimestral con sorteo entre participantes',
    createdAt: daysAgo(35),
    updatedAt: daysAgo(15),
  },
  {
    id: 'camp-009',
    name: 'Dia de la Madre CBD',
    type: 'SOCIAL',
    status: 'COMPLETED',
    targetAudience: ['RECURRING', 'NEW', 'HIGH_VALUE'],
    channels: ['SOCIAL', 'EMAIL', 'PUSH'],
    startDate: daysAgo(90),
    endDate: daysAgo(85),
    budget: 4000,
    spent: 3800,
    metrics: { reach: 8900, impressions: 25000, openRate: 35.8, clickRate: 14.2, conversions: 456, revenue: 28900, roi: 661 },
    description: 'Campana especial Dia de la Madre con packs regalo personalizados',
    createdAt: daysAgo(100),
    updatedAt: daysAgo(85),
  },
  {
    id: 'camp-010',
    name: 'Newsletter Semanal',
    type: 'EMAIL',
    status: 'ACTIVE',
    targetAudience: ['RECURRING', 'VIP', 'HIGH_VALUE', 'NEW'],
    channels: ['EMAIL'],
    startDate: daysAgo(180),
    endDate: daysFromNow(180),
    budget: 1200,
    spent: 600,
    metrics: { reach: 5400, impressions: 14000, openRate: 32.1, clickRate: 8.9, conversions: 156, revenue: 12300, roi: 1950 },
    description: 'Newsletter semanal con novedades, consejos de uso y ofertas exclusivas',
    createdAt: daysAgo(185),
    updatedAt: daysAgo(1),
  },
]

export const MOCK_COUPONS: Coupon[] = [
  { id: 'coup-001', code: 'WELCOME15', type: 'PERCENTAGE', value: 15, minPurchase: 30, maxUses: 1000, currentUses: 342, expiryDate: daysFromNow(90), isActive: true, description: 'Descuento 15% primera compra', applicableProducts: [], createdAt: daysAgo(90) },
  { id: 'coup-002', code: 'VIP25', type: 'PERCENTAGE', value: 25, minPurchase: 50, maxUses: 500, currentUses: 89, expiryDate: daysFromNow(30), isActive: true, description: 'Exclusivo VIP 25% descuento', applicableProducts: [], createdAt: daysAgo(30) },
  { id: 'coup-003', code: 'ENVIOGRATIS', type: 'FREE_SHIPPING', value: 0, minPurchase: 40, maxUses: 2000, currentUses: 567, expiryDate: daysFromNow(60), isActive: true, description: 'Envio gratuito +40 EUR', applicableProducts: [], createdAt: daysAgo(60) },
  { id: 'coup-004', code: 'FLASH10', type: 'FIXED', value: 10, minPurchase: 60, maxUses: 200, currentUses: 200, expiryDate: daysAgo(5), isActive: false, description: '10 EUR dto flash sale', applicableProducts: [], createdAt: daysAgo(15) },
  { id: 'coup-005', code: 'XMAS20', type: 'PERCENTAGE', value: 20, minPurchase: 45, maxUses: 800, currentUses: 0, expiryDate: daysFromNow(45), isActive: false, description: 'Navidad 20% en todo', applicableProducts: [], createdAt: daysAgo(2) },
  { id: 'coup-006', code: 'ACEITE2X1', type: 'BUY_X_GET_Y', value: 100, minPurchase: 0, maxUses: 150, currentUses: 43, expiryDate: daysFromNow(14), isActive: true, description: '2x1 en aceites CBD seleccionados', applicableProducts: ['prod-001', 'prod-002'], createdAt: daysAgo(7) },
  { id: 'coup-007', code: 'BIRTHDAY30', type: 'PERCENTAGE', value: 30, minPurchase: 0, maxUses: 5000, currentUses: 128, expiryDate: daysFromNow(365), isActive: true, description: '30% dto por cumpleanos', applicableProducts: [], createdAt: daysAgo(180) },
  { id: 'coup-008', code: 'REFER20', type: 'PERCENTAGE', value: 20, minPurchase: 25, maxUses: 1000, currentUses: 67, expiryDate: daysFromNow(120), isActive: true, description: '20% por referido', applicableProducts: [], createdAt: daysAgo(60) },
  { id: 'coup-009', code: 'COSMETICA15', type: 'PERCENTAGE', value: 15, minPurchase: 35, maxUses: 300, currentUses: 156, expiryDate: daysAgo(2), isActive: false, description: '15% en linea cosmetica', applicableProducts: ['prod-005', 'prod-015'], createdAt: daysAgo(20) },
  { id: 'coup-010', code: 'PACK50', type: 'FIXED', value: 50, minPurchase: 200, maxUses: 100, currentUses: 12, expiryDate: daysFromNow(30), isActive: true, description: '50 EUR dto en packs premium', applicableProducts: ['prod-012'], createdAt: daysAgo(10) },
  { id: 'coup-011', code: 'FREESHIPVIP', type: 'FREE_SHIPPING', value: 0, minPurchase: 0, maxUses: 10000, currentUses: 890, expiryDate: daysFromNow(365), isActive: true, description: 'Envio gratis permanente VIP', applicableProducts: [], createdAt: daysAgo(365) },
  { id: 'coup-012', code: 'SUMMER25', type: 'PERCENTAGE', value: 25, minPurchase: 50, maxUses: 500, currentUses: 500, expiryDate: daysAgo(60), isActive: false, description: 'Verano 25% descuento', applicableProducts: [], createdAt: daysAgo(120) },
]

export const MOCK_DISCOUNT_RULES: DiscountRule[] = [
  {
    id: 'disc-001', name: 'Compra 3 Aceites, 10% Extra', type: 'VOLUME',
    isActive: true,
    conditions: { minQuantity: 3, categories: ['oils'] },
    discount: { type: 'PERCENTAGE', amount: 10, maxDiscount: 30 },
    startDate: daysAgo(30), endDate: daysFromNow(60), priority: 1,
    description: 'Descuento por volumen al comprar 3 o mas aceites CBD',
  },
  {
    id: 'disc-002', name: '2x1 Infusiones CBD', type: 'BUY_X_GET_Y',
    isActive: true,
    conditions: { buyQuantity: 2, getQuantity: 1, products: ['prod-008'] },
    discount: { type: 'FREE_ITEM', amount: 100 },
    startDate: daysAgo(14), endDate: daysFromNow(14), priority: 2,
    description: 'Compra 2 infusiones y llevate la 3ra gratis',
  },
  {
    id: 'disc-003', name: 'Bundle Bienestar Completo', type: 'BUNDLE',
    isActive: true,
    conditions: { products: ['prod-001', 'prod-005', 'prod-010'], minQuantity: 3 },
    discount: { type: 'PERCENTAGE', amount: 20, maxDiscount: 50 },
    startDate: daysAgo(7), endDate: daysFromNow(30), priority: 3,
    description: 'Pack aceite + crema + capsulas con 20% dto',
  },
  {
    id: 'disc-004', name: 'Flash Friday', type: 'FLASH_SALE',
    isActive: false,
    conditions: { minAmount: 0 },
    discount: { type: 'PERCENTAGE', amount: 30, maxDiscount: 100 },
    startDate: daysFromNow(5), endDate: daysFromNow(6), priority: 10,
    description: 'Descuento del 30% durante 24 horas cada viernes',
  },
  {
    id: 'disc-005', name: 'Descuento Cosmetica 5+', type: 'VOLUME',
    isActive: true,
    conditions: { minQuantity: 5, categories: ['cosmetics', 'creams'] },
    discount: { type: 'PERCENTAGE', amount: 15, maxDiscount: 45 },
    startDate: daysAgo(20), endDate: daysFromNow(40), priority: 4,
    description: '15% al comprar 5 o mas productos cosmeticos',
  },
  {
    id: 'disc-006', name: 'Compra 100 EUR, 15 EUR gratis', type: 'VOLUME',
    isActive: true,
    conditions: { minAmount: 100 },
    discount: { type: 'FIXED', amount: 15 },
    startDate: daysAgo(60), endDate: daysFromNow(90), priority: 5,
    description: '15 EUR de descuento en compras superiores a 100 EUR',
  },
]

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'evt-001', title: 'Bienvenida Nuevos Clientes', type: 'campaign', date: daysAgo(30), endDate: daysFromNow(60), color: '#00FF66', relatedId: 'camp-002' },
  { id: 'evt-002', title: 'Reactivacion Inactivos', type: 'campaign', date: daysAgo(14), endDate: daysFromNow(16), color: '#3B82F6', relatedId: 'camp-003' },
  { id: 'evt-003', title: 'Lanzamiento Aceite 30%', type: 'campaign', date: daysFromNow(7), endDate: daysFromNow(21), color: '#8B5CF6', relatedId: 'camp-004' },
  { id: 'evt-004', title: 'Navidad CBD Wellness', type: 'campaign', date: daysFromNow(14), endDate: daysFromNow(35), color: '#EF4444', relatedId: 'camp-005' },
  { id: 'evt-005', title: 'Flash Friday', type: 'flash_sale', date: daysFromNow(5), endDate: daysFromNow(6), color: '#F59E0B', relatedId: 'disc-004' },
  { id: 'evt-006', title: 'Expira ACEITE2X1', type: 'coupon', date: daysFromNow(14), color: '#EC4899', relatedId: 'coup-006' },
  { id: 'evt-007', title: 'Newsletter Semanal', type: 'campaign', date: daysFromNow(2), color: '#00FF66', relatedId: 'camp-010' },
  { id: 'evt-008', title: 'Fin 2x1 Infusiones', type: 'flash_sale', date: daysFromNow(14), color: '#F59E0B', relatedId: 'disc-002' },
  { id: 'evt-009', title: 'Programa Referidos VIP', type: 'campaign', date: daysAgo(60), endDate: daysFromNow(30), color: '#10B981', relatedId: 'camp-007' },
  { id: 'evt-010', title: 'Expira VIP25', type: 'coupon', date: daysFromNow(30), color: '#EC4899', relatedId: 'coup-002' },
]

// ROI chart data for campaign detail
export interface CampaignROIData {
  day: string
  revenue: number
  spend: number
  conversions: number
}

export function getCampaignROIData(campaignId: string): CampaignROIData[] {
  // Generate 14 days of data for active/completed campaigns
  return Array.from({ length: 14 }, (_, i) => ({
    day: `Dia ${i + 1}`,
    revenue: Math.floor(Math.random() * 2000) + 500,
    spend: Math.floor(Math.random() * 200) + 50,
    conversions: Math.floor(Math.random() * 30) + 5,
  }))
}

export function getCampaignById(id: string): Campaign | undefined {
  return MOCK_CAMPAIGNS.find((c) => c.id === id)
}

export function getActiveCampaigns(): Campaign[] {
  return MOCK_CAMPAIGNS.filter((c) => c.status === 'ACTIVE')
}

export function getCouponByCode(code: string): Coupon | undefined {
  return MOCK_COUPONS.find((c) => c.code === code)
}

export function getActiveDiscountRules(): DiscountRule[] {
  return MOCK_DISCOUNT_RULES.filter((r) => r.isActive)
}

export function getCampaignStatusColor(status: CampaignStatus): string {
  const colors: Record<CampaignStatus, string> = {
    DRAFT: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
    PAUSED: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    COMPLETED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }
  return colors[status]
}

export function getCampaignStatusLabel(status: CampaignStatus): string {
  const labels: Record<CampaignStatus, string> = {
    DRAFT: 'Borrador',
    ACTIVE: 'Activa',
    PAUSED: 'Pausada',
    COMPLETED: 'Completada',
  }
  return labels[status]
}

export function getCampaignTypeLabel(type: CampaignType): string {
  const labels: Record<CampaignType, string> = {
    EMAIL: 'Email',
    SMS: 'SMS',
    PUSH: 'Push',
    SOCIAL: 'Redes Sociales',
  }
  return labels[type]
}

export function getCouponTypeLabel(type: CouponType): string {
  const labels: Record<CouponType, string> = {
    PERCENTAGE: 'Porcentaje',
    FIXED: 'Importe Fijo',
    FREE_SHIPPING: 'Envio Gratis',
    BUY_X_GET_Y: 'Compra X Lleva Y',
  }
  return labels[type]
}
