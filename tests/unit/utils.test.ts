import { describe, it, expect } from 'vitest'
import {
  cn,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatPercentage,
  calculatePercentageChange,
  truncateText,
  slugify,
  generateSKU,
} from '@/lib/utils'

describe('cn (className merger)', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'active')).toBe('base active')
  })

  it('merges tailwind classes properly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })
})

describe('formatCurrency', () => {
  it('formats EUR by default', () => {
    const result = formatCurrency(29.90)
    expect(result).toContain('29,90')
    expect(result).toContain('€')
  })

  it('formats zero correctly', () => {
    const result = formatCurrency(0)
    expect(result).toContain('0,00')
  })

  it('formats large numbers with separators', () => {
    const result = formatCurrency(1250.50)
    expect(result).toContain('1.250,50')
  })

  it('accepts custom currency', () => {
    const result = formatCurrency(10, 'USD')
    expect(result).toContain('10,00')
  })
})

describe('formatDate', () => {
  it('formats Date object', () => {
    const result = formatDate(new Date('2024-03-15'))
    expect(result).toContain('2024')
    expect(result).toContain('marzo')
  })

  it('formats string date', () => {
    const result = formatDate('2024-01-01')
    expect(result).toContain('enero')
    expect(result).toContain('2024')
  })
})

describe('formatDateTime', () => {
  it('formats date with time', () => {
    const result = formatDateTime(new Date('2024-06-15T14:30:00'))
    expect(result).toContain('2024')
    expect(result).toContain('junio')
    expect(result).toContain('14:30')
  })
})

describe('formatPercentage', () => {
  it('formats percentage with 2 decimal places', () => {
    expect(formatPercentage(45.678)).toBe('45.68%')
  })

  it('formats zero', () => {
    expect(formatPercentage(0)).toBe('0.00%')
  })

  it('formats negative percentages', () => {
    expect(formatPercentage(-12.5)).toBe('-12.50%')
  })
})

describe('calculatePercentageChange', () => {
  it('calculates positive change', () => {
    expect(calculatePercentageChange(150, 100)).toBe(50)
  })

  it('calculates negative change', () => {
    expect(calculatePercentageChange(75, 100)).toBe(-25)
  })

  it('handles zero previous value', () => {
    expect(calculatePercentageChange(100, 0)).toBe(100)
    expect(calculatePercentageChange(0, 0)).toBe(0)
  })

  it('returns 0 for no change', () => {
    expect(calculatePercentageChange(100, 100)).toBe(0)
  })
})

describe('truncateText', () => {
  it('truncates long text', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...')
  })

  it('does not truncate short text', () => {
    expect(truncateText('Hi', 5)).toBe('Hi')
  })

  it('handles exact length', () => {
    expect(truncateText('Hello', 5)).toBe('Hello')
  })

  it('handles empty string', () => {
    expect(truncateText('', 5)).toBe('')
  })
})

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('CBD Products & More!')).toBe('cbd-products--more')
  })

  it('handles multiple spaces', () => {
    expect(slugify('  hello   world  ')).toBe('hello-world')
  })

  it('handles already slugified text', () => {
    expect(slugify('already-slugified')).toBe('already-slugified')
  })

  it('converts uppercase to lowercase', () => {
    expect(slugify('HELLO')).toBe('hello')
  })
})

describe('generateSKU', () => {
  it('generates SKU with prefix', () => {
    const sku = generateSKU('CBD')
    expect(sku).toMatch(/^CBD-[A-Z0-9]{8}$/)
  })

  it('generates unique SKUs', () => {
    const sku1 = generateSKU('TEST')
    const sku2 = generateSKU('TEST')
    expect(sku1).not.toBe(sku2)
  })

  it('respects custom length', () => {
    const sku = generateSKU('X', 4)
    expect(sku).toMatch(/^X-[A-Z0-9]{4}$/)
  })

  it('uppercases the prefix', () => {
    const sku = generateSKU('abc')
    expect(sku.startsWith('ABC-')).toBe(true)
  })
})
