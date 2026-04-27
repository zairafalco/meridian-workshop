import { test, expect } from '@playwright/test'

test.describe('Meridian Inventory Management App', () => {
  test('loads dashboard and navigates through core pages', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Performance Reports')).not.toBeVisible()
    await expect(page.getByRole('link', { name: 'Reports' })).toBeVisible()

    await page.getByRole('link', { name: 'Reports' }).click()
    await expect(page.getByRole('heading', { name: 'Performance Reports' })).toBeVisible()
    await expect(page.getByText('Quarterly Performance')).toBeVisible()

    await page.getByRole('link', { name: 'Restocking' }).click()
    await expect(page.getByRole('heading', { name: 'Restocking Recommendations' })).toBeVisible()
    await expect(page.getByLabel('Budget ceiling')).toBeVisible()

    await page.fill('#budget', '5000')
    await page.click('button:has-text("Refresh")')

    const recommendationsTable = page.locator('table.recommendations-table')
    await expect(recommendationsTable).toBeVisible()
    await expect(await recommendationsTable.locator('tbody tr').count()).toBeGreaterThan(0)

    await page.getByRole('link', { name: 'Inventory' }).click()
    await expect(page.getByText('Inventory Items')).toBeVisible()
  })
})
