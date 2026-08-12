import {
  UserRole,
  StockStatus,
  OrderStatus,
  TransferStatus,
  LoyaltyTier,
  SubscriptionPlan,
  NotificationType,
  AuditAction,
} from '@/lib/constants'

// User Types
export interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
  avatar: string | null
  storeId: string | null
  createdAt: Date
  updatedAt: Date
}

// Store Types
export interface Store {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  email: string
  managerId: string | null
  latitude: number | null
  longitude: number | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Product Types
export interface Product {
  id: string
  sku: string
  name: string
  description: string | null
  category: string
  brand: string | null
  price: number
  cost: number
  margin: number
  images: string[]
  isActive: boolean
  // CBD Compliance
  concentration: string | null
  composition: string | null
  batchNumber: string | null
  certifications: string[]
  laboratoryTests: string | null
  regulatoryStatus: string | null
  territorialRestrictions: string[]
  requiresAgeVerification: boolean
  createdAt: Date
  updatedAt: Date
}

// Inventory Types
export interface InventoryItem {
  id: string
  productId: string
  storeId: string
  quantity: number
  minStock: number
  maxStock: number
  status: StockStatus
  lastRestocked: Date | null
  expiryDate: Date | null
  location: string | null
}

// Sales Types
export interface Sale {
  id: string
  saleNumber: string
  storeId: string
  employeeId: string
  customerId: string | null
  items: SaleItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  status: string
  createdAt: Date
}

export interface SaleItem {
  productId: string
  productName: string
  quantity: number
  price: number
  discount: number
  total: number
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  storeId: string
  customerId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: OrderStatus
  shippingAddress: Address
  trackingNumber: string | null
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

// Transfer Types
export interface StockTransfer {
  id: string
  transferNumber: string
  fromStoreId: string
  toStoreId: string
  items: TransferItem[]
  status: TransferStatus
  requestedBy: string
  approvedBy: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

export interface TransferItem {
  productId: string
  productName: string
  quantity: number
}

// Customer Types
export interface Customer {
  id: string
  email: string
  name: string
  phone: string | null
  birthDate: Date | null
  preferredStoreId: string | null
  totalPurchases: number
  totalSpent: number
  averageTicket: number
  lastPurchase: Date | null
  loyaltyPoints: number
  loyaltyTier: LoyaltyTier
  marketingConsent: boolean
  createdAt: Date
  updatedAt: Date
}

// Analytics Types
export interface KPIMetrics {
  dailySales: number
  monthlySales: number
  profit: number
  averageTicket: number
  productsSold: number
  newCustomers: number
  pendingOrders: number
  lowStock: number
  criticalStock: number
}

export interface SalesChartData {
  date: string
  sales: number
  orders: number
}

export interface StorePerformance {
  storeId: string
  storeName: string
  sales: number
  orders: number
  averageTicket: number
  growth: number
}

// Common Types
export interface Address {
  street: string
  city: string
  state: string | null
  postalCode: string
  country: string
}

export interface TimeRange {
  start: Date
  end: Date
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}

export interface FilterParams {
  [key: string]: any
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  actionUrl: string | null
  createdAt: Date
}

// Audit Log Types
export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: AuditAction
  resource: string
  resourceId: string | null
  details: Record<string, any>
  ipAddress: string | null
  userAgent: string | null
  storeId: string | null
  createdAt: Date
}
