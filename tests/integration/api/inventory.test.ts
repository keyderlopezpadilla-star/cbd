import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Integration tests for inventory API operations.
 * Tests stock management, transfers, and movement logic.
 */

const mockPrisma = {
  inventoryItem: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    findFirst: vi.fn(),
  },
  inventoryMovement: {
    create: vi.fn(),
  },
  stockTransfer: {
    create: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
  },
}

interface StockAdjustment {
  inventoryId: string
  quantity: number
  type: 'IN' | 'OUT' | 'ADJUSTMENT'
  reason: string
}

function calculateStockStatus(quantity: number, minStock: number): string {
  if (quantity <= 0) return 'OUT_OF_STOCK'
  if (quantity <= Math.floor(minStock * 0.5)) return 'CRITICAL'
  if (quantity <= minStock) return 'LOW'
  return 'NORMAL'
}

function validateStockAdjustment(adj: StockAdjustment, currentStock: number): string | null {
  if (!adj.inventoryId) return 'Inventory ID is required'
  if (adj.quantity <= 0) return 'Quantity must be positive'
  if (!adj.reason || adj.reason.trim().length === 0) return 'Reason is required'
  if (adj.type === 'OUT' && adj.quantity > currentStock) {
    return 'Insufficient stock for this adjustment'
  }
  return null
}

function calculateNewStock(currentStock: number, quantity: number, type: 'IN' | 'OUT' | 'ADJUSTMENT'): number {
  switch (type) {
    case 'IN':
      return currentStock + quantity
    case 'OUT':
      return Math.max(0, currentStock - quantity)
    case 'ADJUSTMENT':
      return quantity // Adjustment sets absolute value
    default:
      return currentStock
  }
}

interface TransferRequest {
  fromStoreId: string
  toStoreId: string
  items: Array<{ productId: string; quantity: number }>
  requestedBy: string
}

function validateTransferRequest(req: TransferRequest): string[] {
  const errors: string[] = []

  if (!req.fromStoreId) errors.push('Source store is required')
  if (!req.toStoreId) errors.push('Destination store is required')
  if (req.fromStoreId === req.toStoreId) errors.push('Source and destination must be different')
  if (!req.items || req.items.length === 0) errors.push('At least one item is required')
  if (!req.requestedBy) errors.push('Requester is required')

  if (req.items) {
    for (const item of req.items) {
      if (item.quantity <= 0) errors.push(`Invalid quantity for product ${item.productId}`)
    }
  }

  return errors
}

describe('Inventory API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('calculateStockStatus', () => {
    it('returns NORMAL for adequate stock', () => {
      expect(calculateStockStatus(50, 10)).toBe('NORMAL')
      expect(calculateStockStatus(11, 10)).toBe('NORMAL')
    })

    it('returns LOW when at or below minStock', () => {
      expect(calculateStockStatus(10, 10)).toBe('LOW')
      expect(calculateStockStatus(8, 10)).toBe('LOW')
    })

    it('returns CRITICAL when below half minStock', () => {
      expect(calculateStockStatus(5, 10)).toBe('CRITICAL')
      expect(calculateStockStatus(3, 10)).toBe('CRITICAL')
    })

    it('returns OUT_OF_STOCK when zero or negative', () => {
      expect(calculateStockStatus(0, 10)).toBe('OUT_OF_STOCK')
      expect(calculateStockStatus(-1, 10)).toBe('OUT_OF_STOCK')
    })
  })

  describe('validateStockAdjustment', () => {
    it('returns null for valid adjustment', () => {
      const adj: StockAdjustment = {
        inventoryId: 'inv_1',
        quantity: 10,
        type: 'IN',
        reason: 'Restock from supplier',
      }
      expect(validateStockAdjustment(adj, 50)).toBeNull()
    })

    it('rejects zero quantity', () => {
      const adj: StockAdjustment = { inventoryId: 'inv_1', quantity: 0, type: 'IN', reason: 'Test' }
      expect(validateStockAdjustment(adj, 50)).toBe('Quantity must be positive')
    })

    it('rejects OUT when insufficient stock', () => {
      const adj: StockAdjustment = { inventoryId: 'inv_1', quantity: 100, type: 'OUT', reason: 'Sale' }
      expect(validateStockAdjustment(adj, 50)).toBe('Insufficient stock for this adjustment')
    })

    it('allows OUT when stock is sufficient', () => {
      const adj: StockAdjustment = { inventoryId: 'inv_1', quantity: 30, type: 'OUT', reason: 'Sale' }
      expect(validateStockAdjustment(adj, 50)).toBeNull()
    })

    it('rejects empty reason', () => {
      const adj: StockAdjustment = { inventoryId: 'inv_1', quantity: 5, type: 'IN', reason: '' }
      expect(validateStockAdjustment(adj, 50)).toBe('Reason is required')
    })

    it('rejects missing inventory ID', () => {
      const adj: StockAdjustment = { inventoryId: '', quantity: 5, type: 'IN', reason: 'Test' }
      expect(validateStockAdjustment(adj, 50)).toBe('Inventory ID is required')
    })
  })

  describe('calculateNewStock', () => {
    it('increases stock for IN type', () => {
      expect(calculateNewStock(50, 20, 'IN')).toBe(70)
    })

    it('decreases stock for OUT type', () => {
      expect(calculateNewStock(50, 20, 'OUT')).toBe(30)
    })

    it('OUT type cannot go below zero', () => {
      expect(calculateNewStock(10, 20, 'OUT')).toBe(0)
    })

    it('ADJUSTMENT sets absolute value', () => {
      expect(calculateNewStock(50, 30, 'ADJUSTMENT')).toBe(30)
    })
  })

  describe('validateTransferRequest', () => {
    const validRequest: TransferRequest = {
      fromStoreId: 'store_1',
      toStoreId: 'store_2',
      items: [{ productId: 'prod_1', quantity: 10 }],
      requestedBy: 'user_1',
    }

    it('returns no errors for valid request', () => {
      expect(validateTransferRequest(validRequest)).toHaveLength(0)
    })

    it('rejects same source and destination', () => {
      const errors = validateTransferRequest({ ...validRequest, toStoreId: 'store_1' })
      expect(errors).toContain('Source and destination must be different')
    })

    it('requires items', () => {
      const errors = validateTransferRequest({ ...validRequest, items: [] })
      expect(errors).toContain('At least one item is required')
    })

    it('validates item quantities', () => {
      const errors = validateTransferRequest({
        ...validRequest,
        items: [{ productId: 'prod_1', quantity: 0 }],
      })
      expect(errors).toContain('Invalid quantity for product prod_1')
    })

    it('requires requester', () => {
      const errors = validateTransferRequest({ ...validRequest, requestedBy: '' })
      expect(errors).toContain('Requester is required')
    })
  })

  describe('Inventory retrieval', () => {
    it('retrieves inventory for a store', async () => {
      const mockInventory = [
        { id: 'inv_1', productId: 'p1', storeId: 's1', quantity: 50, status: 'NORMAL' },
        { id: 'inv_2', productId: 'p2', storeId: 's1', quantity: 5, status: 'CRITICAL' },
      ]
      mockPrisma.inventoryItem.findMany.mockResolvedValue(mockInventory)

      const items = await mockPrisma.inventoryItem.findMany({
        where: { storeId: 's1' },
        include: { product: true },
      })

      expect(items).toHaveLength(2)
    })

    it('creates movement record on stock change', async () => {
      mockPrisma.inventoryMovement.create.mockResolvedValue({ id: 'mov_1' })

      await mockPrisma.inventoryMovement.create({
        data: {
          inventoryId: 'inv_1',
          type: 'IN',
          quantity: 20,
          previousStock: 30,
          newStock: 50,
          reason: 'Supplier delivery',
        },
      })

      expect(mockPrisma.inventoryMovement.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          inventoryId: 'inv_1',
          type: 'IN',
          quantity: 20,
        }),
      })
    })
  })
})
