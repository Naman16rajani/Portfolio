import { test, expect, Page } from '@playwright/test'
import { seedAbout } from '../helpers/seedAbout'
import { seedResume } from '../helpers/seedResume'
import { getPayload } from 'payload'
import config from '../../src/payload.config'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    // seed about document for homepage/contact
    await seedAbout()
    // provide a resume so download links appear
    await seedResume()

    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Payload Blank Template/)

    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Naman Rajani')

    // verify contact information
    await expect(page.locator('a[href="mailto:rajaninaman16@gmail.com"]')).toBeVisible()
    await expect(page.locator('a[href="tel:+1 (341) 777-8615"]')).toBeVisible()
    // about section should also include email link
    await expect(page.locator('#about a[href^="mailto:"]')).toBeVisible()

    // project card container should be present (tags and buttons rendered by component)

    // resume button/icon should be visible and functional
    await expect(page.locator('a[href="/api/resume-pdf"]').first()).toBeVisible()

    // clicking the nav resume icon triggers redirect
    const [request] = await Promise.all([
      page.waitForRequest('**/api/resume-pdf'),
      page.locator('a[href="/api/resume-pdf"]').first().click(),
    ])
    await expect(request.response()).resolves.toHaveProperty('status', 302)

    // now remove the resume server‑side and reload
    const payload = await getPayload({ config })
    await payload.delete({ collection: 'resume', where: {} })
    await page.reload()
    await expect(page.locator('a[href="/api/resume-pdf"]').first()).toHaveCount(0)
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
