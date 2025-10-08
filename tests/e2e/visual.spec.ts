import { test, expect } from '@playwright/test';

test.describe('visual regression - homepage', () => {
  test('desktop layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-desktop.png', { threshold: 0.02 });
  });

  test('tablet layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-tablet.png', { threshold: 0.02 });
  });

  test('mobile layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-mobile.png', { threshold: 0.02 });
  });
});
