import { test, expect } from '@playwright/test';

test.describe('visual regression - homepage', () => {
  test('desktop layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 842 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wacht extra op rendering
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-desktop.png', { threshold: 0.02 });
  });

  test('tablet layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 842 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wacht extra op rendering
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-tablet.png', { threshold: 0.02 });
  });

  test('mobile layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 842 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wacht extra op rendering
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-mobile.png', { threshold: 0.02 });
  });
});
