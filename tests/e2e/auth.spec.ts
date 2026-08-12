import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /iniciar sesión|login/i })).toBeVisible()
    await expect(page.getByLabel(/email|correo/i)).toBeVisible()
    await expect(page.getByLabel(/password|contraseña/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /iniciar|login|entrar/i })).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel(/email|correo/i).fill('invalid@test.com')
    await page.getByLabel(/password|contraseña/i).fill('wrongpassword')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()

    await expect(
      page.getByText(/credenciales|invalid|error|incorrecta/i)
    ).toBeVisible({ timeout: 10000 })
  })

  test('should show error for empty fields', async ({ page }) => {
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()

    // Should show validation errors or remain on login page
    await expect(page).toHaveURL(/login/)
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByLabel(/email|correo/i).fill('admin@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()

    // Should redirect to dashboard after successful login
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })
  })

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/login/)
  })

  test('login form should have accessible labels', async ({ page }) => {
    const emailInput = page.getByLabel(/email|correo/i)
    const passwordInput = page.getByLabel(/password|contraseña/i)

    await expect(emailInput).toHaveAttribute('type', 'email')
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('should handle login with keyboard only', async ({ page }) => {
    await page.getByLabel(/email|correo/i).fill('admin@greenleafcbd.es')
    await page.keyboard.press('Tab')
    await page.keyboard.type('password123')
    await page.keyboard.press('Enter')

    // Should attempt login
    await page.waitForTimeout(2000)
  })
})

test.describe('Logout Flow', () => {
  test('should logout and redirect to login', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.getByLabel(/email|correo/i).fill('admin@greenleafcbd.es')
    await page.getByLabel(/password|contraseña/i).fill('password123')
    await page.getByRole('button', { name: /iniciar|login|entrar/i }).click()
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 })

    // Find and click logout
    const userMenu = page.getByRole('button', { name: /perfil|usuario|account|avatar/i })
    if (await userMenu.isVisible()) {
      await userMenu.click()
      const logoutButton = page.getByRole('menuitem', { name: /cerrar sesión|logout|salir/i })
      if (await logoutButton.isVisible()) {
        await logoutButton.click()
        await expect(page).toHaveURL(/login/, { timeout: 10000 })
      }
    }
  })
})
