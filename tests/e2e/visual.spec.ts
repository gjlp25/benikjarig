import { test, expect } from '@playwright/test';
const isCI = !!process.env.CI;
const isLinux = process.platform === 'linux';
// Skip visual tests unless running in CI (containerized Linux) or explicitly on Linux dev machine
test.skip(!isCI && !isLinux, 'Visual tests run only in CI (Linux) or inside Docker to avoid platform-specific diffs.');
 
test.describe('visual regression - homepage', () => {
  test('desktop layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 842 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.container, #app', { state: 'visible' });
    await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
    await page.waitForTimeout(1500);
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-desktop.png', { threshold: 0.02 });
  });

  test('tablet layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.container, #app', { state: 'visible' });
    await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
    await page.waitForTimeout(1500);
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-tablet.png', { threshold: 0.02 });
  });

  test('mobile layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 842 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.container, #app', { state: 'visible' });
    await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
    await page.waitForTimeout(1500);
    const shot = await page.screenshot({ fullPage: true });
    expect(shot).toMatchSnapshot('visual-mobile.png', { threshold: 0.02 });
  });
});
