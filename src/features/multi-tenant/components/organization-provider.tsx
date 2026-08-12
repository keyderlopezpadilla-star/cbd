'use client'

import { createContext, ReactNode, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { SubscriptionPlan } from '@/lib/constants'

export interface OrganizationData {
  id: string
  name: string
  slug: string
  subscriptionPlan: SubscriptionPlan
  settings: Record<string, unknown>
}

export interface OrganizationContextValue {
  organization: OrganizationData | null
  isLoading: boolean
}

export const OrganizationContext = createContext<OrganizationContextValue>({
  organization: null,
  isLoading: true,
})

interface OrganizationProviderProps {
  children: ReactNode
}

export function OrganizationProvider({ children }: OrganizationProviderProps) {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'

  const organization = useMemo<OrganizationData | null>(() => {
    if (!session?.user) return null

    const user = session.user as {
      organizationId?: string
      organizationName?: string
      organizationSlug?: string
      subscriptionPlan?: SubscriptionPlan
      organizationSettings?: Record<string, unknown>
    }

    if (!user.organizationId) return null

    return {
      id: user.organizationId,
      name: user.organizationName ?? 'Organization',
      slug: user.organizationSlug ?? '',
      subscriptionPlan: user.subscriptionPlan ?? SubscriptionPlan.FREE,
      settings: user.organizationSettings ?? {},
    }
  }, [session])

  const value = useMemo<OrganizationContextValue>(
    () => ({
      organization,
      isLoading,
    }),
    [organization, isLoading]
  )

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}
