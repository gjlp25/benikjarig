import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import fs from 'fs';
import path from 'path';

test('happy path - today is birthday', async ({ page }) => {
  // Navigate to the running dev server (baseURL set in playwright.config.ts)
  await page.goto('/');

  const now = new Date();
  const day = String(now.getDate());
  const month = String(now.getMonth() + 1);
  const year = String(now.getFullYear() - 25); // sample age

  await page.fill('#day', day);
  await page.fill('#month', month);
  await page.fill('#year', year);

  await page.click('#checkBtn');

  // Expect the birthday result to appear with celebration heading
  const birthdayHeading = page.locator('.result.birthday h2');
  await expect(birthdayHeading).toHaveText(/GEFELICITEERD/i);

  // Accessibility scan after result rendered
  await injectAxe(page);
  await checkA11y(page);

  // Additionally fail test on serious/critical axe violations
  const violations = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    const res = await (window as any).axe.run();
    return res.violations;
  });
  const severe = violations.filter((v: any) => v.impact === 'serious' || v.impact === 'critical');
  if (violations.length > 0) {
    const outDir = path.resolve(process.cwd(), 'test-results');
    try { fs.mkdirSync(outDir, { recursive: true }); } catch (e) {}
    fs.writeFileSync(path.join(outDir, 'axe-violations.json'), JSON.stringify({ violations }, null, 2));
  }
  expect(severe.length).toBe(0);
});

test('consent banner appears and Plausible loads after accept', async ({ page }) => {
  await page.goto('/');

  // Consent banner should be visible
  const banner = page.locator('#consent-banner');
  await expect(banner).toBeVisible();

  // Plausible should not be present before consent
  const hasPlausibleBefore = await page.evaluate(() => !!(window as any).plausible);
  expect(hasPlausibleBefore).toBe(false);

  // Accept consent (Dutch button text "Accepteer")
  await page.locator('button:has-text("Accepteer")').click();

  // Banner should be removed/hidden after accepting
  await expect(banner).toBeHidden({ timeout: 2000 });

  // Wait for Plausible to be available on window (script loaded)
  await page.waitForFunction(() => !!(window as any).plausible, { timeout: 5000 });

  const hasPlausibleAfter = await page.evaluate(() => !!(window as any).plausible);
  expect(hasPlausibleAfter).toBe(true);

  // Accessibility scan after consent accepted and analytics loaded
  await injectAxe(page);
  await checkA11y(page);

  // Additionally fail test on serious/critical axe violations
  const violationsAfter = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    const res = await (window as any).axe.run();
    return res.violations;
  });
  const severeAfter = violationsAfter.filter((v: any) => v.impact === 'serious' || v.impact === 'critical');
  if (violationsAfter.length > 0) {
    const outDir = path.resolve(process.cwd(), 'test-results');
    try { fs.mkdirSync(outDir, { recursive: true }); } catch (e) {}
    fs.writeFileSync(path.join(outDir, 'axe-violations.json'), JSON.stringify({ violations: violationsAfter }, null, 2));
  }
  expect(severeAfter.length).toBe(0);
});
