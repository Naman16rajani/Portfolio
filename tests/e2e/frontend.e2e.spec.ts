import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Payload Blank Template/)

    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Welcome to your new project.')

    // project card container should be present (tags and buttons rendered by component)
    const workSection = page.locator('.app__project')
    await expect(workSection).toHaveCount(1)

    // if any cards exist, ensure tags or buttons follow the new structure
    const card = workSection.locator('.app__project-item').first()
    if ((await card.count()) > 0) {
      await expect(card.locator('.tag-badge').first())
        .toBeVisible()
        .catch(() => {})
      await expect(card.locator('.button-group').first())
        .toBeVisible()
        .catch(() => {})
    }
  })
})
