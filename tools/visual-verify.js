const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch();
  const url = 'http://localhost:5173/';
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
  ];
  const outDir = 'test-results/visual';
  fs.mkdirSync(outDir, { recursive: true });
  try {
    for (const vp of viewports) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();
      console.log(`Navigating to ${url} at ${vp.name} ${vp.width}x${vp.height}`);
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      // Allow client scripts to render and mount
      await page.waitForTimeout(800);
      const filePath = `${outDir}/${vp.name}.png`;
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved screenshot: ${filePath}`);
      await context.close();
    }
  } catch (err) {
    console.error('Visual verification failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
