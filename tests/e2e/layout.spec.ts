import { test, expect } from '@playwright/test';

test.describe('layout & responsive assertions', () => {
  test('DOM order: main contains #app and #modal-root, footer follows main', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const domCheck = await page.evaluate(() => {
      const main = document.querySelector('main');
      const app = document.querySelector('#app');
      const modal = document.querySelector('#modal-root');
      const footer = document.querySelector('footer');

      return {
        mainExists: !!main,
        appInMain: !!main && main.contains(app),
        modalInMain: !!main && !!modal && main.contains(modal),
        footerAfterMain: !!main && !!footer && (main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
      };
    });

    expect(domCheck.mainExists).toBeTruthy();
    expect(domCheck.appInMain).toBeTruthy();
    expect(domCheck.modalInMain).toBeTruthy();
    expect(domCheck.footerAfterMain).toBeTruthy();
  });

  test('Share buttons wrap between wide and narrow viewports', async ({ page }) => {
    // Measure at wide viewport (no wrap expected)
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const wideWrapped = await page.evaluate(() => {
      const container = document.querySelector('.share-buttons');
      if (!container || !container.children.length) return null;
      const firstTop = (container.children[0] as HTMLElement).offsetTop;
      for (let i = 1; i < container.children.length; i++) {
        if ((container.children[i] as HTMLElement).offsetTop > firstTop) return true;
      }
      return false;
    });

    // Measure at narrow viewport (wrap expected)
    await page.setViewportSize({ width: 520, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');

    const narrowWrapped = await page.evaluate(() => {
      const container = document.querySelector('.share-buttons');
      if (!container || !container.children.length) return null;
      const firstTop = (container.children[0] as HTMLElement).offsetTop;
      for (let i = 1; i < container.children.length; i++) {
        if ((container.children[i] as HTMLElement).offsetTop > firstTop) return true;
      }
      return false;
    });

    // Validate results exist and wrapping behavior changes
    expect(wideWrapped).not.toBeNull();
    expect(narrowWrapped).not.toBeNull();
    expect(wideWrapped).toBe(false);
    expect(narrowWrapped).toBe(true);
  });
});
