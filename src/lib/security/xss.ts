/**
 * XSS sanitization functions.
 * Prevents cross-site scripting attacks by sanitizing user input.
 */

/** HTML entities for escaping */
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
}

/** Patterns that indicate potential XSS attacks */
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /on\w+\s*=\s*["'][^"']*["']/gi,
  /on\w+\s*=\s*[^\s>]*/gi,
  /javascript\s*:/gi,
  /vbscript\s*:/gi,
  /data\s*:\s*text\/html/gi,
  /expression\s*\(/gi,
  /url\s*\(\s*["']?\s*javascript/gi,
  /<iframe[^>]*>/gi,
  /<object[^>]*>/gi,
  /<embed[^>]*>/gi,
  /<link[^>]*>/gi,
  /<meta[^>]*>/gi,
  /<base[^>]*>/gi,
]

/**
 * Escape HTML entities to prevent XSS
 */
export function escapeHTML(input: string): string {
  return input.replace(/[&<>"'\/`]/g, (char) => HTML_ENTITIES[char] || char)
}

/**
 * Escape user input for safe display
 */
export function escapeUserInput(input: string): string {
  if (!input || typeof input !== 'string') return ''
  return escapeHTML(input.trim())
}

/**
 * Remove potentially dangerous HTML while keeping safe content
 */
export function sanitizeHTML(input: string): string {
  if (!input || typeof input !== 'string') return ''

  let sanitized = input

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '')

  // Remove javascript: and vbscript: URLs
  sanitized = sanitized.replace(/javascript\s*:/gi, '')
  sanitized = sanitized.replace(/vbscript\s*:/gi, '')

  // Remove data:text/html URIs
  sanitized = sanitized.replace(/data\s*:\s*text\/html[^"']*/gi, '')

  // Remove dangerous tags
  sanitized = sanitized.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
  sanitized = sanitized.replace(/<object[^>]*>.*?<\/object>/gi, '')
  sanitized = sanitized.replace(/<embed[^>]*\/?>/gi, '')
  sanitized = sanitized.replace(/<base[^>]*\/?>/gi, '')

  return sanitized.trim()
}

/**
 * Check if a string contains potential XSS patterns
 */
export function containsXSS(input: string): boolean {
  if (!input || typeof input !== 'string') return false
  return XSS_PATTERNS.some((pattern) => pattern.test(input))
}

/**
 * Recursively sanitize all string values in an object
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj

  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = escapeUserInput(value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) => {
        if (typeof item === 'string') return escapeUserInput(item)
        if (typeof item === 'object' && item !== null) {
          return sanitizeObject(item as Record<string, unknown>)
        }
        return item
      })
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}

/**
 * Sanitize a URL to prevent javascript: and data: protocol attacks
 */
export function sanitizeURL(url: string): string {
  if (!url || typeof url !== 'string') return ''

  const trimmed = url.trim().toLowerCase()

  // Block dangerous protocols
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('vbscript:') ||
    trimmed.startsWith('data:text/html')
  ) {
    return ''
  }

  // Allow relative URLs, http, https, mailto, tel
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return url.trim()
  }

  // Default: prepend https:// if no protocol
  if (!trimmed.includes('://')) {
    return `https://${url.trim()}`
  }

  return ''
}
