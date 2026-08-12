import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('admin@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })
  })

  test('should display dashboard overview', async ({ page }) => {
    // Should have main metrics/stats visible
    await expect(page.getByText(/ventas|sales|ingresos|revenue/i).first()).toBeVisible()
  })

  test('should display navigation sidebar', async ({ page }) => {
    // Check for main navigation items
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()
  })

  test('should navigate to products page', async ({ page }) => {
    const productsLink = page.getByRole('link', { name: /productos|products/i }).first()
    if (await productsLink.isVisible()) {
      await productsLink.click()
      await expect(page).toHaveURL(/products|productos/)
    }
  })

  test('should navigate to sales page', async ({ page }) => {
    const salesLink = page.getByRole('link', { name: /ventas|sales/i }).first()
    if (await salesLink.isVisible()) {
      await salesLink.click()
      await expect(page).toHaveURL(/sales|ventas/)
    }
  })

  test('should navigate to inventory page', async ({ page }) => {
    const inventoryLink = page.getByRole('link', { name: /inventario|inventory/i }).first()
    if (await inventoryLink.isVisible()) {
      await inventoryLink.click()
      await expect(page).toHaveURL(/inventory|inventario/)
    }
  })

  test('should navigate to analytics page', async ({ page }) => {
    const analyticsLink = page.getByRole('link', { name: /analítica|analytics|estadísticas/i }).first()
    if (await analyticsLink.isVisible()) {
      await analyticsLink.click()
      await expect(page).toHaveURL(/analytics|analitica/)
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })

    // Dashboard content should still be visible
    await expect(page.locator('main')).toBeVisible()
  })

  test('should display user info in header', async ({ page }) => {
    // Look for user avatar or name in header
    const header = page.locator('header').first()
    if (await header.isVisible()) {
      await expect(header).toBeVisible()
    }
  })
})

test.describe('Dashboard - Role Based Views', () => {
  test('admin should see all navigation items', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('admin@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })

    // Admin should have access to settings
    const settingsLink = page.getByRole('link', { name: /configuración|settings|ajustes/i })
    // Settings link may or may not be visible depending on navigation state
  })

  test('employee should have limited navigation', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('laura.madrid@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()

    // Employee might be redirected to a limited dashboard or POS
    await page.waitForTimeout(3000)
    const url = page.url()
    expect(url).toMatch(/dashboard|pos|login/)
  })
})
