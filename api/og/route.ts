export const runtime = 'edge';

function escapeXml(s: string) {
  return s.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
}

function makeSvg(status: string) {
  const isBday = /bday|birthday|birthday/i.test(status);
  const title = isBday ? 'Gefeliciteerd!' : 'Nee, je bent niet jarig';
  const subtitle = isBday ? 'Ik ben vandaag jarig!' : 'Nee, ik ben niet jarig…';
  const domain = 'benikvandaagjarig.nl';
  const bg = isBday
    ? 'linear-gradient(135deg,#e8aeb7 0%,#b8e1ff 100%)'
    : '#ffffff';
  const textColor = isBday ? '#1f2937' : '#111827';
  // Simple SVG designed for 1200x630
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#e8aeb7"/>
      <stop offset="1" stop-color="#b8e1ff"/>
    </linearGradient>
    <style><![CDATA[
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
      .bg { fill: ${isBday ? 'url(#g)' : '#f8fafc'}; }
      .title { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size:64px; font-weight:700; fill: ${textColor}; }
      .subtitle { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size:38px; fill: ${textColor}; opacity:0.9; }
      .domain { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size:20px; fill:#6b7280; }
      .confetti { opacity: ${isBday ? '1' : '0'}; }
    ]]></style>
  </defs>

  <rect class="bg" x="0" y="0" width="1200" height="630" rx="16" />

  <!-- Decorative confetti (simple circles) -->
  <g class="confetti">
    <circle cx="1100" cy="80" r="8" fill="#ffb3c6"/>
    <circle cx="1040" cy="140" r="6" fill="#a9fff7"/>
    <circle cx="980" cy="60" r="7" fill="#b8e1ff"/>
    <circle cx="920" cy="170" r="6" fill="#94fbab"/>
    <circle cx="300" cy="520" r="8" fill="#82aba1"/>
    <circle cx="360" cy="480" r="6" fill="#e8aeb7"/>
  </g>

  <g transform="translate(80,160)">
    <text x="0" y="0" class="title">${escapeXml(title)}</text>
    <text x="0" y="90" class="subtitle">${escapeXml(subtitle)}</text>

    <g transform="translate(0,160)">
      <rect x="-10" y="-10" width="520" height="4" fill="rgba(0,0,0,0.06)" rx="2"></rect>
      <text x="0" y="54" class="domain">${escapeXml(domain)}</text>
    </g>
  </g>

  <!-- Small branding on the right -->
  <g transform="translate(820,420)">
    <rect x="0" y="0" width="320" height="120" rx="12" fill="${isBday ? '#ffffff' : '#f3f4f6'}" opacity="0.85"/>
    <text x="24" y="48" class="subtitle" style="font-size:20px">${isBday ? 'Vier mee!' : 'Kom later terug'}</text>
    <text x="24" y="86" class="domain">${escapeXml(domain)}</text>
  </g>
</svg>`;
}

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  // Prefer explicit query params on the image URL, fall back to the Referer
  let status = (url.searchParams.get('status') || url.searchParams.get('r'))?.toLowerCase();
  if (!status) {
    const referer = req.headers.get('referer') || req.headers.get('referrer') || '';
    try {
      const refUrl = new URL(referer, 'https://benikvandaagjarig.nl');
      status = (refUrl.searchParams.get('r') || refUrl.searchParams.get('status') || 'not-birthday').toLowerCase();
    } catch (e) {
      status = 'not-birthday';
    }
  }

  try {
    const svg = makeSvg(status);
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
      }
    });
  } catch (err) {
    const fallback = makeSvg('not-birthday');
    return new Response(fallback, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
      }
    });
  }
};
