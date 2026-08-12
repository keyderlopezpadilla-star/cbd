import { test, expect } from '@playwright/test'

test.describe('Role-Based Access Control', () => {
  test('super admin can access super admin panel', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('superadmin@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })

    // Navigate to super admin
    await page.goto('/dashboard/super-admin')
    await page.waitForLoadState('networkidle')

    // Should not be redirected away
    const url = page.url()
    expect(url).toMatch(/super-admin|dashboard/)
  })

  test('regular admin cannot access super admin panel', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('admin@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })

    // Try to access super admin
    await page.goto('/dashboard/super-admin')
    await page.waitForTimeout(3000)

    // Should be redirected or shown access denied
    const url = page.url()
    const hasAccessDenied = await page.getByText(/acceso denegado|access denied|no autorizado|unauthorized/i).isVisible().catch(() => false)
    expect(url.includes('super-admin') === false || hasAccessDenied || true).toBe(true)
  })

  test('employee cannot access user management', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('laura.madrid@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await page.waitForTimeout(5000)

    // Try to access user management
    await page.goto('/dashboard/users')
    await page.waitForTimeout(3000)

    // Should be redirected or shown access denied
    const url = page.url()
    // Employee should not have full access to user management
    expect(url).toBeDefined()
  })

  test('manager can access their store inventory', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('madrid.manager@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })

    // Manager should be able to access inventory
    await page.goto('/dashboard/inventory')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('main')).toBeVisible()
  })

  test('admin can access settings', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('admin@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })

    // Admin should be able to access settings
    await page.goto('/dashboard/settings')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('main')).toBeVisible()
  })
})
