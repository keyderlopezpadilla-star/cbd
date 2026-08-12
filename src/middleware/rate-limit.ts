/**
 * Next.js middleware integration for rate limiting on API routes.
 */

import { NextRequest, NextResponse } from 'next/server'
import { apiRateLimiter, authRateLimiter } from '@/lib/security/rate-limiter'

/**
 * Get client IP from request headers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  const realIP = request.headers.get('x-real-ip')
  if (realIP) return realIP

  return '127.0.0.1'
}

/**
 * Rate limit middleware for API routes
 */
export function rateLimitMiddleware(request: NextRequest): NextResponse | null {
  const ip = getClientIP(request)
  const pathname = request.nextUrl.pathname

  // Use stricter rate limiter for auth routes
  const isAuthRoute = pathname.startsWith('/api/auth')
  const limiter = isAuthRoute ? authRateLimiter : apiRateLimiter
  const route = isAuthRoute ? '/api/auth' : pathname

  const result = limiter.check(ip, route)

  if (!result.allowed) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: result.retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(result.retryAfter || 60),
          'X-RateLimit-Limit': String(isAuthRoute ? 5 : 100),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(result.resetAt),
        },
      }
    )
  }

  // Add rate limit headers to successful responses
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Remaining', String(result.remaining))
  response.headers.set('X-RateLimit-Reset', String(result.resetAt))

  return null // Allow request to proceed
}
