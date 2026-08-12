/**
 * In-memory LRU cache with TTL, request deduplication,
 * and stale-while-revalidate pattern.
 */

interface CacheEntry<T> {
  value: T
  createdAt: number
  expiresAt: number
}

interface CacheOptions {
  /** Maximum number of entries */
  maxSize: number
  /** Default TTL in milliseconds */
  defaultTTL: number
  /** Stale-while-revalidate window in milliseconds */
  staleWhileRevalidate?: number
}

const DEFAULT_OPTIONS: CacheOptions = {
  maxSize: 1000,
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  staleWhileRevalidate: 60 * 1000, // 1 minute
}

class LRUCache<T = unknown> {
  private cache: Map<string, CacheEntry<T>> = new Map()
  private options: CacheOptions
  private pendingRequests: Map<string, Promise<T>> = new Map()

  constructor(options: Partial<CacheOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
  }

  /**
   * Get a value from cache
   */
  get(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) return null

    const now = Date.now()

    // Check if expired
    if (now > entry.expiresAt) {
      // Check stale-while-revalidate window
      const staleWindow = this.options.staleWhileRevalidate || 0
      if (now > entry.expiresAt + staleWindow) {
        this.cache.delete(key)
        return null
      }
      // Return stale data (caller should trigger revalidation)
    }

    // Move to end (most recently used)
    this.cache.delete(key)
    this.cache.set(key, entry)

    return entry.value
  }

  /**
   * Set a value in cache
   */
  set(key: string, value: T, ttl?: number): void {
    const actualTTL = ttl || this.options.defaultTTL
    const now = Date.now()

    // Evict if at max size
    if (this.cache.size >= this.options.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      value,
      createdAt: now,
      expiresAt: now + actualTTL,
    })
  }

  /**
   * Delete a value from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    return Date.now() <= entry.expiresAt
  }

  /**
   * Check if a key is stale (expired but within revalidation window)
   */
  isStale(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    const now = Date.now()
    return now > entry.expiresAt
  }

  /**
   * Get or fetch with request deduplication.
   * Multiple concurrent requests for the same key will share one fetch.
   */
  async getOrFetch(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> {
    // Check cache first
    const cached = this.get(key)
    if (cached !== null && !this.isStale(key)) {
      return cached
    }

    // Check if there's already a pending request
    const pending = this.pendingRequests.get(key)
    if (pending) return pending

    // Create new request
    const request = fetcher()
      .then((value) => {
        this.set(key, value, ttl)
        return value
      })
      .finally(() => {
        this.pendingRequests.delete(key)
      })

    this.pendingRequests.set(key, request)
    return request
  }

  /**
   * Stale-while-revalidate pattern.
   * Returns stale data immediately while fetching fresh data in background.
   */
  async swr(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get(key)

    if (cached !== null) {
      // If stale, trigger background revalidation
      if (this.isStale(key)) {
        this.getOrFetch(key, fetcher, ttl).catch(() => {
          // Silently handle background revalidation errors
        })
      }
      return cached
    }

    // No cached data, must fetch
    return this.getOrFetch(key, fetcher, ttl)
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
    this.pendingRequests.clear()
  }

  /**
   * Get cache statistics
   */
  stats(): { size: number; maxSize: number; pending: number } {
    return {
      size: this.cache.size,
      maxSize: this.options.maxSize,
      pending: this.pendingRequests.size,
    }
  }

  /**
   * Remove all expired entries
   */
  prune(): number {
    const now = Date.now()
    let removed = 0
    const staleWindow = this.options.staleWhileRevalidate || 0

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt + staleWindow) {
        this.cache.delete(key)
        removed++
      }
    }

    return removed
  }
}

// Global cache instances
export const queryCache = new LRUCache({ maxSize: 500, defaultTTL: 30 * 1000 })
export const dataCache = new LRUCache({ maxSize: 1000, defaultTTL: 5 * 60 * 1000 })
export const apiCache = new LRUCache({ maxSize: 200, defaultTTL: 60 * 1000 })

export { LRUCache }
export type { CacheOptions }
