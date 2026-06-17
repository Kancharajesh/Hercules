const { test, expect } = require('@playwright/test');

// Auto-generated fallback tests.
// Set OPENAI_API_KEY and AI_TEST_PROMPT to generate custom tests with AI.
const TARGET_URL = process.env.TARGET_URL || 'https://hercules.works';

test.describe('AI generated smoke tests', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/.+/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('page has meaningful content', async ({ page }) => {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.trim().length).toBeGreaterThan(20);
  });

  test('main links do not use empty href values', async ({ page }) => {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    const links = page.locator('a[href]');
    const count = Math.min(await links.count(), 10);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });
});

