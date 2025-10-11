import { test, expect } from '@playwright/test';

test('DOM order: main contains #app then #modal-root; footer is after main', async ({ page }) => {
  // Navigate to the site root (playwright config should set baseURL for CI)
  await page.goto('/');

  // Wait for DOMContentLoaded and for the app mount to run
  await page.waitForLoadState('domcontentloaded');

  // Give a short moment for the client script to create/move #modal-root if needed
  await page.waitForTimeout(200);

  const result = await page.evaluate(() => {
    const main = document.querySelector('main');
    const app = document.querySelector('#app');
    const modal = document.getElementById('modal-root');
    const footer = document.querySelector('footer.site-footer');

    // Basic presence checks
    const mainExists = !!main;
    const appInsideMain = !!main && !!app && main.contains(app);
    const modalInsideMain = !!main && !!modal && main.contains(modal);
    const footerAfterMain = !!main && !!footer && Array.from(document.body.children).indexOf(footer) > Array.from(document.body.children).indexOf(main);

    return { mainExists, appInsideMain, modalInsideMain, footerAfterMain };
  });

  expect(result.mainExists).toBeTruthy();
  expect(result.appInsideMain).toBeTruthy();
  expect(result.modalInsideMain).toBeTruthy();
  expect(result.footerAfterMain).toBeTruthy();
});
