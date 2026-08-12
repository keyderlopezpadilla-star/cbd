/**
 * Dynamic import helpers with retry logic and preload functions.
 * Handles code splitting and chunk loading failures gracefully.
 */

import { ComponentType } from 'react'

interface RetryOptions {
  /** Number of retry attempts */
  retries?: number
  /** Delay between retries in ms */
  delay?: number
  /** Exponential backoff multiplier */
  backoff?: number
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  retries: 3,
  delay: 1000,
  backoff: 2,
}

/**
 * Dynamic import with retry logic for chunk loading failures.
 * Useful when network issues cause chunk load errors.
 */
export function dynamicImport<T>(
  importFn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { retries, delay, backoff } = { ...DEFAULT_RETRY_OPTIONS, ...options }

  return new Promise<T>((resolve, reject) => {
    let attempt = 0

    const tryImport = async () => {
      try {
        const module = await importFn()
        resolve(module)
      } catch (error) {
        attempt++
        if (attempt <= (retries || 3)) {
          const waitTime = (delay || 1000) * Math.pow(backoff || 2, attempt - 1)
          await new Promise((r) => setTimeout(r, waitTime))
          tryImport()
        } else {
          reject(error)
        }
      }
    }

    tryImport()
  })
}

/**
 * Preload a module without rendering it.
 * Call this on hover/focus to start loading before navigation.
 */
export function preloadComponent(importFn: () => Promise<{ default: ComponentType<any> }>): void {
  importFn().catch(() => {
    // Silently fail - component will be loaded normally when needed
  })
}

/**
 * Preload multiple modules in parallel
 */
export function preloadModules(importFns: Array<() => Promise<unknown>>): void {
  importFns.forEach((fn) => {
    fn().catch(() => {
      // Silently handle preload failures
    })
  })
}

/**
 * Create a prefetchable route config.
 * Returns a function that prefetches the route's component.
 */
export function createPrefetchableRoute(importFn: () => Promise<{ default: ComponentType<any> }>) {
  let prefetched = false

  return {
    prefetch: () => {
      if (!prefetched) {
        prefetched = true
        preloadComponent(importFn)
      }
    },
    load: () => dynamicImport(importFn),
    isPrefetched: () => prefetched,
  }
}

/**
 * Route-based code splitting map.
 * Define routes and their component loaders for prefetching.
 */
export interface RouteConfig {
  path: string
  loader: () => Promise<{ default: ComponentType<any> }>
  preload?: boolean
}

/**
 * Prefetch routes that are likely to be navigated to next
 */
export function prefetchAdjacentRoutes(
  currentPath: string,
  routes: RouteConfig[]
): void {
  // Simple heuristic: prefetch routes that share a prefix with current
  const segments = currentPath.split('/').filter(Boolean)
  const prefix = segments.slice(0, -1).join('/')

  const adjacentRoutes = routes.filter((route) => {
    if (route.path === currentPath) return false
    return route.path.startsWith(`/${prefix}`) || route.preload
  })

  adjacentRoutes.forEach((route) => {
    preloadComponent(route.loader)
  })
}
