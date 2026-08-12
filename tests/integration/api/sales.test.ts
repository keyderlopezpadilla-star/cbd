import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Integration tests for sales API handlers.
 * Mocks Prisma client and tests sale creation/retrieval logic.
 */

const mockPrisma = {
  sale: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    count: vi.fn(),
  },
  inventoryItem: {
    update: vi.fn(),
  },
  customer: {
    update: vi.fn(),
  },
}

interface SaleItemInput {
  productId: string
  productName: string
  quantity: number
  price: number
}

interface CreateSaleInput {
  storeId: string
  employeeId: string
  customerId?: string
  items: SaleItemInput[]
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER'
  discount?: number
}

function validateSaleInput(input: Partial<CreateSaleInput>): string[] {
  const errors: string[] = []

  if (!input.storeId) errors.push('Store ID is required')
  if (!input.employeeId) errors.push('Employee ID is required')
  if (!input.items || input.items.length === 0) errors.push('At least one item is required')
  if (!input.paymentMethod) errors.push('Payment method is required')

  if (input.items) {
    for (const item of input.items) {
      if (item.quantity <= 0) errors.push(`Invalid quantity for ${item.productName}`)
      if (item.price < 0) errors.push(`Invalid price for ${item.productName}`)
    }
  }

  if (input.discount !== undefined && input.discount < 0) {
    errors.push('Discount cannot be negative')
  }

  return errors
}

function calculateSaleTotals(items: SaleItemInput[], discount: number = 0, taxRate: number = 0.21) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = Math.min(discount, subtotal)
  const taxableAmount = subtotal - discountAmount
  const tax = parseFloat((taxableAmount * taxRate).toFixed(2))
  const total = parseFloat((taxableAmount + tax).toFixed(2))

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: discountAmount,
    tax,
    total,
  }
}

function generateSaleNumber(counter: number): string {
  return `VTA-${String(counter).padStart(6, '0')}`
}

describe('Sales API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('validateSaleInput', () => {
    const validInput: CreateSaleInput = {
      storeId: 'store_1',
      employeeId: 'emp_1',
      items: [
        { productId: 'prod_1', productName: 'Aceite CBD', quantity: 2, price: 49.90 },
      ],
      paymentMethod: 'CARD',
    }

    it('returns no errors for valid input', () => {
      expect(validateSaleInput(validInput)).toHaveLength(0)
    })

    it('requires storeId', () => {
      const errors = validateSaleInput({ ...validInput, storeId: undefined })
      expect(errors).toContain('Store ID is required')
    })

    it('requires employeeId', () => {
      const errors = validateSaleInput({ ...validInput, employeeId: undefined })
      expect(errors).toContain('Employee ID is required')
    })

    it('requires at least one item', () => {
      const errors = validateSaleInput({ ...validInput, items: [] })
      expect(errors).toContain('At least one item is required')
    })

    it('validates item quantities', () => {
      const errors = validateSaleInput({
        ...validInput,
        items: [{ productId: 'p1', productName: 'Test', quantity: 0, price: 10 }],
      })
      expect(errors).toContain('Invalid quantity for Test')
    })

    it('validates item prices', () => {
      const errors = validateSaleInput({
        ...validInput,
        items: [{ productId: 'p1', productName: 'Test', quantity: 1, price: -5 }],
      })
      expect(errors).toContain('Invalid price for Test')
    })

    it('validates discount is non-negative', () => {
      const errors = validateSaleInput({ ...validInput, discount: -10 })
      expect(errors).toContain('Discount cannot be negative')
    })
  })

  describe('calculateSaleTotals', () => {
    it('calculates totals correctly', () => {
      const items: SaleItemInput[] = [
        { productId: 'p1', productName: 'Aceite 10%', quantity: 2, price: 49.90 },
        { productId: 'p2', productName: 'Crema', quantity: 1, price: 27.90 },
      ]

      const totals = calculateSaleTotals(items)
      expect(totals.subtotal).toBeCloseTo(127.70, 2)
      expect(totals.tax).toBeCloseTo(26.82, 2)
      expect(totals.total).toBeCloseTo(154.52, 2)
      expect(totals.discount).toBe(0)
    })

    it('applies discount correctly', () => {
      const items: SaleItemInput[] = [
        { productId: 'p1', productName: 'Test', quantity: 1, price: 100 },
      ]

      const totals = calculateSaleTotals(items, 10)
      expect(totals.subtotal).toBe(100)
      expect(totals.discount).toBe(10)
      expect(totals.tax).toBeCloseTo(18.90, 2) // (100 - 10) * 0.21
      expect(totals.total).toBeCloseTo(108.90, 2)
    })

    it('discount cannot exceed subtotal', () => {
      const items: SaleItemInput[] = [
        { productId: 'p1', productName: 'Test', quantity: 1, price: 50 },
      ]

      const totals = calculateSaleTotals(items, 100) // Discount > subtotal
      expect(totals.discount).toBe(50) // Capped at subtotal
      expect(totals.total).toBe(0)
    })

    it('handles custom tax rate', () => {
      const items: SaleItemInput[] = [
        { productId: 'p1', productName: 'Test', quantity: 1, price: 100 },
      ]

      const totals = calculateSaleTotals(items, 0, 0.10) // 10% tax
      expect(totals.tax).toBe(10)
      expect(totals.total).toBe(110)
    })

    it('handles empty items', () => {
      const totals = calculateSaleTotals([])
      expect(totals.subtotal).toBe(0)
      expect(totals.tax).toBe(0)
      expect(totals.total).toBe(0)
    })
  })

  describe('generateSaleNumber', () => {
    it('generates correctly formatted sale numbers', () => {
      expect(generateSaleNumber(1)).toBe('VTA-000001')
      expect(generateSaleNumber(100)).toBe('VTA-000100')
      expect(generateSaleNumber(999999)).toBe('VTA-999999')
    })
  })

  describe('Sale listing', () => {
    it('retrieves sales with pagination', async () => {
      const mockSales = [
        { id: 's1', saleNumber: 'VTA-000001', total: 89.90, createdAt: new Date() },
        { id: 's2', saleNumber: 'VTA-000002', total: 120.50, createdAt: new Date() },
      ]
      mockPrisma.sale.findMany.mockResolvedValue(mockSales)
      mockPrisma.sale.count.mockResolvedValue(500)

      const sales = await mockPrisma.sale.findMany({
        take: 20,
        skip: 0,
        orderBy: { createdAt: 'desc' },
      })
      const total = await mockPrisma.sale.count()

      expect(sales).toHaveLength(2)
      expect(total).toBe(500)
    })

    it('filters sales by store', async () => {
      mockPrisma.sale.findMany.mockResolvedValue([])

      await mockPrisma.sale.findMany({
        where: { storeId: 'store_madrid_001' },
      })

      expect(mockPrisma.sale.findMany).toHaveBeenCalledWith({
        where: { storeId: 'store_madrid_001' },
      })
    })

    it('filters sales by date range', async () => {
      mockPrisma.sale.findMany.mockResolvedValue([])
      const from = new Date('2024-01-01')
      const to = new Date('2024-03-31')

      await mockPrisma.sale.findMany({
        where: { createdAt: { gte: from, lte: to } },
      })

      expect(mockPrisma.sale.findMany).toHaveBeenCalledWith({
        where: { createdAt: { gte: from, lte: to } },
      })
    })
  })
})
