import { describe, it, expect } from 'vitest'
import {
  APP_NAME,
  APP_DESCRIPTION,
  UserRole,
  StockStatus,
  OrderStatus,
  TransferStatus,
  LoyaltyTier,
  SubscriptionPlan,
  NotificationType,
  AuditAction,
  PRODUCT_CATEGORIES,
  DEMO_STORES,
  DEFAULT_TAX_RATE,
  REDUCED_TAX_RATE,
  POINTS_PER_EURO,
  POINTS_REDEMPTION_VALUE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  STOCK_LOW_THRESHOLD,
  STOCK_CRITICAL_THRESHOLD,
} from '@/lib/constants'

describe('App Constants', () => {
  it('has correct app name', () => {
    expect(APP_NAME).toBe('CBD SaaS Platform')
  })

  it('has app description', () => {
    expect(APP_DESCRIPTION).toBeTruthy()
    expect(typeof APP_DESCRIPTION).toBe('string')
  })
})

describe('UserRole enum', () => {
  it('contains all expected roles', () => {
    expect(UserRole.SUPER_ADMIN).toBe('SUPER_ADMIN')
    expect(UserRole.ADMIN).toBe('ADMIN')
    expect(UserRole.MANAGER).toBe('MANAGER')
    expect(UserRole.EMPLOYEE).toBe('EMPLOYEE')
    expect(UserRole.ACCOUNTING).toBe('ACCOUNTING')
    expect(UserRole.MARKETING).toBe('MARKETING')
  })

  it('has exactly 6 roles', () => {
    const roleValues = Object.values(UserRole)
    expect(roleValues).toHaveLength(6)
  })
})

describe('StockStatus enum', () => {
  it('contains all statuses', () => {
    expect(StockStatus.NORMAL).toBe('NORMAL')
    expect(StockStatus.LOW).toBe('LOW')
    expect(StockStatus.CRITICAL).toBe('CRITICAL')
    expect(StockStatus.OUT_OF_STOCK).toBe('OUT_OF_STOCK')
  })
})

describe('OrderStatus enum', () => {
  it('contains all statuses', () => {
    expect(OrderStatus.PENDING).toBe('PENDING')
    expect(OrderStatus.CONFIRMED).toBe('CONFIRMED')
    expect(OrderStatus.PREPARING).toBe('PREPARING')
    expect(OrderStatus.SHIPPED).toBe('SHIPPED')
    expect(OrderStatus.DELIVERED).toBe('DELIVERED')
    expect(OrderStatus.CANCELLED).toBe('CANCELLED')
    expect(OrderStatus.REFUNDED).toBe('REFUNDED')
  })

  it('has 7 possible statuses', () => {
    expect(Object.values(OrderStatus)).toHaveLength(7)
  })
})

describe('TransferStatus enum', () => {
  it('contains all statuses', () => {
    expect(TransferStatus.REQUESTED).toBe('REQUESTED')
    expect(TransferStatus.APPROVED).toBe('APPROVED')
    expect(TransferStatus.IN_TRANSIT).toBe('IN_TRANSIT')
    expect(TransferStatus.RECEIVED).toBe('RECEIVED')
    expect(TransferStatus.CANCELLED).toBe('CANCELLED')
  })
})

describe('LoyaltyTier enum', () => {
  it('contains all tiers in order', () => {
    expect(LoyaltyTier.STARTER).toBe('STARTER')
    expect(LoyaltyTier.PREMIUM).toBe('PREMIUM')
    expect(LoyaltyTier.VIP).toBe('VIP')
    expect(LoyaltyTier.BLACK).toBe('BLACK')
  })
})

describe('SubscriptionPlan enum', () => {
  it('contains all plans', () => {
    expect(SubscriptionPlan.FREE).toBe('FREE')
    expect(SubscriptionPlan.PRO).toBe('PRO')
    expect(SubscriptionPlan.BUSINESS).toBe('BUSINESS')
    expect(SubscriptionPlan.ENTERPRISE).toBe('ENTERPRISE')
  })

  it('has 4 plan levels', () => {
    expect(Object.values(SubscriptionPlan)).toHaveLength(4)
  })
})

describe('NotificationType enum', () => {
  it('contains all types', () => {
    expect(NotificationType.INFO).toBe('INFO')
    expect(NotificationType.SUCCESS).toBe('SUCCESS')
    expect(NotificationType.WARNING).toBe('WARNING')
    expect(NotificationType.ERROR).toBe('ERROR')
    expect(NotificationType.STOCK_ALERT).toBe('STOCK_ALERT')
    expect(NotificationType.ORDER_UPDATE).toBe('ORDER_UPDATE')
    expect(NotificationType.TRANSFER_UPDATE).toBe('TRANSFER_UPDATE')
    expect(NotificationType.SECURITY_ALERT).toBe('SECURITY_ALERT')
  })
})

describe('AuditAction enum', () => {
  it('contains CRUD actions plus auth actions', () => {
    expect(AuditAction.CREATE).toBe('CREATE')
    expect(AuditAction.READ).toBe('READ')
    expect(AuditAction.UPDATE).toBe('UPDATE')
    expect(AuditAction.DELETE).toBe('DELETE')
    expect(AuditAction.LOGIN).toBe('LOGIN')
    expect(AuditAction.LOGOUT).toBe('LOGOUT')
    expect(AuditAction.EXPORT).toBe('EXPORT')
  })
})

describe('PRODUCT_CATEGORIES', () => {
  it('has 7 categories', () => {
    expect(PRODUCT_CATEGORIES).toHaveLength(7)
  })

  it('each category has value and label', () => {
    for (const cat of PRODUCT_CATEGORIES) {
      expect(cat).toHaveProperty('value')
      expect(cat).toHaveProperty('label')
      expect(typeof cat.value).toBe('string')
      expect(typeof cat.label).toBe('string')
    }
  })

  it('includes oils category', () => {
    const oils = PRODUCT_CATEGORIES.find((c) => c.value === 'oils')
    expect(oils).toBeDefined()
    expect(oils?.label).toBe('Aceites CBD')
  })

  it('includes accessories category', () => {
    const acc = PRODUCT_CATEGORIES.find((c) => c.value === 'accessories')
    expect(acc).toBeDefined()
    expect(acc?.label).toBe('Accesorios')
  })
})

describe('DEMO_STORES', () => {
  it('has 5 stores', () => {
    expect(DEMO_STORES).toHaveLength(5)
  })

  it('all stores are in Spain', () => {
    for (const store of DEMO_STORES) {
      expect(store.country).toBe('España')
    }
  })

  it('each store has required fields', () => {
    for (const store of DEMO_STORES) {
      expect(store).toHaveProperty('id')
      expect(store).toHaveProperty('name')
      expect(store).toHaveProperty('city')
      expect(store).toHaveProperty('country')
    }
  })
})

describe('Configuration constants', () => {
  it('has correct tax rates', () => {
    expect(DEFAULT_TAX_RATE).toBe(21)
    expect(REDUCED_TAX_RATE).toBe(10)
  })

  it('has correct points configuration', () => {
    expect(POINTS_PER_EURO).toBe(1)
    expect(POINTS_REDEMPTION_VALUE).toBe(0.01)
  })

  it('has correct pagination defaults', () => {
    expect(DEFAULT_PAGE_SIZE).toBe(20)
    expect(MAX_PAGE_SIZE).toBe(100)
    expect(MAX_PAGE_SIZE).toBeGreaterThan(DEFAULT_PAGE_SIZE)
  })

  it('has correct stock thresholds', () => {
    expect(STOCK_LOW_THRESHOLD).toBe(10)
    expect(STOCK_CRITICAL_THRESHOLD).toBe(5)
    expect(STOCK_CRITICAL_THRESHOLD).toBeLessThan(STOCK_LOW_THRESHOLD)
  })
})
