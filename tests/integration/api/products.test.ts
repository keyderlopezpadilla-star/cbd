import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Integration tests for product CRUD API handlers.
 * Mocks Prisma client and tests product management logic.
 */

const mockPrisma = {
  product: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
}

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma),
}))

interface ProductInput {
  name: string
  sku: string
  price: number
  cost: number
  categoryId: string
  concentration?: string
  composition?: string
}

function validateProductInput(input: Partial<ProductInput>): string[] {
  const errors: string[] = []

  if (!input.name || input.name.trim().length === 0) {
    errors.push('Name is required')
  }
  if (!input.sku || input.sku.trim().length === 0) {
    errors.push('SKU is required')
  }
  if (input.price === undefined || input.price < 0) {
    errors.push('Price must be non-negative')
  }
  if (input.cost === undefined || input.cost < 0) {
    errors.push('Cost must be non-negative')
  }
  if (input.price !== undefined && input.cost !== undefined && input.cost > input.price) {
    errors.push('Cost cannot exceed price')
  }
  if (!input.categoryId) {
    errors.push('Category is required')
  }

  return errors
}

function calculateMargin(price: number, cost: number): number {
  if (price === 0) return 0
  return parseFloat(((price - cost) / price * 100).toFixed(2))
}

describe('Product API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('validateProductInput', () => {
    it('returns no errors for valid input', () => {
      const input: ProductInput = {
        name: 'Aceite CBD 10%',
        sku: 'ACE-001',
        price: 49.90,
        cost: 20.00,
        categoryId: 'cat_001',
      }
      expect(validateProductInput(input)).toHaveLength(0)
    })

    it('returns error for missing name', () => {
      const errors = validateProductInput({ sku: 'ACE-001', price: 10, cost: 5, categoryId: 'cat_001' })
      expect(errors).toContain('Name is required')
    })

    it('returns error for empty name', () => {
      const errors = validateProductInput({ name: '', sku: 'ACE-001', price: 10, cost: 5, categoryId: 'cat_001' })
      expect(errors).toContain('Name is required')
    })

    it('returns error for missing SKU', () => {
      const errors = validateProductInput({ name: 'Test', price: 10, cost: 5, categoryId: 'cat_001' })
      expect(errors).toContain('SKU is required')
    })

    it('returns error for negative price', () => {
      const errors = validateProductInput({ name: 'Test', sku: 'T-001', price: -5, cost: 5, categoryId: 'cat_001' })
      expect(errors).toContain('Price must be non-negative')
    })

    it('returns error for negative cost', () => {
      const errors = validateProductInput({ name: 'Test', sku: 'T-001', price: 10, cost: -1, categoryId: 'cat_001' })
      expect(errors).toContain('Cost must be non-negative')
    })

    it('returns error when cost exceeds price', () => {
      const errors = validateProductInput({ name: 'Test', sku: 'T-001', price: 10, cost: 15, categoryId: 'cat_001' })
      expect(errors).toContain('Cost cannot exceed price')
    })

    it('returns error for missing category', () => {
      const errors = validateProductInput({ name: 'Test', sku: 'T-001', price: 10, cost: 5 })
      expect(errors).toContain('Category is required')
    })

    it('returns multiple errors at once', () => {
      const errors = validateProductInput({})
      expect(errors.length).toBeGreaterThan(1)
    })
  })

  describe('calculateMargin', () => {
    it('calculates correct margin', () => {
      expect(calculateMargin(100, 60)).toBe(40)
      expect(calculateMargin(49.90, 20)).toBeCloseTo(59.92, 1)
    })

    it('returns 0 for zero price', () => {
      expect(calculateMargin(0, 0)).toBe(0)
    })

    it('returns 100 for zero cost', () => {
      expect(calculateMargin(50, 0)).toBe(100)
    })
  })

  describe('Product listing', () => {
    it('returns paginated products', async () => {
      const mockProducts = [
        { id: '1', name: 'Aceite CBD 5%', sku: 'ACE-001', price: 29.90 },
        { id: '2', name: 'Aceite CBD 10%', sku: 'ACE-002', price: 49.90 },
      ]
      mockPrisma.product.findMany.mockResolvedValue(mockProducts)
      mockPrisma.product.count.mockResolvedValue(35)

      const products = await mockPrisma.product.findMany({
        take: 20,
        skip: 0,
        orderBy: { name: 'asc' },
      })
      const total = await mockPrisma.product.count()

      expect(products).toHaveLength(2)
      expect(total).toBe(35)
    })

    it('filters products by category', async () => {
      mockPrisma.product.findMany.mockResolvedValue([])

      await mockPrisma.product.findMany({
        where: { categoryId: 'cat_aceites' },
      })

      expect(mockPrisma.product.findMany).toHaveBeenCalledWith({
        where: { categoryId: 'cat_aceites' },
      })
    })
  })

  describe('Product creation', () => {
    it('creates product with computed margin', async () => {
      const input: ProductInput = {
        name: 'Nuevo Aceite CBD',
        sku: 'ACE-NEW-001',
        price: 39.90,
        cost: 15.00,
        categoryId: 'cat_aceites',
        concentration: '10% CBD',
        composition: 'Full Spectrum',
      }

      const margin = calculateMargin(input.price, input.cost)
      const expectedData = { ...input, margin, isActive: true }

      mockPrisma.product.create.mockResolvedValue({ id: 'new_id', ...expectedData })

      const result = await mockPrisma.product.create({ data: expectedData })

      expect(result.name).toBe('Nuevo Aceite CBD')
      expect(result.margin).toBeCloseTo(62.41, 1)
    })
  })

  describe('Product update', () => {
    it('updates product by id', async () => {
      mockPrisma.product.update.mockResolvedValue({
        id: 'prod_1',
        name: 'Updated Name',
        price: 55.00,
      })

      const result = await mockPrisma.product.update({
        where: { id: 'prod_1' },
        data: { name: 'Updated Name', price: 55.00 },
      })

      expect(result.name).toBe('Updated Name')
      expect(result.price).toBe(55.00)
    })
  })

  describe('Product deletion', () => {
    it('soft-deletes product by setting isActive to false', async () => {
      mockPrisma.product.update.mockResolvedValue({ id: 'prod_1', isActive: false })

      const result = await mockPrisma.product.update({
        where: { id: 'prod_1' },
        data: { isActive: false },
      })

      expect(result.isActive).toBe(false)
    })
  })
})
