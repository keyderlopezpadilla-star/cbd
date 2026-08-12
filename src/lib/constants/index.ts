export const APP_NAME = 'CBD SaaS Platform'
export const APP_DESCRIPTION = 'Premium multi-store management platform for CBD franchises'

// User Roles
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  ACCOUNTING = 'ACCOUNTING',
  MARKETING = 'MARKETING',
}

// Stock Status
export enum StockStatus {
  NORMAL = 'NORMAL',
  LOW = 'LOW',
  CRITICAL = 'CRITICAL',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

// Order Status
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

// Transfer Status
export enum TransferStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  PREPARING = 'PREPARING',
  IN_TRANSIT = 'IN_TRANSIT',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

// Loyalty Tiers
export enum LoyaltyTier {
  STARTER = 'STARTER',
  PREMIUM = 'PREMIUM',
  VIP = 'VIP',
  BLACK = 'BLACK',
}

// Subscription Plans
export enum SubscriptionPlan {
  FREE = 'FREE',
  PRO = 'PRO',
  BUSINESS = 'BUSINESS',
  ENTERPRISE = 'ENTERPRISE',
}

// Notification Types
export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  STOCK_ALERT = 'STOCK_ALERT',
  ORDER_UPDATE = 'ORDER_UPDATE',
  TRANSFER_UPDATE = 'TRANSFER_UPDATE',
  SECURITY_ALERT = 'SECURITY_ALERT',
}

// Audit Action Types
export enum AuditAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EXPORT = 'EXPORT',
}

// CBD Product Categories
export const PRODUCT_CATEGORIES = [
  { value: 'oils', label: 'Aceites CBD' },
  { value: 'cosmetics', label: 'Cosmética' },
  { value: 'flowers', label: 'Flores' },
  { value: 'capsules', label: 'Cápsulas' },
  { value: 'creams', label: 'Cremas' },
  { value: 'wellness', label: 'Bienestar' },
  { value: 'accessories', label: 'Accesorios' },
]

// Default Stores (Demo Data)
export const DEMO_STORES = [
  { id: '1', name: 'Madrid Centro', city: 'Madrid', country: 'España' },
  { id: '2', name: 'Valencia Puerto', city: 'Valencia', country: 'España' },
  { id: '3', name: 'Barcelona Gótico', city: 'Barcelona', country: 'España' },
  { id: '4', name: 'Alicante Marina', city: 'Alicante', country: 'España' },
  { id: '5', name: 'Sevilla Triana', city: 'Sevilla', country: 'España' },
]

// Tax Rates
export const DEFAULT_TAX_RATE = 21 // 21% IVA Spain
export const REDUCED_TAX_RATE = 10

// Points Configuration
export const POINTS_PER_EURO = 1
export const POINTS_REDEMPTION_VALUE = 0.01 // 1 point = 0.01€

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Stock Thresholds
export const STOCK_LOW_THRESHOLD = 10
export const STOCK_CRITICAL_THRESHOLD = 5
