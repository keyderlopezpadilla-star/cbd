import { auth } from '@/server/auth'
import { UserRole } from '@/lib/constants'
import { Permission, hasPermission } from './permissions'
import { redirect } from 'next/navigation'

/**
 * Get the current session (server-side)
 */
export async function getSession() {
  return await auth()
}

/**
 * Get the current user (server-side)
 */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

/**
 * Require authentication (server-side)
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await getSession()
  
  if (!session || !session.user) {
    redirect('/login')
  }
  
  return session.user
}

/**
 * Require specific role (server-side)
 */
export async function requireRole(roles: UserRole | UserRole[]) {
  const user = await requireAuth()
  const allowedRoles = Array.isArray(roles) ? roles : [roles]
  
  if (!allowedRoles.includes(user.role)) {
    redirect('/dashboard')
  }
  
  return user
}

/**
 * Require specific permission (server-side)
 */
export async function requirePermission(permission: Permission) {
  const user = await requireAuth()
  
  if (!hasPermission(user.role, permission)) {
    redirect('/dashboard')
  }
  
  return user
}

/**
 * Check if user has role (client or server)
 */
export function checkRole(userRole: UserRole, allowedRoles: UserRole | UserRole[]): boolean {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
  return roles.includes(userRole)
}

/**
 * Check if user has permission (client or server)
 */
export function checkPermission(userRole: UserRole, permission: Permission): boolean {
  return hasPermission(userRole, permission)
}

/**
 * Role hierarchy for comparison
 */
const roleHierarchy: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 100,
  [UserRole.ADMIN]: 80,
  [UserRole.MANAGER]: 60,
  [UserRole.ACCOUNTING]: 40,
  [UserRole.MARKETING]: 40,
  [UserRole.EMPLOYEE]: 20,
}

/**
 * Check if role is higher or equal in hierarchy
 */
export function isRoleHigherOrEqual(userRole: UserRole, compareRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[compareRole]
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: 'Super Admin',
    [UserRole.ADMIN]: 'Administrator',
    [UserRole.MANAGER]: 'Manager',
    [UserRole.EMPLOYEE]: 'Employee',
    [UserRole.ACCOUNTING]: 'Accounting',
    [UserRole.MARKETING]: 'Marketing',
  }
  return names[role] ?? role
}
