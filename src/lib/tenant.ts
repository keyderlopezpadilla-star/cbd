import { SubscriptionPlan } from '@/lib/constants'

/**
 * Organization data extracted from a user session
 */
export interface SessionOrganization {
  id: string
  name: string
  slug: string
  subscriptionPlan: SubscriptionPlan
  settings: Record<string, unknown>
}

/**
 * Extract organization data from the current session
 */
export function getOrganizationFromSession(session: {
  user?: {
    organizationId?: string
    organizationName?: string
    organizationSlug?: string
    subscriptionPlan?: SubscriptionPlan
    organizationSettings?: Record<string, unknown>
  } | null
}): SessionOrganization | null {
  const user = session?.user

  if (!user?.organizationId) return null

  return {
    id: user.organizationId,
    name: user.organizationName ?? 'Organization',
    slug: user.organizationSlug ?? '',
    subscriptionPlan: user.subscriptionPlan ?? SubscriptionPlan.FREE,
    settings: user.organizationSettings ?? {},
  }
}

/**
 * Validate that a user has access to a specific organization
 */
export async function validateTenantAccess(
  userId: string,
  orgId: string
): Promise<boolean> {
  // In a real implementation, this would query the database to check
  // if the user belongs to the specified organization
  // For now, we provide the structure for the validation logic
  if (!userId || !orgId) return false

  try {
    const response = await fetch(`/api/organizations/${orgId}/members/${userId}`)
    return response.ok
  } catch {
    return false
  }
}

/**
 * Scope a query/filter object to a specific tenant by adding organizationId
 */
export function scopeQueryToTenant<T extends Record<string, unknown>>(
  query: T,
  orgId: string
): T & { organizationId: string } {
  return {
    ...query,
    organizationId: orgId,
  }
}

/**
 * Get headers required for tenant-scoped API requests
 */
export function getTenantHeaders(organizationId?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (organizationId) {
    headers['X-Organization-Id'] = organizationId
  }

  return headers
}
