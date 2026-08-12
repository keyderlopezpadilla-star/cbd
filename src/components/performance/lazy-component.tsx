'use client'

import { Suspense, ComponentType, lazy, useState, useEffect } from 'react'

interface LazyComponentProps<T extends ComponentType<any>> {
  /** Dynamic import function */
  loader: () => Promise<{ default: T }>
  /** Props to pass to the loaded component */
  props?: React.ComponentProps<T>
  /** Loading fallback */
  fallback?: React.ReactNode
  /** Error fallback */
  errorFallback?: React.ReactNode
}

/**
 * Default loading skeleton
 */
function DefaultSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-700/50 rounded w-3/4" />
      <div className="h-4 bg-gray-700/50 rounded w-1/2" />
      <div className="h-4 bg-gray-700/50 rounded w-5/6" />
    </div>
  )
}

/**
 * Generic lazy loading wrapper with Suspense and loading skeleton.
 * Handles dynamic imports with error boundaries and fallbacks.
 */
export function LazyComponent<T extends ComponentType<any>>({
  loader,
  props,
  fallback,
  errorFallback,
}: LazyComponentProps<T>) {
  const [Component, setComponent] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    loader()
      .then((module) => {
        if (mounted) {
          setComponent(() => module.default as T)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err)
        }
      })

    return () => {
      mounted = false
    }
  }, [loader])

  if (error) {
    return (
      <>
        {errorFallback || (
          <div className="text-red-400 p-4 rounded-lg bg-red-900/20 border border-red-800">
            <p className="text-sm">Error loading component</p>
          </div>
        )}
      </>
    )
  }

  if (!Component) {
    return <>{fallback || <DefaultSkeleton />}</>
  }

  return (
    <Suspense fallback={fallback || <DefaultSkeleton />}>
      <Component {...(props as any)} />
    </Suspense>
  )
}

/**
 * Create a lazy loaded component with retry logic
 */
export function createLazyComponent<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  retries: number = 3
) {
  let attempt = 0

  const retryLoader = async (): Promise<{ default: T }> => {
    try {
      return await loader()
    } catch (error) {
      if (attempt < retries) {
        attempt++
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
        return retryLoader()
      }
      throw error
    }
  }

  return lazy(retryLoader)
}
