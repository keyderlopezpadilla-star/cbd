import { Customer } from '@/types'
import { LoyaltyTier } from '@/lib/constants'

export type CustomerSegment = 'NEW' | 'RECURRING' | 'VIP' | 'INACTIVE' | 'HIGH_VALUE'

export interface PurchaseRecord {
  id: string
  customerId: string
  orderId: string
  date: Date
  items: { productId: string; productName: string; quantity: number; price: number }[]
  total: number
  storeId: string
  paymentMethod: string
  isReturn: boolean
}

export interface GDPRConsent {
  customerId: string
  marketingEmail: boolean
  marketingSMS: boolean
  thirdPartySharing: boolean
  analytics: boolean
  updatedAt: Date
  ipAddress: string
}

export interface GDPRAuditEntry {
  id: string
  customerId: string
  action: string
  details: string
  performedBy: string
  date: Date
}

const now = new Date()
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001', email: 'maria.lopez@email.com', name: 'Maria Lopez',
    phone: '+34 612 345 678', birthDate: new Date('1988-03-15'),
    preferredStoreId: '1', totalPurchases: 28, totalSpent: 2450.80,
    averageTicket: 87.53, lastPurchase: daysAgo(3), loyaltyPoints: 2450,
    loyaltyTier: LoyaltyTier.VIP, marketingConsent: true,
    createdAt: new Date('2023-02-10'), updatedAt: daysAgo(3),
  },
  {
    id: 'cust-002', email: 'carlos.garcia@email.com', name: 'Carlos Garcia',
    phone: '+34 623 456 789', birthDate: new Date('1975-07-22'),
    preferredStoreId: '3', totalPurchases: 45, totalSpent: 5890.50,
    averageTicket: 130.90, lastPurchase: daysAgo(1), loyaltyPoints: 5890,
    loyaltyTier: LoyaltyTier.BLACK, marketingConsent: true,
    createdAt: new Date('2022-11-05'), updatedAt: daysAgo(1),
  },
  {
    id: 'cust-003', email: 'ana.martinez@email.com', name: 'Ana Martinez',
    phone: '+34 634 567 890', birthDate: new Date('1992-11-08'),
    preferredStoreId: '2', totalPurchases: 2, totalSpent: 89.90,
    averageTicket: 44.95, lastPurchase: daysAgo(5), loyaltyPoints: 89,
    loyaltyTier: LoyaltyTier.STARTER, marketingConsent: true,
    createdAt: daysAgo(20), updatedAt: daysAgo(5),
  },
  {
    id: 'cust-004', email: 'pablo.ruiz@email.com', name: 'Pablo Ruiz',
    phone: '+34 645 678 901', birthDate: new Date('1985-01-30'),
    preferredStoreId: '1', totalPurchases: 8, totalSpent: 456.30,
    averageTicket: 57.04, lastPurchase: daysAgo(120), loyaltyPoints: 456,
    loyaltyTier: LoyaltyTier.PREMIUM, marketingConsent: false,
    createdAt: new Date('2023-05-20'), updatedAt: daysAgo(120),
  },
  {
    id: 'cust-005', email: 'lucia.fernandez@email.com', name: 'Lucia Fernandez',
    phone: '+34 656 789 012', birthDate: new Date('1990-06-14'),
    preferredStoreId: '3', totalPurchases: 15, totalSpent: 1890.00,
    averageTicket: 126.00, lastPurchase: daysAgo(7), loyaltyPoints: 1890,
    loyaltyTier: LoyaltyTier.VIP, marketingConsent: true,
    createdAt: new Date('2023-04-12'), updatedAt: daysAgo(7),
  },
  {
    id: 'cust-006', email: 'javier.moreno@email.com', name: 'Javier Moreno',
    phone: '+34 667 890 123', birthDate: new Date('1998-09-25'),
    preferredStoreId: '4', totalPurchases: 1, totalSpent: 34.90,
    averageTicket: 34.90, lastPurchase: daysAgo(10), loyaltyPoints: 34,
    loyaltyTier: LoyaltyTier.STARTER, marketingConsent: true,
    createdAt: daysAgo(15), updatedAt: daysAgo(10),
  },
  {
    id: 'cust-007', email: 'elena.sanchez@email.com', name: 'Elena Sanchez',
    phone: '+34 678 901 234', birthDate: new Date('1982-12-03'),
    preferredStoreId: '2', totalPurchases: 32, totalSpent: 3200.45,
    averageTicket: 100.01, lastPurchase: daysAgo(2), loyaltyPoints: 3200,
    loyaltyTier: LoyaltyTier.BLACK, marketingConsent: true,
    createdAt: new Date('2022-08-15'), updatedAt: daysAgo(2),
  },
  {
    id: 'cust-008', email: 'daniel.torres@email.com', name: 'Daniel Torres',
    phone: '+34 689 012 345', birthDate: new Date('1995-04-18'),
    preferredStoreId: '1', totalPurchases: 6, totalSpent: 780.60,
    averageTicket: 130.10, lastPurchase: daysAgo(14), loyaltyPoints: 780,
    loyaltyTier: LoyaltyTier.PREMIUM, marketingConsent: true,
    createdAt: new Date('2023-09-01'), updatedAt: daysAgo(14),
  },
  {
    id: 'cust-009', email: 'sofia.diaz@email.com', name: 'Sofia Diaz',
    phone: '+34 690 123 456', birthDate: new Date('1987-08-07'),
    preferredStoreId: '5', totalPurchases: 3, totalSpent: 145.70,
    averageTicket: 48.57, lastPurchase: daysAgo(95), loyaltyPoints: 145,
    loyaltyTier: LoyaltyTier.STARTER, marketingConsent: false,
    createdAt: new Date('2023-06-10'), updatedAt: daysAgo(95),
  },
  {
    id: 'cust-010', email: 'miguel.hernandez@email.com', name: 'Miguel Hernandez',
    phone: '+34 601 234 567', birthDate: new Date('1979-02-28'),
    preferredStoreId: '3', totalPurchases: 22, totalSpent: 2780.90,
    averageTicket: 126.40, lastPurchase: daysAgo(5), loyaltyPoints: 2780,
    loyaltyTier: LoyaltyTier.VIP, marketingConsent: true,
    createdAt: new Date('2023-01-20'), updatedAt: daysAgo(5),
  },
  {
    id: 'cust-011', email: 'carmen.navarro@email.com', name: 'Carmen Navarro',
    phone: '+34 612 345 098', birthDate: new Date('1993-10-12'),
    preferredStoreId: '4', totalPurchases: 4, totalSpent: 234.50,
    averageTicket: 58.63, lastPurchase: daysAgo(25), loyaltyPoints: 234,
    loyaltyTier: LoyaltyTier.PREMIUM, marketingConsent: true,
    createdAt: new Date('2023-08-05'), updatedAt: daysAgo(25),
  },
  {
    id: 'cust-012', email: 'roberto.castro@email.com', name: 'Roberto Castro',
    phone: '+34 623 456 109', birthDate: new Date('1970-05-19'),
    preferredStoreId: '1', totalPurchases: 52, totalSpent: 7450.20,
    averageTicket: 143.27, lastPurchase: daysAgo(1), loyaltyPoints: 7450,
    loyaltyTier: LoyaltyTier.BLACK, marketingConsent: true,
    createdAt: new Date('2022-06-01'), updatedAt: daysAgo(1),
  },
  {
    id: 'cust-013', email: 'patricia.vega@email.com', name: 'Patricia Vega',
    phone: null, birthDate: new Date('1996-01-25'),
    preferredStoreId: '2', totalPurchases: 1, totalSpent: 59.90,
    averageTicket: 59.90, lastPurchase: daysAgo(8), loyaltyPoints: 59,
    loyaltyTier: LoyaltyTier.STARTER, marketingConsent: false,
    createdAt: daysAgo(12), updatedAt: daysAgo(8),
  },
  {
    id: 'cust-014', email: 'alejandro.blanco@email.com', name: 'Alejandro Blanco',
    phone: '+34 645 678 210', birthDate: new Date('1983-07-04'),
    preferredStoreId: '3', totalPurchases: 11, totalSpent: 1340.80,
    averageTicket: 121.89, lastPurchase: daysAgo(30), loyaltyPoints: 1340,
    loyaltyTier: LoyaltyTier.VIP, marketingConsent: true,
    createdAt: new Date('2023-03-18'), updatedAt: daysAgo(30),
  },
  {
    id: 'cust-015', email: 'isabel.ortega@email.com', name: 'Isabel Ortega',
    phone: '+34 656 789 321', birthDate: new Date('1991-11-30'),
    preferredStoreId: '4', totalPurchases: 7, totalSpent: 567.40,
    averageTicket: 81.06, lastPurchase: daysAgo(100), loyaltyPoints: 567,
    loyaltyTier: LoyaltyTier.PREMIUM, marketingConsent: true,
    createdAt: new Date('2023-04-25'), updatedAt: daysAgo(100),
  },
  {
    id: 'cust-016', email: 'fernando.ramos@email.com', name: 'Fernando Ramos',
    phone: '+34 667 890 432', birthDate: null,
    preferredStoreId: '1', totalPurchases: 18, totalSpent: 2100.30,
    averageTicket: 116.68, lastPurchase: daysAgo(4), loyaltyPoints: 2100,
    loyaltyTier: LoyaltyTier.VIP, marketingConsent: true,
    createdAt: new Date('2023-02-28'), updatedAt: daysAgo(4),
  },
  {
    id: 'cust-017', email: 'marta.gil@email.com', name: 'Marta Gil',
    phone: '+34 678 901 543', birthDate: new Date('1989-03-09'),
    preferredStoreId: '5', totalPurchases: 5, totalSpent: 345.60,
    averageTicket: 69.12, lastPurchase: daysAgo(92), loyaltyPoints: 345,
    loyaltyTier: LoyaltyTier.PREMIUM, marketingConsent: false,
    createdAt: new Date('2023-07-12'), updatedAt: daysAgo(92),
  },
  {
    id: 'cust-018', email: 'david.flores@email.com', name: 'David Flores',
    phone: '+34 689 012 654', birthDate: new Date('1994-08-21'),
    preferredStoreId: '2', totalPurchases: 0, totalSpent: 0,
    averageTicket: 0, lastPurchase: null, loyaltyPoints: 0,
    loyaltyTier: LoyaltyTier.STARTER, marketingConsent: true,
    createdAt: daysAgo(5), updatedAt: daysAgo(5),
  },
  {
    id: 'cust-019', email: 'laura.serrano@email.com', name: 'Laura Serrano',
    phone: '+34 690 123 765', birthDate: new Date('1986-12-16'),
    preferredStoreId: '3', totalPurchases: 25, totalSpent: 3450.90,
    averageTicket: 138.04, lastPurchase: daysAgo(6), loyaltyPoints: 3450,
    loyaltyTier: LoyaltyTier.BLACK, marketingConsent: true,
    createdAt: new Date('2022-10-10'), updatedAt: daysAgo(6),
  },
  {
    id: 'cust-020', email: 'raul.molina@email.com', name: 'Raul Molina',
    phone: '+34 601 234 876', birthDate: new Date('1977-04-02'),
    preferredStoreId: '1', totalPurchases: 9, totalSpent: 890.50,
    averageTicket: 98.94, lastPurchase: daysAgo(45), loyaltyPoints: 890,
    loyaltyTier: LoyaltyTier.PREMIUM, marketingConsent: true,
    createdAt: new Date('2023-06-30'), updatedAt: daysAgo(45),
  },
  {
    id: 'cust-021', email: 'natalia.jimenez@email.com', name: 'Natalia Jimenez',
    phone: '+34 612 345 987', birthDate: new Date('1999-06-28'),
    preferredStoreId: '4', totalPurchases: 12, totalSpent: 1560.70,
    averageTicket: 130.06, lastPurchase: daysAgo(3), loyaltyPoints: 1560,
    loyaltyTier: LoyaltyTier.VIP, marketingConsent: true,
    createdAt: new Date('2023-05-14'), updatedAt: daysAgo(3),
  },
  {
    id: 'cust-022', email: 'pedro.dominguez@email.com', name: 'Pedro Dominguez',
    phone: '+34 623 456 098', birthDate: new Date('1981-09-11'),
    preferredStoreId: '2', totalPurchases: 2, totalSpent: 178.80,
    averageTicket: 89.40, lastPurchase: daysAgo(18), loyaltyPoints: 178,
    loyaltyTier: LoyaltyTier.STARTER, marketingConsent: true,
    createdAt: daysAgo(25), updatedAt: daysAgo(18),
  },
]

export const MOCK_PURCHASE_HISTORY: PurchaseRecord[] = [
  { id: 'pur-001', customerId: 'cust-001', orderId: 'ORD-2024-0201', date: daysAgo(3), items: [{ productId: 'prod-001', productName: 'Aceite CBD Premium 10%', quantity: 2, price: 45.90 }], total: 91.80, storeId: '1', paymentMethod: 'card', isReturn: false },
  { id: 'pur-002', customerId: 'cust-001', orderId: 'ORD-2024-0185', date: daysAgo(15), items: [{ productId: 'prod-005', productName: 'Crema Facial CBD', quantity: 1, price: 38.90 }, { productId: 'prod-008', productName: 'Infusion CBD Relax', quantity: 3, price: 12.90 }], total: 77.60, storeId: '1', paymentMethod: 'card', isReturn: false },
  { id: 'pur-003', customerId: 'cust-002', orderId: 'ORD-2024-0210', date: daysAgo(1), items: [{ productId: 'prod-003', productName: 'Aceite CBD Full Spectrum 20%', quantity: 1, price: 89.90 }, { productId: 'prod-012', productName: 'Pack Bienestar CBD', quantity: 1, price: 120.00 }], total: 209.90, storeId: '3', paymentMethod: 'card', isReturn: false },
  { id: 'pur-004', customerId: 'cust-002', orderId: 'ORD-2024-0198', date: daysAgo(8), items: [{ productId: 'prod-002', productName: 'Aceite CBD Premium 5%', quantity: 3, price: 29.90 }], total: 89.70, storeId: '3', paymentMethod: 'cash', isReturn: false },
  { id: 'pur-005', customerId: 'cust-003', orderId: 'ORD-2024-0195', date: daysAgo(5), items: [{ productId: 'prod-008', productName: 'Infusion CBD Relax', quantity: 2, price: 12.90 }], total: 25.80, storeId: '2', paymentMethod: 'card', isReturn: false },
  { id: 'pur-006', customerId: 'cust-005', orderId: 'ORD-2024-0205', date: daysAgo(7), items: [{ productId: 'prod-001', productName: 'Aceite CBD Premium 10%', quantity: 1, price: 45.90 }, { productId: 'prod-006', productName: 'Balsamo CBD Sport', quantity: 1, price: 32.50 }], total: 78.40, storeId: '3', paymentMethod: 'card', isReturn: false },
  { id: 'pur-007', customerId: 'cust-007', orderId: 'ORD-2024-0212', date: daysAgo(2), items: [{ productId: 'prod-003', productName: 'Aceite CBD Full Spectrum 20%', quantity: 2, price: 89.90 }], total: 179.80, storeId: '2', paymentMethod: 'card', isReturn: false },
  { id: 'pur-008', customerId: 'cust-007', orderId: 'ORD-2024-0180', date: daysAgo(20), items: [{ productId: 'prod-010', productName: 'Capsulas CBD 25mg', quantity: 2, price: 34.90 }], total: 69.80, storeId: '2', paymentMethod: 'cash', isReturn: false },
  { id: 'pur-009', customerId: 'cust-010', orderId: 'ORD-2024-0208', date: daysAgo(5), items: [{ productId: 'prod-012', productName: 'Pack Bienestar CBD', quantity: 1, price: 120.00 }], total: 120.00, storeId: '3', paymentMethod: 'card', isReturn: false },
  { id: 'pur-010', customerId: 'cust-012', orderId: 'ORD-2024-0213', date: daysAgo(1), items: [{ productId: 'prod-001', productName: 'Aceite CBD Premium 10%', quantity: 3, price: 45.90 }, { productId: 'prod-005', productName: 'Crema Facial CBD', quantity: 2, price: 38.90 }], total: 215.50, storeId: '1', paymentMethod: 'card', isReturn: false },
  { id: 'pur-011', customerId: 'cust-012', orderId: 'ORD-2024-0190', date: daysAgo(12), items: [{ productId: 'prod-015', productName: 'Serum CBD Anti-Edad', quantity: 1, price: 65.90 }], total: 65.90, storeId: '1', paymentMethod: 'card', isReturn: false },
  { id: 'pur-012', customerId: 'cust-019', orderId: 'ORD-2024-0207', date: daysAgo(6), items: [{ productId: 'prod-003', productName: 'Aceite CBD Full Spectrum 20%', quantity: 1, price: 89.90 }, { productId: 'prod-008', productName: 'Infusion CBD Relax', quantity: 2, price: 12.90 }], total: 115.70, storeId: '3', paymentMethod: 'card', isReturn: false },
  { id: 'pur-013', customerId: 'cust-001', orderId: 'ORD-2024-0175', date: daysAgo(28), items: [{ productId: 'prod-006', productName: 'Balsamo CBD Sport', quantity: 1, price: 32.50 }], total: 32.50, storeId: '1', paymentMethod: 'cash', isReturn: true },
  { id: 'pur-014', customerId: 'cust-021', orderId: 'ORD-2024-0211', date: daysAgo(3), items: [{ productId: 'prod-001', productName: 'Aceite CBD Premium 10%', quantity: 1, price: 45.90 }, { productId: 'prod-010', productName: 'Capsulas CBD 25mg', quantity: 1, price: 34.90 }], total: 80.80, storeId: '4', paymentMethod: 'card', isReturn: false },
  { id: 'pur-015', customerId: 'cust-016', orderId: 'ORD-2024-0209', date: daysAgo(4), items: [{ productId: 'prod-012', productName: 'Pack Bienestar CBD', quantity: 1, price: 120.00 }, { productId: 'prod-015', productName: 'Serum CBD Anti-Edad', quantity: 1, price: 65.90 }], total: 185.90, storeId: '1', paymentMethod: 'card', isReturn: false },
]

export const MOCK_GDPR_CONSENTS: GDPRConsent[] = MOCK_CUSTOMERS.map((c) => ({
  customerId: c.id,
  marketingEmail: c.marketingConsent,
  marketingSMS: c.marketingConsent && Math.random() > 0.3,
  thirdPartySharing: false,
  analytics: true,
  updatedAt: c.updatedAt,
  ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
}))

export const MOCK_GDPR_AUDIT: GDPRAuditEntry[] = [
  { id: 'gdpr-001', customerId: 'cust-004', action: 'CONSENT_REVOKED', details: 'Marketing consent revoked by customer', performedBy: 'cust-004', date: daysAgo(120) },
  { id: 'gdpr-002', customerId: 'cust-009', action: 'CONSENT_REVOKED', details: 'Marketing consent revoked by customer', performedBy: 'cust-009', date: daysAgo(95) },
  { id: 'gdpr-003', customerId: 'cust-013', action: 'DATA_EXPORT', details: 'Customer requested data export', performedBy: 'admin', date: daysAgo(10) },
  { id: 'gdpr-004', customerId: 'cust-001', action: 'CONSENT_UPDATED', details: 'Marketing email consent granted', performedBy: 'cust-001', date: daysAgo(30) },
  { id: 'gdpr-005', customerId: 'cust-017', action: 'CONSENT_REVOKED', details: 'All marketing consents revoked', performedBy: 'cust-017', date: daysAgo(92) },
  { id: 'gdpr-006', customerId: 'cust-012', action: 'DATA_ACCESS', details: 'Admin accessed customer data for support', performedBy: 'admin', date: daysAgo(5) },
  { id: 'gdpr-007', customerId: 'cust-007', action: 'CONSENT_UPDATED', details: 'SMS consent updated', performedBy: 'cust-007', date: daysAgo(15) },
]

export function getCustomerSegment(customer: Customer): CustomerSegment {
  const daysSinceCreation = (now.getTime() - customer.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  const daysSinceLastPurchase = customer.lastPurchase
    ? (now.getTime() - customer.lastPurchase.getTime()) / (1000 * 60 * 60 * 24)
    : Infinity

  if (customer.totalSpent > 1000 || customer.loyaltyTier === LoyaltyTier.VIP || customer.loyaltyTier === LoyaltyTier.BLACK) {
    return 'VIP'
  }
  if (customer.averageTicket > 100) {
    return 'HIGH_VALUE'
  }
  if (daysSinceLastPurchase > 90) {
    return 'INACTIVE'
  }
  if (daysSinceCreation < 30 && customer.totalPurchases < 2) {
    return 'NEW'
  }
  if (customer.totalPurchases >= 3) {
    return 'RECURRING'
  }
  return 'NEW'
}

export function getSegmentLabel(segment: CustomerSegment): string {
  const labels: Record<CustomerSegment, string> = {
    NEW: 'Nuevo',
    RECURRING: 'Recurrente',
    VIP: 'VIP',
    INACTIVE: 'Inactivo',
    HIGH_VALUE: 'Alto Valor',
  }
  return labels[segment]
}

export function getSegmentColor(segment: CustomerSegment): string {
  const colors: Record<CustomerSegment, string> = {
    NEW: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    RECURRING: 'bg-green-500/20 text-green-400 border-green-500/30',
    VIP: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    INACTIVE: 'bg-red-500/20 text-red-400 border-red-500/30',
    HIGH_VALUE: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  }
  return colors[segment]
}

export function getCustomerById(id: string): Customer | undefined {
  return MOCK_CUSTOMERS.find((c) => c.id === id)
}

export function getCustomerPurchases(customerId: string): PurchaseRecord[] {
  return MOCK_PURCHASE_HISTORY.filter((p) => p.customerId === customerId)
}

export function getCustomerGDPRConsent(customerId: string): GDPRConsent | undefined {
  return MOCK_GDPR_CONSENTS.find((c) => c.customerId === customerId)
}

export function getCustomerGDPRAudit(customerId: string): GDPRAuditEntry[] {
  return MOCK_GDPR_AUDIT.filter((a) => a.customerId === customerId)
}

export function getSegmentDistribution(): Record<CustomerSegment, number> {
  const distribution: Record<CustomerSegment, number> = { NEW: 0, RECURRING: 0, VIP: 0, INACTIVE: 0, HIGH_VALUE: 0 }
  MOCK_CUSTOMERS.forEach((c) => {
    distribution[getCustomerSegment(c)]++
  })
  return distribution
}
