'use client'

import { useContext, useCallback } from 'react'
import {
  OrganizationContext,
  OrganizationData,
} from '@/features/multi-tenant/components/organization-provider'

interface UseOrganizationReturn {
  organization: OrganizationData | null
  isLoading: boolean
  switchOrganization: (organizationId: string) => Promise<void>
}

export function useOrganization(): UseOrganizationReturn {
  const context = useContext(OrganizationContext)

  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider')
  }

  const switchOrganization = useCallback(async (organizationId: string) => {
    // Switch organization by calling the API endpoint
    // This will update the session with the new organization context
    const response = await fetch('/api/organizations/switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organizationId }),
    })

    if (!response.ok) {
      throw new Error('Failed to switch organization')
    }

    // Reload the page to refresh the session with new org context
    window.location.reload()
  }, [])

  return {
    organization: context.organization,
    isLoading: context.isLoading,
    switchOrganization,
  }
}
