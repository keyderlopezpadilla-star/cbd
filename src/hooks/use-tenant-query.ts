'use client'

import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query'
import { useOrganization } from './use-organization'

type TenantQueryKey = readonly [string, ...unknown[]]

interface UseTenantQueryOptions<TData, TError = Error>
  extends Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'> {
  queryKey: TenantQueryKey
  queryFn: (context: { organizationId: string }) => Promise<TData>
}

/**
 * Wrapper around TanStack useQuery that automatically scopes queries
 * to the current tenant/organization. Adds organizationId to the query
 * key and passes it to the query function.
 */
export function useTenantQuery<TData, TError = Error>(
  options: UseTenantQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const { organization, isLoading: orgLoading } = useOrganization()
  const organizationId = organization?.id ?? ''

  const { queryKey, queryFn, enabled, ...restOptions } = options

  // Scope the query key to the organization
  const scopedQueryKey: QueryKey = ['tenant', organizationId, ...queryKey]

  return useQuery<TData, TError, TData, QueryKey>({
    queryKey: scopedQueryKey,
    queryFn: () => queryFn({ organizationId }),
    enabled: !orgLoading && !!organizationId && (enabled ?? true),
    ...restOptions,
  })
}
