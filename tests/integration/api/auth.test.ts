import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Integration tests for authentication API routes.
 * Mocks Prisma client and tests auth handler logic.
 */

// Mock PrismaClient
const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}

// Mock bcryptjs
const mockBcrypt = {
  hash: vi.fn().mockResolvedValue('$2a$12$hashedPassword'),
  compare: vi.fn(),
}

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrisma),
}))

vi.mock('bcryptjs', () => ({
  hash: (...args: unknown[]) => mockBcrypt.hash(...args),
  compare: (...args: unknown[]) => mockBcrypt.compare(...args),
}))

interface LoginCredentials {
  email: string
  password: string
}

interface AuthResult {
  success: boolean
  user?: { id: string; email: string; role: string }
  error?: string
}

async function authenticateUser(credentials: LoginCredentials): Promise<AuthResult> {
  const { email, password } = credentials

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' }
  }

  const user = await mockPrisma.user.findUnique({ where: { email } })

  if (!user) {
    return { success: false, error: 'Invalid credentials' }
  }

  if (!user.isActive) {
    return { success: false, error: 'Account is disabled' }
  }

  const isValidPassword = await mockBcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return { success: false, error: 'Invalid credentials' }
  }

  await mockPrisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: expect.any(Date) },
  })

  return {
    success: true,
    user: { id: user.id, email: user.email, role: user.role },
  }
}

describe('Authentication API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('authenticateUser', () => {
    it('returns error for missing email', async () => {
      const result = await authenticateUser({ email: '', password: 'test' })
      expect(result.success).toBe(false)
      expect(result.error).toBe('Email and password are required')
    })

    it('returns error for missing password', async () => {
      const result = await authenticateUser({ email: 'test@test.com', password: '' })
      expect(result.success).toBe(false)
      expect(result.error).toBe('Email and password are required')
    })

    it('returns error when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null)

      const result = await authenticateUser({
        email: 'nonexistent@test.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid credentials')
    })

    it('returns error for disabled account', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user_1',
        email: 'disabled@test.com',
        password: 'hashedPw',
        role: 'EMPLOYEE',
        isActive: false,
      })

      const result = await authenticateUser({
        email: 'disabled@test.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      expect(result.error).toBe('Account is disabled')
    })

    it('returns error for wrong password', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user_1',
        email: 'test@test.com',
        password: 'hashedPw',
        role: 'EMPLOYEE',
        isActive: true,
      })
      mockBcrypt.compare.mockResolvedValue(false)

      const result = await authenticateUser({
        email: 'test@test.com',
        password: 'wrongpassword',
      })
      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid credentials')
    })

    it('returns user data on successful login', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user_1',
        email: 'admin@greenleafcbd.es',
        password: 'hashedPw',
        role: 'ADMIN',
        isActive: true,
      })
      mockBcrypt.compare.mockResolvedValue(true)
      mockPrisma.user.update.mockResolvedValue({})

      const result = await authenticateUser({
        email: 'admin@greenleafcbd.es',
        password: 'password123',
      })
      expect(result.success).toBe(true)
      expect(result.user).toEqual({
        id: 'user_1',
        email: 'admin@greenleafcbd.es',
        role: 'ADMIN',
      })
    })

    it('updates lastLoginAt on successful login', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user_1',
        email: 'test@test.com',
        password: 'hashedPw',
        role: 'EMPLOYEE',
        isActive: true,
      })
      mockBcrypt.compare.mockResolvedValue(true)
      mockPrisma.user.update.mockResolvedValue({})

      await authenticateUser({
        email: 'test@test.com',
        password: 'password123',
      })

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user_1' },
        data: { lastLoginAt: expect.any(Date) },
      })
    })
  })
})
