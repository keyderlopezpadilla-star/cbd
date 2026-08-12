import { describe, it, expect } from 'vitest'
import { SubscriptionPlan } from '@/lib/constants'

/**
 * Subscription plan definitions with limits.
 * Mirrors the subscription lib logic.
 */
const PLAN_LIMITS = {
  [SubscriptionPlan.FREE]: {
    maxProducts: 50,
    maxStores: 1,
    maxUsers: 3,
    maxAIQueries: 10,
    features: ['basic_pos', 'basic_inventory'],
  },
  [SubscriptionPlan.PRO]: {
    maxProducts: 500,
    maxStores: 3,
    maxUsers: 15,
    maxAIQueries: 100,
    features: ['basic_pos', 'basic_inventory', 'analytics', 'reports', 'crm'],
  },
  [SubscriptionPlan.BUSINESS]: {
    maxProducts: 5000,
    maxStores: 10,
    maxUsers: 50,
    maxAIQueries: 1000,
    features: ['basic_pos', 'basic_inventory', 'analytics', 'reports', 'crm', 'ai_assistant', 'multi_store', 'api_access'],
  },
  [SubscriptionPlan.ENTERPRISE]: {
    maxProducts: Infinity,
    maxStores: Infinity,
    maxUsers: Infinity,
    maxAIQueries: Infinity,
    features: ['basic_pos', 'basic_inventory', 'analytics', 'reports', 'crm', 'ai_assistant', 'multi_store', 'api_access', 'white_label', 'priority_support', 'custom_integrations'],
  },
}

function canAccessFeature(plan: SubscriptionPlan, feature: string): boolean {
  return PLAN_LIMITS[plan].features.includes(feature)
}

function isWithinLimit(plan: SubscriptionPlan, resource: 'products' | 'stores' | 'users' | 'aiQueries', current: number): boolean {
  const limitKey = `max${resource.charAt(0).toUpperCase() + resource.slice(1)}` as keyof typeof PLAN_LIMITS[SubscriptionPlan]
  const limit = PLAN_LIMITS[plan][limitKey] as number
  return current < limit
}

function getUsagePercentage(plan: SubscriptionPlan, resource: 'products' | 'stores' | 'users' | 'aiQueries', current: number): number {
  const limitKey = `max${resource.charAt(0).toUpperCase() + resource.slice(1)}` as keyof typeof PLAN_LIMITS[SubscriptionPlan]
  const limit = PLAN_LIMITS[plan][limitKey] as number
  if (limit === Infinity) return 0
  return Math.round((current / limit) * 100)
}

describe('Subscription Plan Limits', () => {
  describe('FREE plan', () => {
    it('has strict limits', () => {
      const limits = PLAN_LIMITS[SubscriptionPlan.FREE]
      expect(limits.maxProducts).toBe(50)
      expect(limits.maxStores).toBe(1)
      expect(limits.maxUsers).toBe(3)
      expect(limits.maxAIQueries).toBe(10)
    })

    it('has only basic features', () => {
      const features = PLAN_LIMITS[SubscriptionPlan.FREE].features
      expect(features).toContain('basic_pos')
      expect(features).toContain('basic_inventory')
      expect(features).not.toContain('analytics')
      expect(features).not.toContain('ai_assistant')
    })
  })

  describe('PRO plan', () => {
    it('has higher limits than FREE', () => {
      const free = PLAN_LIMITS[SubscriptionPlan.FREE]
      const pro = PLAN_LIMITS[SubscriptionPlan.PRO]
      expect(pro.maxProducts).toBeGreaterThan(free.maxProducts)
      expect(pro.maxStores).toBeGreaterThan(free.maxStores)
      expect(pro.maxUsers).toBeGreaterThan(free.maxUsers)
      expect(pro.maxAIQueries).toBeGreaterThan(free.maxAIQueries)
    })

    it('includes analytics and CRM', () => {
      const features = PLAN_LIMITS[SubscriptionPlan.PRO].features
      expect(features).toContain('analytics')
      expect(features).toContain('reports')
      expect(features).toContain('crm')
    })
  })

  describe('BUSINESS plan', () => {
    it('includes AI and multi-store', () => {
      const features = PLAN_LIMITS[SubscriptionPlan.BUSINESS].features
      expect(features).toContain('ai_assistant')
      expect(features).toContain('multi_store')
      expect(features).toContain('api_access')
    })
  })

  describe('ENTERPRISE plan', () => {
    it('has unlimited resources', () => {
      const limits = PLAN_LIMITS[SubscriptionPlan.ENTERPRISE]
      expect(limits.maxProducts).toBe(Infinity)
      expect(limits.maxStores).toBe(Infinity)
      expect(limits.maxUsers).toBe(Infinity)
      expect(limits.maxAIQueries).toBe(Infinity)
    })

    it('has all features', () => {
      const features = PLAN_LIMITS[SubscriptionPlan.ENTERPRISE].features
      expect(features).toContain('white_label')
      expect(features).toContain('priority_support')
      expect(features).toContain('custom_integrations')
    })
  })
})

describe('canAccessFeature', () => {
  it('FREE plan can access basic_pos', () => {
    expect(canAccessFeature(SubscriptionPlan.FREE, 'basic_pos')).toBe(true)
  })

  it('FREE plan cannot access analytics', () => {
    expect(canAccessFeature(SubscriptionPlan.FREE, 'analytics')).toBe(false)
  })

  it('PRO plan can access analytics', () => {
    expect(canAccessFeature(SubscriptionPlan.PRO, 'analytics')).toBe(true)
  })

  it('PRO plan cannot access ai_assistant', () => {
    expect(canAccessFeature(SubscriptionPlan.PRO, 'ai_assistant')).toBe(false)
  })

  it('BUSINESS plan can access ai_assistant', () => {
    expect(canAccessFeature(SubscriptionPlan.BUSINESS, 'ai_assistant')).toBe(true)
  })

  it('ENTERPRISE plan has access to everything', () => {
    expect(canAccessFeature(SubscriptionPlan.ENTERPRISE, 'white_label')).toBe(true)
    expect(canAccessFeature(SubscriptionPlan.ENTERPRISE, 'custom_integrations')).toBe(true)
  })

  it('returns false for non-existent feature', () => {
    expect(canAccessFeature(SubscriptionPlan.ENTERPRISE, 'time_travel')).toBe(false)
  })
})

describe('isWithinLimit', () => {
  it('returns true when under limit', () => {
    expect(isWithinLimit(SubscriptionPlan.FREE, 'products', 10)).toBe(true)
  })

  it('returns false when at limit', () => {
    expect(isWithinLimit(SubscriptionPlan.FREE, 'products', 50)).toBe(false)
  })

  it('returns false when over limit', () => {
    expect(isWithinLimit(SubscriptionPlan.FREE, 'stores', 2)).toBe(false)
  })

  it('ENTERPRISE is always within limit', () => {
    expect(isWithinLimit(SubscriptionPlan.ENTERPRISE, 'products', 999999)).toBe(true)
    expect(isWithinLimit(SubscriptionPlan.ENTERPRISE, 'stores', 999999)).toBe(true)
  })
})

describe('getUsagePercentage', () => {
  it('calculates correct percentage', () => {
    expect(getUsagePercentage(SubscriptionPlan.FREE, 'products', 25)).toBe(50)
    expect(getUsagePercentage(SubscriptionPlan.FREE, 'products', 50)).toBe(100)
  })

  it('returns 0 for ENTERPRISE (unlimited)', () => {
    expect(getUsagePercentage(SubscriptionPlan.ENTERPRISE, 'products', 5000)).toBe(0)
  })

  it('can exceed 100% when over limit', () => {
    expect(getUsagePercentage(SubscriptionPlan.FREE, 'users', 6)).toBe(200)
  })
})
