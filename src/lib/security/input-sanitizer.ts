/**
 * Input validation and sanitization middleware utilities.
 * Protects against injection attacks and malformed input.
 */

/**
 * Trim all string values in an object
 */
export function trimStrings<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = value.trim()
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'string' ? item.trim() : item
      )
    } else if (typeof value === 'object' && value !== null) {
      result[key] = trimStrings(value as Record<string, unknown>)
    } else {
      result[key] = value
    }
  }

  return result as T
}

/**
 * Remove null bytes from strings (prevents null byte injection)
 */
export function removeNullBytes(input: string): string {
  return input.replace(/\0/g, '')
}

/**
 * Remove null bytes from all string values in an object
 */
export function removeNullBytesDeep<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = removeNullBytes(value)
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'string' ? removeNullBytes(item) : item
      )
    } else if (typeof value === 'object' && value !== null) {
      result[key] = removeNullBytesDeep(value as Record<string, unknown>)
    } else {
      result[key] = value
    }
  }

  return result as T
}

/**
 * Validate Content-Type header matches expected value
 */
export function validateContentType(
  contentType: string | null,
  expected: string = 'application/json'
): boolean {
  if (!contentType) return false
  return contentType.toLowerCase().includes(expected.toLowerCase())
}

/**
 * Sanitize query parameters by removing potentially dangerous characters
 */
export function sanitizeQueryParams(
  params: Record<string, string | string[]>
): Record<string, string | string[]> {
  const sanitized: Record<string, string | string[]> = {}
  const dangerousChars = /[<>{}|\\^~\[\]`]/g

  for (const [key, value] of Object.entries(params)) {
    const sanitizedKey = key.replace(dangerousChars, '')

    if (Array.isArray(value)) {
      sanitized[sanitizedKey] = value.map((v) =>
        v.replace(dangerousChars, '').trim()
      )
    } else {
      sanitized[sanitizedKey] = value.replace(dangerousChars, '').trim()
    }
  }

  return sanitized
}

/**
 * Validate and sanitize email address
 */
export function sanitizeEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(trimmed)) return null
  if (trimmed.length > 254) return null

  return trimmed
}

/**
 * Validate numeric string input
 */
export function sanitizeNumericInput(input: string, options?: {
  min?: number
  max?: number
  allowFloat?: boolean
}): number | null {
  const trimmed = input.trim()

  if (options?.allowFloat) {
    const num = parseFloat(trimmed)
    if (isNaN(num)) return null
    if (options.min !== undefined && num < options.min) return null
    if (options.max !== undefined && num > options.max) return null
    return num
  }

  const num = parseInt(trimmed, 10)
  if (isNaN(num)) return null
  if (options?.min !== undefined && num < options.min) return null
  if (options?.max !== undefined && num > options.max) return null
  return num
}

/**
 * Sanitize file path to prevent path traversal
 */
export function sanitizePath(inputPath: string): string {
  return inputPath
    .replace(/\.\.\//g, '') // Remove ../
    .replace(/\.\.\\/g, '') // Remove ..\
    .replace(/\/\//g, '/') // Remove double slashes
    .replace(/^\/+/, '') // Remove leading slashes
    .trim()
}

/**
 * Validate request body size
 */
export function validateBodySize(body: string | Buffer, maxSizeBytes: number = 1024 * 1024): boolean {
  const size = typeof body === 'string' ? Buffer.byteLength(body) : body.length
  return size <= maxSizeBytes
}

/**
 * Comprehensive input sanitization pipeline
 */
export function sanitizeInput<T extends Record<string, unknown>>(input: T): T {
  let result = trimStrings(input)
  result = removeNullBytesDeep(result)
  return result
}
