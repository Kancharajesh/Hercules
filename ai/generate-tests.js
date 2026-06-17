#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const targetUrl = process.env.TARGET_URL || 'https://hercules.works';
const outputFile = process.env.AI_TEST_OUTPUT || path.join('tests', 'ai-generated.spec.js');
const userPrompt = process.env.AI_TEST_PROMPT || `Create Playwright tests for the public pages of ${targetUrl}. Include page load, title/content visibility, navigation links, and responsive smoke checks.`;

function fallbackSpec() {
  return `const { test, expect } = require('@playwright/test');

// Auto-generated fallback tests.
// Set OPENAI_API_KEY and AI_TEST_PROMPT to generate custom tests with AI.
const TARGET_URL = process.env.TARGET_URL || '${targetUrl}';

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
`;
}

function cleanCode(text) {
  return text
    .replace(/```(?:javascript|js)?/gi, '')
    .replace(/```/g, '')
    .trim();
}

async function generateWithOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;

  const prompt = `You are generating a Playwright test file for a Node.js CommonJS project.\n\nRequirements:\n- Use: const { test, expect } = require('@playwright/test');\n- Output ONLY valid JavaScript code.\n- Use TARGET_URL from process.env.TARGET_URL with fallback '${targetUrl}'.\n- Tests must be stable smoke tests and should not require login unless explicitly requested.\n- Avoid brittle CSS selectors. Prefer role, text, title, body checks, and safe link checks.\n\nUser request:\n${userPrompt}`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: prompt
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const text = data.output_text || (data.output || [])
    .flatMap(item => item.content || [])
    .map(content => content.text || '')
    .join('\n');

  return cleanCode(text);
}

(async () => {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  let spec = null;
  try {
    spec = await generateWithOpenAI();
  } catch (error) {
    console.warn('[AI] Could not generate from OpenAI. Using fallback tests.');
    console.warn(error.message);
  }

  if (!spec) spec = fallbackSpec();

  if (!spec.includes("@playwright/test")) {
    throw new Error('Generated file does not look like a Playwright test. Nothing was written.');
  }

  fs.writeFileSync(outputFile, spec + '\n', 'utf8');
  console.log(`[AI] Test cases created: ${outputFile}`);
})();
