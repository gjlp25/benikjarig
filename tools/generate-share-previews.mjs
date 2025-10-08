import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const OUT_DIR = path.join(process.cwd(), 'test-results', 'visual-share');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const publicDir = path.join(process.cwd(), 'public');
const ogBirthday = path.join(publicDir, 'og-is-jarig.svg');
const ogDefault = path.join(publicDir, 'og-default.svg');

const PLATFORMS = [
  { name: 'facebook', width: 820, height: 312 }, // typical link preview card
  { name: 'twitter', width: 600, height: 314 },  // twitter summary large
  { name: 'whatsapp', width: 400, height: 200 }, // phone-like preview
  { name: 'linkedin', width: 520, height: 272 }  // linkedin preview card
];

function buildPreviewHtml({ imagePath, title, description }) {
  const imgUrl = `file://${imagePath.replace(/\\/g, '/')}`;
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    :root { --bg: #fff; --text: #0b2545; --muted: #2b394b; font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial; }
    body { margin: 0; padding: 20px; background: var(--bg); color: var(--text); }
    .card { display:flex; gap:16px; align-items:center; border:1px solid #e6eef8; border-radius:8px; box-shadow: 0 6px 18px rgba(11,37,69,0.06); padding:12px; background:white; width:100%; height:100%; box-sizing:border-box; }
    .img { flex:0 0 160px; height: 90%; display:flex; align-items:center; justify-content:center; }
    .img img { max-width:100%; max-height:100%; border-radius:6px; }
    .meta { flex:1; display:flex; flex-direction:column; gap:8px; }
    .title { font-weight:700; font-size:18px; color:var(--text); }
    .desc { font-size:14px; color:var(--muted); opacity:0.95; }
    .url { font-size:12px; color:#6b7a8b; }
  </style>
</head>
<body>
  <div class="card" role="img" aria-label="Share preview">
    <div class="img"><img src="${imgUrl}" alt="og image"/></div>
    <div class="meta">
      <div class="title">${title}</div>
      <div class="desc">${description}</div>
      <div class="url">benikvandaagjarig.nl</div>
    </div>
  </div>
</body>
</html>`;
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();

  // Prepare two states
  const states = [
    {
      id: 'birthday',
      image: ogBirthday,
      title: '🎉 Ik ben vandaag jarig!',
      description: 'Vier mee op benikvandaagjarig.nl'
    },
    {
      id: 'not-birthday',
      image: ogDefault,
      title: 'benikvandaagjarig.nl',
      description: 'Check direct of het jouw verjaardag is'
    }
  ];

  for (const plat of PLATFORMS) {
    for (const state of states) {
      const html = buildPreviewHtml({ imagePath: state.image, title: state.title, description: state.description });
      await page.setContent(html, { waitUntil: 'load' });
      await page.setViewportSize({ width: plat.width, height: plat.height });
      const out = path.join(OUT_DIR, `${plat.name}-${state.id}.png`);
      await page.screenshot({ path: out, fullPage: true });
      console.log('Saved', out);
    }
  }

  await browser.close();
  console.log('Done generating share previews.');
})();
