import { describe, it, expect, vi } from 'vitest'
import {
  getOrganizationFromSession,
  scopeQueryToTenant,
  getTenantHeaders,
} from '@/lib/tenant'
import { SubscriptionPlan } from '@/lib/constants'

describe('getOrganizationFromSession', () => {
  it('returns organization data when session has org info', () => {
    const session = {
      user: {
        organizationId: 'org_123',
        organizationName: 'Test Org',
        organizationSlug: 'test-org',
        subscriptionPlan: SubscriptionPlan.BUSINESS,
        organizationSettings: { currency: 'EUR' },
      },
    }

    const result = getOrganizationFromSession(session)
    expect(result).not.toBeNull()
    expect(result?.id).toBe('org_123')
    expect(result?.name).toBe('Test Org')
    expect(result?.slug).toBe('test-org')
    expect(result?.subscriptionPlan).toBe(SubscriptionPlan.BUSINESS)
    expect(result?.settings).toEqual({ currency: 'EUR' })
  })

  it('returns null when session has no user', () => {
    const result = getOrganizationFromSession({ user: null })
    expect(result).toBeNull()
  })

  it('returns null when user has no organizationId', () => {
    const session = {
      user: {
        organizationId: undefined,
        organizationName: 'Test',
      },
    }
    const result = getOrganizationFromSession(session)
    expect(result).toBeNull()
  })

  it('uses default values for missing fields', () => {
    const session = {
      user: {
        organizationId: 'org_456',
      },
    }
    const result = getOrganizationFromSession(session)
    expect(result).not.toBeNull()
    expect(result?.name).toBe('Organization')
    expect(result?.slug).toBe('')
    expect(result?.subscriptionPlan).toBe(SubscriptionPlan.FREE)
    expect(result?.settings).toEqual({})
  })

  it('returns null for empty session', () => {
    const result = getOrganizationFromSession({})
    expect(result).toBeNull()
  })
})

describe('scopeQueryToTenant', () => {
  it('adds organizationId to query object', () => {
    const query = { status: 'active', page: 1 }
    const result = scopeQueryToTenant(query, 'org_123')

    expect(result.organizationId).toBe('org_123')
    expect(result.status).toBe('active')
    expect(result.page).toBe(1)
  })

  it('works with empty query', () => {
    const result = scopeQueryToTenant({}, 'org_456')
    expect(result).toEqual({ organizationId: 'org_456' })
  })

  it('overwrites existing organizationId', () => {
    const query = { organizationId: 'old_org' }
    const result = scopeQueryToTenant(query, 'new_org')
    expect(result.organizationId).toBe('new_org')
  })

  it('preserves complex nested objects', () => {
    const query = {
      filters: { category: 'oils' },
      sort: { field: 'name', order: 'asc' },
    }
    const result = scopeQueryToTenant(query, 'org_789')
    expect(result.filters).toEqual({ category: 'oils' })
    expect(result.sort).toEqual({ field: 'name', order: 'asc' })
    expect(result.organizationId).toBe('org_789')
  })
})

describe('getTenantHeaders', () => {
  it('returns headers with organization ID', () => {
    const headers = getTenantHeaders('org_123')
    expect(headers['Content-Type']).toBe('application/json')
    expect(headers['X-Organization-Id']).toBe('org_123')
  })

  it('returns headers without org ID when not provided', () => {
    const headers = getTenantHeaders()
    expect(headers['Content-Type']).toBe('application/json')
    expect(headers['X-Organization-Id']).toBeUndefined()
  })

  it('returns headers without org ID for empty string', () => {
    const headers = getTenantHeaders('')
    expect(headers['Content-Type']).toBe('application/json')
    expect(headers['X-Organization-Id']).toBeUndefined()
  })
})
