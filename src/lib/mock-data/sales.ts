import { Sale, SaleItem } from '@/types'

export interface DailySummary {
  date: string
  totalSales: number
  totalTransactions: number
  averageTicket: number
  totalTax: number
  totalDiscount: number
  paymentBreakdown: {
    cash: number
    card: number
    mixed: number
  }
  transactionsByHour: { hour: string; count: number; amount: number }[]
  topProducts: { productId: string; productName: string; quantity: number; revenue: number }[]
}

export interface ReturnRecord {
  id: string
  saleId: string
  saleNumber: string
  reason: ReturnReason
  items: ReturnItem[]
  refundAmount: number
  refundMethod: string
  processedBy: string
  notes: string | null
  createdAt: Date
}

export interface ReturnItem {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export type ReturnReason =
  | 'defective'
  | 'wrong_product'
  | 'customer_dissatisfied'
  | 'expired'
  | 'other'

export const RETURN_REASONS: { value: ReturnReason; label: string }[] = [
  { value: 'defective', label: 'Producto defectuoso' },
  { value: 'wrong_product', label: 'Producto incorrecto' },
  { value: 'customer_dissatisfied', label: 'Cliente insatisfecho' },
  { value: 'expired', label: 'Producto caducado' },
  { value: 'other', label: 'Otro motivo' },
]

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Efectivo', icon: 'Banknote' },
  { value: 'card', label: 'Tarjeta', icon: 'CreditCard' },
  { value: 'mixed', label: 'Mixto', icon: 'Wallet' },
] as const

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]['value']

// Mock Sales Data
export const mockSales: Sale[] = [
  {
    id: 'sale-001',
    saleNumber: 'VTA-2024-0001',
    storeId: '1',
    employeeId: 'emp-001',
    customerId: 'cust-001',
    items: [
      { productId: 'prod-001', productName: 'Aceite CBD Premium 5%', quantity: 2, price: 29.99, discount: 0, total: 59.98 },
      { productId: 'prod-006', productName: 'Balsamo Labial CBD', quantity: 1, price: 12.99, discount: 0, total: 12.99 },
    ],
    subtotal: 72.97,
    tax: 15.32,
    discount: 0,
    total: 88.29,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: new Date('2024-03-20T09:15:00'),
  },
  {
    id: 'sale-002',
    saleNumber: 'VTA-2024-0002',
    storeId: '1',
    employeeId: 'emp-001',
    customerId: null,
    items: [
      { productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', quantity: 3, price: 8.99, discount: 0, total: 26.97 },
      { productId: 'prod-021', productName: 'Grinder Premium 4 piezas', quantity: 1, price: 19.99, discount: 0, total: 19.99 },
    ],
    subtotal: 46.96,
    tax: 9.86,
    discount: 0,
    total: 56.82,
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: new Date('2024-03-20T10:30:00'),
  },
  {
    id: 'sale-003',
    saleNumber: 'VTA-2024-0003',
    storeId: '1',
    employeeId: 'emp-002',
    customerId: 'cust-003',
    items: [
      { productId: 'prod-002', productName: 'Aceite CBD Intenso 10%', quantity: 1, price: 49.99, discount: 5, total: 47.49 },
      { productId: 'prod-011', productName: 'Capsulas CBD 10mg Sueno', quantity: 1, price: 34.99, discount: 0, total: 34.99 },
      { productId: 'prod-017', productName: 'Infusion CBD Relax', quantity: 2, price: 18.99, discount: 0, total: 37.98 },
    ],
    subtotal: 120.46,
    tax: 25.30,
    discount: 2.50,
    total: 143.26,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: new Date('2024-03-20T11:45:00'),
  },
  {
    id: 'sale-004',
    saleNumber: 'VTA-2024-0004',
    storeId: '2',
    employeeId: 'emp-003',
    customerId: 'cust-005',
    items: [
      { productId: 'prod-003', productName: 'Aceite CBD Ultra 20%', quantity: 1, price: 89.99, discount: 10, total: 80.99 },
    ],
    subtotal: 80.99,
    tax: 17.01,
    discount: 9.00,
    total: 98.00,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: new Date('2024-03-20T12:00:00'),
  },
  {
    id: 'sale-005',
    saleNumber: 'VTA-2024-0005',
    storeId: '1',
    employeeId: 'emp-001',
    customerId: null,
    items: [
      { productId: 'prod-014', productName: 'Crema CBD Muscular Sport', quantity: 1, price: 32.99, discount: 0, total: 32.99 },
      { productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', quantity: 2, price: 29.99, discount: 0, total: 59.98 },
    ],
    subtotal: 92.97,
    tax: 19.52,
    discount: 0,
    total: 112.49,
    paymentMethod: 'mixed',
    status: 'completed',
    createdAt: new Date('2024-03-20T14:20:00'),
  },
  {
    id: 'sale-006',
    saleNumber: 'VTA-2024-0006',
    storeId: '1',
    employeeId: 'emp-002',
    customerId: 'cust-002',
    items: [
      { productId: 'prod-005', productName: 'Serum Facial CBD Anti-edad', quantity: 1, price: 45.99, discount: 0, total: 45.99 },
      { productId: 'prod-015', productName: 'Crema Hidratante CBD Facial', quantity: 1, price: 36.99, discount: 0, total: 36.99 },
    ],
    subtotal: 82.98,
    tax: 17.43,
    discount: 0,
    total: 100.41,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: new Date('2024-03-20T15:10:00'),
  },
  {
    id: 'sale-007',
    saleNumber: 'VTA-2024-0007',
    storeId: '3',
    employeeId: 'emp-004',
    customerId: null,
    items: [
      { productId: 'prod-009', productName: 'Flores CBD OG Kush', quantity: 5, price: 9.99, discount: 0, total: 49.95 },
      { productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', quantity: 3, price: 11.99, discount: 0, total: 35.97 },
      { productId: 'prod-020', productName: 'Vaporizador CBD Pen Starter', quantity: 1, price: 29.99, discount: 0, total: 29.99 },
    ],
    subtotal: 115.91,
    tax: 24.34,
    discount: 0,
    total: 140.25,
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: new Date('2024-03-20T16:30:00'),
  },
  {
    id: 'sale-008',
    saleNumber: 'VTA-2024-0008',
    storeId: '1',
    employeeId: 'emp-001',
    customerId: 'cust-007',
    items: [
      { productId: 'prod-012', productName: 'Capsulas CBD 25mg Concentracion', quantity: 2, price: 54.99, discount: 5, total: 104.48 },
    ],
    subtotal: 104.48,
    tax: 21.94,
    discount: 5.50,
    total: 120.92,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: new Date('2024-03-20T17:00:00'),
  },
  {
    id: 'sale-009',
    saleNumber: 'VTA-2024-0009',
    storeId: '2',
    employeeId: 'emp-003',
    customerId: null,
    items: [
      { productId: 'prod-004', productName: 'Aceite CBD Mascotas 3%', quantity: 1, price: 24.99, discount: 0, total: 24.99 },
      { productId: 'prod-022', productName: 'Kit Dosificacion Aceite CBD', quantity: 1, price: 14.99, discount: 0, total: 14.99 },
    ],
    subtotal: 39.98,
    tax: 8.40,
    discount: 0,
    total: 48.38,
    paymentMethod: 'cash',
    status: 'completed',
    createdAt: new Date('2024-03-20T17:45:00'),
  },
  {
    id: 'sale-010',
    saleNumber: 'VTA-2024-0010',
    storeId: '1',
    employeeId: 'emp-002',
    customerId: 'cust-004',
    items: [
      { productId: 'prod-019', productName: 'Proteina Whey + CBD Recovery', quantity: 1, price: 54.99, discount: 0, total: 54.99 },
      { productId: 'prod-016', productName: 'Crema CBD Articulaciones', quantity: 1, price: 39.99, discount: 0, total: 39.99 },
    ],
    subtotal: 94.98,
    tax: 19.95,
    discount: 0,
    total: 114.93,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: new Date('2024-03-20T18:15:00'),
  },
  {
    id: 'sale-011',
    saleNumber: 'VTA-2024-0011',
    storeId: '1',
    employeeId: 'emp-001',
    customerId: null,
    items: [
      { productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', quantity: 2, price: 8.99, discount: 0, total: 17.98 },
    ],
    subtotal: 17.98,
    tax: 3.78,
    discount: 0,
    total: 21.76,
    paymentMethod: 'cash',
    status: 'refunded',
    createdAt: new Date('2024-03-19T11:00:00'),
  },
  {
    id: 'sale-012',
    saleNumber: 'VTA-2024-0012',
    storeId: '4',
    employeeId: 'emp-005',
    customerId: 'cust-006',
    items: [
      { productId: 'prod-001', productName: 'Aceite CBD Premium 5%', quantity: 1, price: 29.99, discount: 0, total: 29.99 },
      { productId: 'prod-011', productName: 'Capsulas CBD 10mg Sueno', quantity: 1, price: 34.99, discount: 0, total: 34.99 },
      { productId: 'prod-017', productName: 'Infusion CBD Relax', quantity: 1, price: 18.99, discount: 0, total: 18.99 },
    ],
    subtotal: 83.97,
    tax: 17.63,
    discount: 0,
    total: 101.60,
    paymentMethod: 'card',
    status: 'completed',
    createdAt: new Date('2024-03-19T14:30:00'),
  },
]

// Mock Returns
export const mockReturns: ReturnRecord[] = [
  {
    id: 'ret-001',
    saleId: 'sale-011',
    saleNumber: 'VTA-2024-0011',
    reason: 'defective',
    items: [
      { productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', quantity: 2, price: 8.99, total: 17.98 },
    ],
    refundAmount: 21.76,
    refundMethod: 'cash',
    processedBy: 'emp-001',
    notes: 'Producto con signos de humedad. Devolucion completa.',
    createdAt: new Date('2024-03-19T15:00:00'),
  },
  {
    id: 'ret-002',
    saleId: 'sale-003',
    saleNumber: 'VTA-2024-0003',
    reason: 'customer_dissatisfied',
    items: [
      { productId: 'prod-017', productName: 'Infusion CBD Relax', quantity: 1, price: 18.99, total: 18.99 },
    ],
    refundAmount: 22.98,
    refundMethod: 'card',
    processedBy: 'emp-002',
    notes: 'Cliente no satisfecho con el sabor. Devolucion parcial de 1 unidad.',
    createdAt: new Date('2024-03-20T16:00:00'),
  },
]

// Mock Daily Summary
export const mockDailySummary: DailySummary = {
  date: '2024-03-20',
  totalSales: 1025.75,
  totalTransactions: 10,
  averageTicket: 102.58,
  totalTax: 179.07,
  totalDiscount: 17.00,
  paymentBreakdown: {
    cash: 226.96,
    card: 686.30,
    mixed: 112.49,
  },
  transactionsByHour: [
    { hour: '09:00', count: 1, amount: 88.29 },
    { hour: '10:00', count: 1, amount: 56.82 },
    { hour: '11:00', count: 1, amount: 143.26 },
    { hour: '12:00', count: 1, amount: 98.00 },
    { hour: '13:00', count: 0, amount: 0 },
    { hour: '14:00', count: 1, amount: 112.49 },
    { hour: '15:00', count: 1, amount: 100.41 },
    { hour: '16:00', count: 1, amount: 140.25 },
    { hour: '17:00', count: 2, amount: 169.30 },
    { hour: '18:00', count: 1, amount: 114.93 },
  ],
  topProducts: [
    { productId: 'prod-008', productName: 'Flores CBD Amnesia Haze', quantity: 5, revenue: 44.95 },
    { productId: 'prod-009', productName: 'Flores CBD OG Kush', quantity: 5, revenue: 49.95 },
    { productId: 'prod-010', productName: 'Flores CBD Gorilla Glue', quantity: 3, revenue: 35.97 },
    { productId: 'prod-001', productName: 'Aceite CBD Premium 5%', quantity: 2, revenue: 59.98 },
    { productId: 'prod-018', productName: 'Gominolas CBD Frutas 10mg', quantity: 2, revenue: 59.98 },
  ],
}

// Helper functions
export function getSalesByStore(storeId: string): Sale[] {
  return mockSales.filter((s) => s.storeId === storeId)
}

export function getSalesByEmployee(employeeId: string): Sale[] {
  return mockSales.filter((s) => s.employeeId === employeeId)
}

export function getSalesByDateRange(start: Date, end: Date): Sale[] {
  return mockSales.filter(
    (s) => s.createdAt >= start && s.createdAt <= end
  )
}

export function getSalesByPaymentMethod(method: string): Sale[] {
  return mockSales.filter((s) => s.paymentMethod === method)
}

export function generateSaleNumber(): string {
  const year = new Date().getFullYear()
  const nextNumber = mockSales.length + 1
  return `VTA-${year}-${nextNumber.toString().padStart(4, '0')}`
}
