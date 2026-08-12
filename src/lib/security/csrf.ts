/**
 * CSRF token generation and validation.
 * Uses double-submit cookie pattern.
 */

import { randomBytes, createHmac } from 'crypto'

const CSRF_SECRET = process.env.CSRF_SECRET || 'csrf-secret-change-in-production'
const TOKEN_EXPIRY_MS = 60 * 60 * 1000 // 1 hour

interface CSRFToken {
  token: string
  expires: number
}

/**
 * Generate a CSRF token with expiration
 */
export function generateCSRFToken(): CSRFToken {
  const random = randomBytes(32).toString('hex')
  const expires = Date.now() + TOKEN_EXPIRY_MS
  const data = `${random}:${expires}`
  const signature = createHmac('sha256', CSRF_SECRET).update(data).digest('hex')
  const token = `${data}:${signature}`

  return {
    token: Buffer.from(token).toString('base64url'),
    expires,
  }
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const parts = decoded.split(':')

    if (parts.length !== 3) return false

    const [random, expiresStr, signature] = parts
    const expires = parseInt(expiresStr, 10)

    // Check expiration
    if (Date.now() > expires) return false

    // Verify signature
    const data = `${random}:${expiresStr}`
    const expectedSignature = createHmac('sha256', CSRF_SECRET).update(data).digest('hex')

    // Timing-safe comparison
    if (signature.length !== expectedSignature.length) return false

    let result = 0
    for (let i = 0; i < signature.length; i++) {
      result |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i)
    }

    return result === 0
  } catch {
    return false
  }
}

/**
 * Get CSRF token from request headers
 */
export function getCSRFTokenFromHeaders(headers: Headers): string | null {
  return (
    headers.get('x-csrf-token') ||
    headers.get('x-xsrf-token') ||
    null
  )
}

/**
 * Double submit cookie pattern: generate token and set cookie value
 */
export function createCSRFCookie(): { token: string; cookieValue: string } {
  const { token } = generateCSRFToken()
  return {
    token,
    cookieValue: token,
  }
}
