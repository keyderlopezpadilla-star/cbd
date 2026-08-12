/**
 * In-memory rate limiter with sliding window algorithm.
 * Configurable limits per route and IP address.
 */

interface RateLimitEntry {
  timestamps: number[]
  blocked: boolean
  blockedUntil?: number
}

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number
  /** Window size in milliseconds */
  windowMs: number
  /** Block duration in milliseconds after limit is exceeded */
  blockDurationMs?: number
  /** Custom key generator function */
  keyGenerator?: (identifier: string, route: string) => string
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
  retryAfter?: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
  blockDurationMs: 60 * 1000, // 1 minute block
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map()
  private config: RateLimitConfig
  private cleanupInterval: ReturnType<typeof setInterval> | null = null

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    // Auto-cleanup every 5 minutes to prevent memory leaks
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  /**
   * Check if a request should be allowed
   */
  check(identifier: string, route: string = '/'): RateLimitResult {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(identifier, route)
      : `${identifier}:${route}`

    const now = Date.now()
    const entry = this.store.get(key) || { timestamps: [], blocked: false }

    // Check if currently blocked
    if (entry.blocked && entry.blockedUntil && now < entry.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.blockedUntil,
        retryAfter: Math.ceil((entry.blockedUntil - now) / 1000),
      }
    }

    // Clear block if expired
    if (entry.blocked && entry.blockedUntil && now >= entry.blockedUntil) {
      entry.blocked = false
      entry.blockedUntil = undefined
      entry.timestamps = []
    }

    // Remove timestamps outside the window
    const windowStart = now - this.config.windowMs
    entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart)

    // Check if limit exceeded
    if (entry.timestamps.length >= this.config.maxRequests) {
      entry.blocked = true
      entry.blockedUntil = now + (this.config.blockDurationMs || this.config.windowMs)
      this.store.set(key, entry)

      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.blockedUntil,
        retryAfter: Math.ceil((entry.blockedUntil - now) / 1000),
      }
    }

    // Allow request and record timestamp
    entry.timestamps.push(now)
    this.store.set(key, entry)

    const remaining = this.config.maxRequests - entry.timestamps.length
    const resetAt = now + this.config.windowMs

    return {
      allowed: true,
      remaining,
      resetAt,
    }
  }

  /**
   * Reset the rate limit for a specific identifier
   */
  reset(identifier: string, route: string = '/'): void {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(identifier, route)
      : `${identifier}:${route}`
    this.store.delete(key)
  }

  /**
   * Get current request count for an identifier
   */
  getCount(identifier: string, route: string = '/'): number {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(identifier, route)
      : `${identifier}:${route}`
    const entry = this.store.get(key)
    if (!entry) return 0

    const windowStart = Date.now() - this.config.windowMs
    return entry.timestamps.filter((ts) => ts > windowStart).length
  }

  /**
   * Remove expired entries to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    for (const [key, entry] of this.store.entries()) {
      const validTimestamps = entry.timestamps.filter((ts) => ts > windowStart)

      if (validTimestamps.length === 0 && (!entry.blocked || (entry.blockedUntil && now >= entry.blockedUntil))) {
        this.store.delete(key)
      } else {
        entry.timestamps = validTimestamps
      }
    }
  }

  /**
   * Destroy the rate limiter and clear cleanup interval
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.store.clear()
  }
}

// Pre-configured rate limiters for common use cases
export const apiRateLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60 * 1000, // 100 req/min
  blockDurationMs: 60 * 1000,
})

export const authRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 5 attempts per 15 min
  blockDurationMs: 30 * 60 * 1000, // 30 min block
})

export const uploadRateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000, // 10 uploads/min
  blockDurationMs: 5 * 60 * 1000,
})

export { RateLimiter }
export type { RateLimitConfig, RateLimitResult }
