import { describe, it, expect } from 'vitest'
import { SubscriptionPlan } from '@/lib/constants'

/**
 * Organization context hook logic tests.
 * Tests the core logic for organization/tenant context management.
 */

interface OrganizationContext {
  id: string
  name: string
  slug: string
  plan: SubscriptionPlan
  isActive: boolean
  settings: {
    currency: string
    locale: string
    timezone: string
    taxRate: number
  }
}

function createOrganizationContext(data: Partial<OrganizationContext>): OrganizationContext {
  return {
    id: data.id || '',
    name: data.name || '',
    slug: data.slug || '',
    plan: data.plan || SubscriptionPlan.FREE,
    isActive: data.isActive ?? true,
    settings: {
      currency: data.settings?.currency || 'EUR',
      locale: data.settings?.locale || 'es-ES',
      timezone: data.settings?.timezone || 'Europe/Madrid',
      taxRate: data.settings?.taxRate ?? 21,
    },
  }
}

function isOrganizationValid(org: OrganizationContext): boolean {
  return !!(org.id && org.name && org.slug && org.isActive)
}

function getOrganizationDisplayName(org: OrganizationContext): string {
  return org.name || org.slug || org.id
}

describe('createOrganizationContext', () => {
  it('creates context with all provided data', () => {
    const org = createOrganizationContext({
      id: 'org_123',
      name: 'GreenLeaf CBD',
      slug: 'greenleaf-cbd',
      plan: SubscriptionPlan.BUSINESS,
      isActive: true,
      settings: {
        currency: 'EUR',
        locale: 'es-ES',
        timezone: 'Europe/Madrid',
        taxRate: 21,
      },
    })

    expect(org.id).toBe('org_123')
    expect(org.name).toBe('GreenLeaf CBD')
    expect(org.slug).toBe('greenleaf-cbd')
    expect(org.plan).toBe(SubscriptionPlan.BUSINESS)
    expect(org.isActive).toBe(true)
    expect(org.settings.currency).toBe('EUR')
    expect(org.settings.taxRate).toBe(21)
  })

  it('uses defaults for missing data', () => {
    const org = createOrganizationContext({})

    expect(org.id).toBe('')
    expect(org.name).toBe('')
    expect(org.slug).toBe('')
    expect(org.plan).toBe(SubscriptionPlan.FREE)
    expect(org.isActive).toBe(true)
    expect(org.settings.currency).toBe('EUR')
    expect(org.settings.locale).toBe('es-ES')
    expect(org.settings.timezone).toBe('Europe/Madrid')
    expect(org.settings.taxRate).toBe(21)
  })

  it('allows partial settings override', () => {
    const org = createOrganizationContext({
      settings: {
        currency: 'USD',
        locale: 'en-US',
        timezone: 'America/New_York',
        taxRate: 8.5,
      },
    })

    expect(org.settings.currency).toBe('USD')
    expect(org.settings.locale).toBe('en-US')
    expect(org.settings.timezone).toBe('America/New_York')
    expect(org.settings.taxRate).toBe(8.5)
  })
})

describe('isOrganizationValid', () => {
  it('returns true for complete active organization', () => {
    const org = createOrganizationContext({
      id: 'org_123',
      name: 'Test Org',
      slug: 'test-org',
      isActive: true,
    })
    expect(isOrganizationValid(org)).toBe(true)
  })

  it('returns false for inactive organization', () => {
    const org = createOrganizationContext({
      id: 'org_123',
      name: 'Test Org',
      slug: 'test-org',
      isActive: false,
    })
    expect(isOrganizationValid(org)).toBe(false)
  })

  it('returns false for organization without id', () => {
    const org = createOrganizationContext({
      name: 'Test Org',
      slug: 'test-org',
    })
    expect(isOrganizationValid(org)).toBe(false)
  })

  it('returns false for organization without name', () => {
    const org = createOrganizationContext({
      id: 'org_123',
      slug: 'test-org',
    })
    expect(isOrganizationValid(org)).toBe(false)
  })

  it('returns false for organization without slug', () => {
    const org = createOrganizationContext({
      id: 'org_123',
      name: 'Test Org',
    })
    expect(isOrganizationValid(org)).toBe(false)
  })
})

describe('getOrganizationDisplayName', () => {
  it('returns name when available', () => {
    const org = createOrganizationContext({
      id: 'org_123',
      name: 'GreenLeaf CBD',
      slug: 'greenleaf-cbd',
    })
    expect(getOrganizationDisplayName(org)).toBe('GreenLeaf CBD')
  })

  it('falls back to slug when name is empty', () => {
    const org = createOrganizationContext({
      id: 'org_123',
      slug: 'greenleaf-cbd',
    })
    expect(getOrganizationDisplayName(org)).toBe('greenleaf-cbd')
  })

  it('falls back to id when both name and slug are empty', () => {
    const org = createOrganizationContext({
      id: 'org_123',
    })
    expect(getOrganizationDisplayName(org)).toBe('org_123')
  })
})
