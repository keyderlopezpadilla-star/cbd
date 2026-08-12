import { describe, it, expect } from 'vitest'
import { UserRole } from '@/lib/constants'

/**
 * RBAC Permission definitions for testing.
 * These mirror the permission system used in the application.
 */
const PERMISSIONS = {
  // Dashboard access
  'dashboard.view': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.ACCOUNTING, UserRole.MARKETING],
  // Product management
  'products.view': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE],
  'products.create': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  'products.edit': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  'products.delete': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Sales
  'sales.view': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE, UserRole.ACCOUNTING],
  'sales.create': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE],
  'sales.void': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  // Inventory
  'inventory.view': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE],
  'inventory.adjust': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  'inventory.transfer': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  // Users
  'users.view': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  'users.create': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'users.edit': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'users.delete': [UserRole.SUPER_ADMIN],
  // Analytics
  'analytics.view': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.ACCOUNTING],
  'analytics.export': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.ACCOUNTING],
  // Settings
  'settings.view': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'settings.edit': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  // Super admin
  'super_admin.access': [UserRole.SUPER_ADMIN],
  'super_admin.manage_orgs': [UserRole.SUPER_ADMIN],
} as const

type Permission = keyof typeof PERMISSIONS

function hasPermission(role: UserRole, permission: Permission): boolean {
  const allowedRoles = PERMISSIONS[permission]
  return (allowedRoles as readonly UserRole[]).includes(role)
}

function getUserPermissions(role: UserRole): Permission[] {
  return (Object.keys(PERMISSIONS) as Permission[]).filter((permission) =>
    hasPermission(role, permission)
  )
}

describe('RBAC Permissions', () => {
  describe('hasPermission', () => {
    it('SUPER_ADMIN has access to all permissions', () => {
      const allPermissions = Object.keys(PERMISSIONS) as Permission[]
      for (const permission of allPermissions) {
        expect(hasPermission(UserRole.SUPER_ADMIN, permission)).toBe(true)
      }
    })

    it('EMPLOYEE has limited permissions', () => {
      expect(hasPermission(UserRole.EMPLOYEE, 'dashboard.view')).toBe(true)
      expect(hasPermission(UserRole.EMPLOYEE, 'products.view')).toBe(true)
      expect(hasPermission(UserRole.EMPLOYEE, 'sales.create')).toBe(true)
      expect(hasPermission(UserRole.EMPLOYEE, 'products.delete')).toBe(false)
      expect(hasPermission(UserRole.EMPLOYEE, 'users.view')).toBe(false)
      expect(hasPermission(UserRole.EMPLOYEE, 'settings.edit')).toBe(false)
      expect(hasPermission(UserRole.EMPLOYEE, 'super_admin.access')).toBe(false)
    })

    it('MANAGER can manage products but not delete', () => {
      expect(hasPermission(UserRole.MANAGER, 'products.create')).toBe(true)
      expect(hasPermission(UserRole.MANAGER, 'products.edit')).toBe(true)
      expect(hasPermission(UserRole.MANAGER, 'products.delete')).toBe(false)
    })

    it('ADMIN can manage users but not access super admin', () => {
      expect(hasPermission(UserRole.ADMIN, 'users.create')).toBe(true)
      expect(hasPermission(UserRole.ADMIN, 'users.edit')).toBe(true)
      expect(hasPermission(UserRole.ADMIN, 'users.delete')).toBe(false)
      expect(hasPermission(UserRole.ADMIN, 'super_admin.access')).toBe(false)
    })

    it('ACCOUNTING has financial view access', () => {
      expect(hasPermission(UserRole.ACCOUNTING, 'sales.view')).toBe(true)
      expect(hasPermission(UserRole.ACCOUNTING, 'analytics.view')).toBe(true)
      expect(hasPermission(UserRole.ACCOUNTING, 'analytics.export')).toBe(true)
      expect(hasPermission(UserRole.ACCOUNTING, 'sales.create')).toBe(false)
      expect(hasPermission(UserRole.ACCOUNTING, 'products.edit')).toBe(false)
    })

    it('MARKETING has dashboard access only', () => {
      expect(hasPermission(UserRole.MARKETING, 'dashboard.view')).toBe(true)
      expect(hasPermission(UserRole.MARKETING, 'products.create')).toBe(false)
      expect(hasPermission(UserRole.MARKETING, 'sales.create')).toBe(false)
    })

    it('only SUPER_ADMIN can delete users', () => {
      expect(hasPermission(UserRole.SUPER_ADMIN, 'users.delete')).toBe(true)
      expect(hasPermission(UserRole.ADMIN, 'users.delete')).toBe(false)
      expect(hasPermission(UserRole.MANAGER, 'users.delete')).toBe(false)
      expect(hasPermission(UserRole.EMPLOYEE, 'users.delete')).toBe(false)
    })

    it('only SUPER_ADMIN can access super admin panel', () => {
      expect(hasPermission(UserRole.SUPER_ADMIN, 'super_admin.access')).toBe(true)
      expect(hasPermission(UserRole.ADMIN, 'super_admin.access')).toBe(false)
      expect(hasPermission(UserRole.MANAGER, 'super_admin.access')).toBe(false)
    })
  })

  describe('getUserPermissions', () => {
    it('returns all permissions for SUPER_ADMIN', () => {
      const permissions = getUserPermissions(UserRole.SUPER_ADMIN)
      expect(permissions).toHaveLength(Object.keys(PERMISSIONS).length)
    })

    it('returns limited permissions for EMPLOYEE', () => {
      const permissions = getUserPermissions(UserRole.EMPLOYEE)
      expect(permissions).toContain('dashboard.view')
      expect(permissions).toContain('products.view')
      expect(permissions).toContain('sales.create')
      expect(permissions).not.toContain('super_admin.access')
      expect(permissions).not.toContain('settings.edit')
    })

    it('MANAGER has more permissions than EMPLOYEE', () => {
      const managerPerms = getUserPermissions(UserRole.MANAGER)
      const employeePerms = getUserPermissions(UserRole.EMPLOYEE)
      expect(managerPerms.length).toBeGreaterThan(employeePerms.length)
    })

    it('ADMIN has more permissions than MANAGER', () => {
      const adminPerms = getUserPermissions(UserRole.ADMIN)
      const managerPerms = getUserPermissions(UserRole.MANAGER)
      expect(adminPerms.length).toBeGreaterThan(managerPerms.length)
    })
  })

  describe('Role hierarchy', () => {
    it('permission count increases with role level', () => {
      const counts = {
        marketing: getUserPermissions(UserRole.MARKETING).length,
        employee: getUserPermissions(UserRole.EMPLOYEE).length,
        manager: getUserPermissions(UserRole.MANAGER).length,
        admin: getUserPermissions(UserRole.ADMIN).length,
        superAdmin: getUserPermissions(UserRole.SUPER_ADMIN).length,
      }

      expect(counts.employee).toBeGreaterThanOrEqual(counts.marketing)
      expect(counts.manager).toBeGreaterThan(counts.employee)
      expect(counts.admin).toBeGreaterThan(counts.manager)
      expect(counts.superAdmin).toBeGreaterThan(counts.admin)
    })
  })
})
