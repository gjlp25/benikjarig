import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('homepage should pass accessibility checks', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    await injectAxe(page);
    
    // You can configure which rules to check/ignore here
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: {
        rules: {
          'aria-hidden-focus': { enabled: false },
          'page-has-heading-one': { enabled: false },
        },
      },
    });
  });
});
