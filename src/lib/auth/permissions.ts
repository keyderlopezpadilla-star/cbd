import { UserRole } from '@/lib/constants'

// Permission definitions
export enum Permission {
  // Users
  VIEW_USERS = 'VIEW_USERS',
  CREATE_USERS = 'CREATE_USERS',
  UPDATE_USERS = 'UPDATE_USERS',
  DELETE_USERS = 'DELETE_USERS',

  // Stores
  VIEW_STORES = 'VIEW_STORES',
  CREATE_STORES = 'CREATE_STORES',
  UPDATE_STORES = 'UPDATE_STORES',
  DELETE_STORES = 'DELETE_STORES',

  // Products
  VIEW_PRODUCTS = 'VIEW_PRODUCTS',
  CREATE_PRODUCTS = 'CREATE_PRODUCTS',
  UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
  DELETE_PRODUCTS = 'DELETE_PRODUCTS',

  // Inventory
  VIEW_INVENTORY = 'VIEW_INVENTORY',
  UPDATE_INVENTORY = 'UPDATE_INVENTORY',
  TRANSFER_INVENTORY = 'TRANSFER_INVENTORY',

  // Sales
  VIEW_SALES = 'VIEW_SALES',
  CREATE_SALES = 'CREATE_SALES',
  CANCEL_SALES = 'CANCEL_SALES',

  // Orders
  VIEW_ORDERS = 'VIEW_ORDERS',
  CREATE_ORDERS = 'CREATE_ORDERS',
  UPDATE_ORDERS = 'UPDATE_ORDERS',
  CANCEL_ORDERS = 'CANCEL_ORDERS',

  // Customers
  VIEW_CUSTOMERS = 'VIEW_CUSTOMERS',
  CREATE_CUSTOMERS = 'CREATE_CUSTOMERS',
  UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS',
  DELETE_CUSTOMERS = 'DELETE_CUSTOMERS',

  // Marketing
  VIEW_CAMPAIGNS = 'VIEW_CAMPAIGNS',
  CREATE_CAMPAIGNS = 'CREATE_CAMPAIGNS',
  UPDATE_CAMPAIGNS = 'UPDATE_CAMPAIGNS',
  DELETE_CAMPAIGNS = 'DELETE_CAMPAIGNS',

  // Analytics
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  VIEW_ALL_STORES_ANALYTICS = 'VIEW_ALL_STORES_ANALYTICS',

  // Financial
  VIEW_FINANCIAL = 'VIEW_FINANCIAL',
  EXPORT_FINANCIAL = 'EXPORT_FINANCIAL',

  // Settings
  VIEW_SETTINGS = 'VIEW_SETTINGS',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',

  // Audit
  VIEW_AUDIT_LOGS = 'VIEW_AUDIT_LOGS',

  // Organization
  MANAGE_ORGANIZATION = 'MANAGE_ORGANIZATION',
}

// Role-based permissions matrix
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission), // All permissions

  [UserRole.ADMIN]: [
    // Users
    Permission.VIEW_USERS,
    Permission.CREATE_USERS,
    Permission.UPDATE_USERS,
    Permission.DELETE_USERS,

    // Stores
    Permission.VIEW_STORES,
    Permission.CREATE_STORES,
    Permission.UPDATE_STORES,
    Permission.DELETE_STORES,

    // Products
    Permission.VIEW_PRODUCTS,
    Permission.CREATE_PRODUCTS,
    Permission.UPDATE_PRODUCTS,
    Permission.DELETE_PRODUCTS,

    // Inventory
    Permission.VIEW_INVENTORY,
    Permission.UPDATE_INVENTORY,
    Permission.TRANSFER_INVENTORY,

    // Sales
    Permission.VIEW_SALES,
    Permission.CREATE_SALES,
    Permission.CANCEL_SALES,

    // Orders
    Permission.VIEW_ORDERS,
    Permission.CREATE_ORDERS,
    Permission.UPDATE_ORDERS,
    Permission.CANCEL_ORDERS,

    // Customers
    Permission.VIEW_CUSTOMERS,
    Permission.CREATE_CUSTOMERS,
    Permission.UPDATE_CUSTOMERS,
    Permission.DELETE_CUSTOMERS,

    // Marketing
    Permission.VIEW_CAMPAIGNS,
    Permission.CREATE_CAMPAIGNS,
    Permission.UPDATE_CAMPAIGNS,
    Permission.DELETE_CAMPAIGNS,

    // Analytics
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_ALL_STORES_ANALYTICS,

    // Financial
    Permission.VIEW_FINANCIAL,
    Permission.EXPORT_FINANCIAL,

    // Settings
    Permission.VIEW_SETTINGS,
    Permission.UPDATE_SETTINGS,

    // Audit
    Permission.VIEW_AUDIT_LOGS,
  ],

  [UserRole.MANAGER]: [
    // Users (store only)
    Permission.VIEW_USERS,

    // Stores (own store)
    Permission.VIEW_STORES,
    Permission.UPDATE_STORES,

    // Products
    Permission.VIEW_PRODUCTS,
    Permission.UPDATE_PRODUCTS,

    // Inventory
    Permission.VIEW_INVENTORY,
    Permission.UPDATE_INVENTORY,
    Permission.TRANSFER_INVENTORY,

    // Sales
    Permission.VIEW_SALES,
    Permission.CREATE_SALES,
    Permission.CANCEL_SALES,

    // Orders
    Permission.VIEW_ORDERS,
    Permission.CREATE_ORDERS,
    Permission.UPDATE_ORDERS,

    // Customers
    Permission.VIEW_CUSTOMERS,
    Permission.CREATE_CUSTOMERS,
    Permission.UPDATE_CUSTOMERS,

    // Analytics (own store)
    Permission.VIEW_ANALYTICS,

    // Financial (own store)
    Permission.VIEW_FINANCIAL,
  ],

  [UserRole.EMPLOYEE]: [
    // Products (view only)
    Permission.VIEW_PRODUCTS,

    // Inventory (view only)
    Permission.VIEW_INVENTORY,

    // Sales
    Permission.VIEW_SALES,
    Permission.CREATE_SALES,

    // Orders
    Permission.VIEW_ORDERS,
    Permission.CREATE_ORDERS,

    // Customers
    Permission.VIEW_CUSTOMERS,
    Permission.CREATE_CUSTOMERS,
  ],

  [UserRole.ACCOUNTING]: [
    // Sales
    Permission.VIEW_SALES,

    // Orders
    Permission.VIEW_ORDERS,

    // Analytics
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_ALL_STORES_ANALYTICS,

    // Financial
    Permission.VIEW_FINANCIAL,
    Permission.EXPORT_FINANCIAL,

    // Audit
    Permission.VIEW_AUDIT_LOGS,
  ],

  [UserRole.MARKETING]: [
    // Customers
    Permission.VIEW_CUSTOMERS,
    Permission.UPDATE_CUSTOMERS,

    // Marketing
    Permission.VIEW_CAMPAIGNS,
    Permission.CREATE_CAMPAIGNS,
    Permission.UPDATE_CAMPAIGNS,
    Permission.DELETE_CAMPAIGNS,

    // Analytics (for campaigns)
    Permission.VIEW_ANALYTICS,
  ],
}

// Helper functions
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}

export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] ?? []
}
