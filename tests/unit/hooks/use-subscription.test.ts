import { describe, it, expect } from 'vitest'
import { SubscriptionPlan } from '@/lib/constants'

/**
 * Subscription hook logic tests.
 * Tests the core logic that would be used by the useSubscription hook.
 */

interface PlanInfo {
  plan: SubscriptionPlan
  name: string
  price: number
  interval: 'monthly' | 'yearly'
}

const PLAN_INFO: Record<SubscriptionPlan, PlanInfo> = {
  [SubscriptionPlan.FREE]: { plan: SubscriptionPlan.FREE, name: 'Gratuito', price: 0, interval: 'monthly' },
  [SubscriptionPlan.PRO]: { plan: SubscriptionPlan.PRO, name: 'Profesional', price: 49, interval: 'monthly' },
  [SubscriptionPlan.BUSINESS]: { plan: SubscriptionPlan.BUSINESS, name: 'Negocio', price: 149, interval: 'monthly' },
  [SubscriptionPlan.ENTERPRISE]: { plan: SubscriptionPlan.ENTERPRISE, name: 'Empresa', price: 499, interval: 'monthly' },
}

function getPlanInfo(plan: SubscriptionPlan): PlanInfo {
  return PLAN_INFO[plan]
}

function canUpgrade(currentPlan: SubscriptionPlan): boolean {
  return currentPlan !== SubscriptionPlan.ENTERPRISE
}

function getUpgradePath(currentPlan: SubscriptionPlan): SubscriptionPlan | null {
  const order = [SubscriptionPlan.FREE, SubscriptionPlan.PRO, SubscriptionPlan.BUSINESS, SubscriptionPlan.ENTERPRISE]
  const currentIndex = order.indexOf(currentPlan)
  if (currentIndex === order.length - 1) return null
  return order[currentIndex + 1]
}

function isPlanExpired(endsAt: Date | null): boolean {
  if (!endsAt) return false
  return new Date() > endsAt
}

describe('getPlanInfo', () => {
  it('returns correct info for FREE plan', () => {
    const info = getPlanInfo(SubscriptionPlan.FREE)
    expect(info.name).toBe('Gratuito')
    expect(info.price).toBe(0)
  })

  it('returns correct info for PRO plan', () => {
    const info = getPlanInfo(SubscriptionPlan.PRO)
    expect(info.name).toBe('Profesional')
    expect(info.price).toBe(49)
  })

  it('returns correct info for BUSINESS plan', () => {
    const info = getPlanInfo(SubscriptionPlan.BUSINESS)
    expect(info.name).toBe('Negocio')
    expect(info.price).toBe(149)
  })

  it('returns correct info for ENTERPRISE plan', () => {
    const info = getPlanInfo(SubscriptionPlan.ENTERPRISE)
    expect(info.name).toBe('Empresa')
    expect(info.price).toBe(499)
  })

  it('prices increase with plan level', () => {
    const free = getPlanInfo(SubscriptionPlan.FREE)
    const pro = getPlanInfo(SubscriptionPlan.PRO)
    const business = getPlanInfo(SubscriptionPlan.BUSINESS)
    const enterprise = getPlanInfo(SubscriptionPlan.ENTERPRISE)

    expect(free.price).toBeLessThan(pro.price)
    expect(pro.price).toBeLessThan(business.price)
    expect(business.price).toBeLessThan(enterprise.price)
  })
})

describe('canUpgrade', () => {
  it('FREE can upgrade', () => {
    expect(canUpgrade(SubscriptionPlan.FREE)).toBe(true)
  })

  it('PRO can upgrade', () => {
    expect(canUpgrade(SubscriptionPlan.PRO)).toBe(true)
  })

  it('BUSINESS can upgrade', () => {
    expect(canUpgrade(SubscriptionPlan.BUSINESS)).toBe(true)
  })

  it('ENTERPRISE cannot upgrade', () => {
    expect(canUpgrade(SubscriptionPlan.ENTERPRISE)).toBe(false)
  })
})

describe('getUpgradePath', () => {
  it('FREE upgrades to PRO', () => {
    expect(getUpgradePath(SubscriptionPlan.FREE)).toBe(SubscriptionPlan.PRO)
  })

  it('PRO upgrades to BUSINESS', () => {
    expect(getUpgradePath(SubscriptionPlan.PRO)).toBe(SubscriptionPlan.BUSINESS)
  })

  it('BUSINESS upgrades to ENTERPRISE', () => {
    expect(getUpgradePath(SubscriptionPlan.BUSINESS)).toBe(SubscriptionPlan.ENTERPRISE)
  })

  it('ENTERPRISE returns null', () => {
    expect(getUpgradePath(SubscriptionPlan.ENTERPRISE)).toBeNull()
  })
})

describe('isPlanExpired', () => {
  it('returns false when endsAt is null', () => {
    expect(isPlanExpired(null)).toBe(false)
  })

  it('returns true when plan has expired', () => {
    const pastDate = new Date('2020-01-01')
    expect(isPlanExpired(pastDate)).toBe(true)
  })

  it('returns false when plan is still active', () => {
    const futureDate = new Date('2099-12-31')
    expect(isPlanExpired(futureDate)).toBe(false)
  })
})
