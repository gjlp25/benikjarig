const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const defaultSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="ben ik vandaag jarig? fallback">
  <rect width="1200" height="630" fill="#f7f9fc" />
  <text x="600" y="320" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial" font-size="40" fill="#0b2545" font-weight="700">benikvandaagjarig.nl</text>
</svg>
`;

const isJarigSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Ik ben vandaag jarig!">
  <defs>
    <linearGradient id="fest" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffdfef"/>
      <stop offset="1" stop-color="#fff4d6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fest)"/>
  <text x="600" y="260" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial" font-size="64" fill="#0b2545" font-weight="800">Ik ben vandaag jarig! 🎉</text>
  <text x="600" y="350" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial" font-size="24" fill="#0b2545" opacity="0.9">Vier mee op benikvandaagjarig.nl</text>
</svg>
`;

try {
  fs.writeFileSync(path.join(outDir, 'og-default.svg'), defaultSvg, 'utf8');
  fs.writeFileSync(path.join(outDir, 'og-is-jarig.svg'), isJarigSvg, 'utf8');
  console.log('wrote public/og-default.svg and public/og-is-jarig.svg');
} catch (err) {
  console.error('failed to write OG images:', err);
  process.exit(1);
}
