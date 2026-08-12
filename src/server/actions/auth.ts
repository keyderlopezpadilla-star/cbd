'use server'

import { signIn, signOut } from '@/server/auth'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/server/db'
import bcrypt from 'bcryptjs'
import { UserRole } from '@/lib/constants'
import { revalidatePath } from 'next/cache'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.nativeEnum(UserRole).optional(),
})

export async function login(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0]?.message ?? 'Invalid fields',
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}

export async function register(formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    role: formData.get('role'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0]?.message ?? 'Invalid fields',
    }
  }

  const { email, password, name, role } = validatedFields.data

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: 'User already exists' }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role ?? UserRole.EMPLOYEE,
    },
  })

  // Auto login after registration
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    return { error: 'Registration successful, but login failed' }
  }
}

export async function logout() {
  await signOut({ redirect: true, redirectTo: '/login' })
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  userId: string
) {
  if (newPassword.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  })

  if (!user || !user.password) {
    return { error: 'User not found' }
  }

  const passwordsMatch = await bcrypt.compare(currentPassword, user.password)

  if (!passwordsMatch) {
    return { error: 'Current password is incorrect' }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  })

  revalidatePath('/')
  return { success: true }
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    // Don't reveal if user exists
    return { success: true }
  }

  // TODO: Generate reset token and send email
  // For now, just return success
  return { success: true }
}
