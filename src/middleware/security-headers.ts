/**
 * Middleware that applies security headers to all responses.
 */

import { NextRequest, NextResponse } from 'next/server'
import { SECURITY_HEADERS } from '@/lib/security/headers'

/**
 * Apply security headers middleware
 */
export function securityHeadersMiddleware(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  // Apply all security headers
  for (const header of SECURITY_HEADERS) {
    response.headers.set(header.key, header.value)
  }

  // Remove potentially sensitive headers
  response.headers.delete('X-Powered-By')
  response.headers.delete('Server')

  return response
}

/**
 * Get nonce for inline scripts (CSP)
 */
export function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Buffer.from(array).toString('base64')
}
