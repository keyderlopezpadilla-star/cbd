import { describe, it, expect } from 'vitest'
import { z } from 'zod'

/**
 * Tests for validation schemas.
 * These schemas represent the validation rules used throughout the application.
 */

// Product validation schema
const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  sku: z.string().min(1, 'SKU is required').max(50),
  price: z.number().min(0, 'Price must be non-negative'),
  cost: z.number().min(0, 'Cost must be non-negative'),
  categoryId: z.string().min(1, 'Category is required'),
  concentration: z.string().optional(),
  composition: z.string().optional(),
  brand: z.string().optional(),
  description: z.string().max(5000).optional(),
  isActive: z.boolean().default(true),
})

// User validation schema
const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'ACCOUNTING', 'MARKETING']),
  storeId: z.string().optional(),
})

// Sale validation schema
const saleItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().min(0),
})

const saleSchema = z.object({
  storeId: z.string().min(1, 'Store is required'),
  employeeId: z.string().min(1, 'Employee is required'),
  customerId: z.string().optional(),
  items: z.array(saleItemSchema).min(1, 'At least one item is required'),
  paymentMethod: z.enum(['CASH', 'CARD', 'TRANSFER']),
  discount: z.number().min(0).default(0),
})

// Login validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

describe('Product Validation Schema', () => {
  it('validates correct product data', () => {
    const result = productSchema.safeParse({
      name: 'Aceite CBD 10%',
      sku: 'ACE-001',
      price: 49.90,
      cost: 20.00,
      categoryId: 'cat_aceites',
      concentration: '10% CBD',
      composition: 'Full Spectrum',
      brand: 'GreenLeaf',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = productSchema.safeParse({
      name: '',
      sku: 'ACE-001',
      price: 49.90,
      cost: 20.00,
      categoryId: 'cat_aceites',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is required')
    }
  })

  it('rejects negative price', () => {
    const result = productSchema.safeParse({
      name: 'Test',
      sku: 'T-001',
      price: -5,
      cost: 20.00,
      categoryId: 'cat_1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects negative cost', () => {
    const result = productSchema.safeParse({
      name: 'Test',
      sku: 'T-001',
      price: 50,
      cost: -10,
      categoryId: 'cat_1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing category', () => {
    const result = productSchema.safeParse({
      name: 'Test',
      sku: 'T-001',
      price: 50,
      cost: 20,
      categoryId: '',
    })
    expect(result.success).toBe(false)
  })

  it('accepts optional fields as undefined', () => {
    const result = productSchema.safeParse({
      name: 'Test Product',
      sku: 'T-001',
      price: 50,
      cost: 20,
      categoryId: 'cat_1',
    })
    expect(result.success).toBe(true)
  })

  it('defaults isActive to true', () => {
    const result = productSchema.safeParse({
      name: 'Test Product',
      sku: 'T-001',
      price: 50,
      cost: 20,
      categoryId: 'cat_1',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.isActive).toBe(true)
    }
  })
})

describe('User Validation Schema', () => {
  it('validates correct user data', () => {
    const result = userSchema.safeParse({
      email: 'test@greenleafcbd.es',
      password: 'password123',
      name: 'Test User',
      role: 'EMPLOYEE',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = userSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
      name: 'Test',
      role: 'EMPLOYEE',
    })
    expect(result.success).toBe(false)
  })

  it('rejects short password', () => {
    const result = userSchema.safeParse({
      email: 'test@test.com',
      password: '123',
      name: 'Test',
      role: 'EMPLOYEE',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('8 characters')
    }
  })

  it('rejects invalid role', () => {
    const result = userSchema.safeParse({
      email: 'test@test.com',
      password: 'password123',
      name: 'Test',
      role: 'INVALID_ROLE',
    })
    expect(result.success).toBe(false)
  })

  it('accepts all valid roles', () => {
    const roles = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE', 'ACCOUNTING', 'MARKETING']
    for (const role of roles) {
      const result = userSchema.safeParse({
        email: 'test@test.com',
        password: 'password123',
        name: 'Test',
        role,
      })
      expect(result.success).toBe(true)
    }
  })

  it('allows optional storeId', () => {
    const result = userSchema.safeParse({
      email: 'test@test.com',
      password: 'password123',
      name: 'Test',
      role: 'MANAGER',
      storeId: 'store_001',
    })
    expect(result.success).toBe(true)
  })
})

describe('Sale Validation Schema', () => {
  const validSale = {
    storeId: 'store_1',
    employeeId: 'emp_1',
    items: [
      { productId: 'p1', productName: 'Aceite CBD', quantity: 2, price: 49.90 },
    ],
    paymentMethod: 'CARD' as const,
  }

  it('validates correct sale data', () => {
    const result = saleSchema.safeParse(validSale)
    expect(result.success).toBe(true)
  })

  it('rejects empty items', () => {
    const result = saleSchema.safeParse({ ...validSale, items: [] })
    expect(result.success).toBe(false)
  })

  it('rejects zero quantity', () => {
    const result = saleSchema.safeParse({
      ...validSale,
      items: [{ productId: 'p1', productName: 'Test', quantity: 0, price: 10 }],
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid payment method', () => {
    const result = saleSchema.safeParse({ ...validSale, paymentMethod: 'BITCOIN' })
    expect(result.success).toBe(false)
  })

  it('rejects negative discount', () => {
    const result = saleSchema.safeParse({ ...validSale, discount: -5 })
    expect(result.success).toBe(false)
  })

  it('defaults discount to 0', () => {
    const result = saleSchema.safeParse(validSale)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.discount).toBe(0)
    }
  })

  it('allows optional customer', () => {
    const result = saleSchema.safeParse({ ...validSale, customerId: 'cust_1' })
    expect(result.success).toBe(true)
  })
})

describe('Login Validation Schema', () => {
  it('validates correct login data', () => {
    const result = loginSchema.safeParse({
      email: 'admin@greenleafcbd.es',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
  })

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({
      email: 'test@test.com',
      password: '',
    })
    expect(result.success).toBe(false)
  })
})
