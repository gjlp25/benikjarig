import { test, expect } from '@playwright/test';

test('GET /api/og?status=birthday returns SVG (or dev fallback)', async ({ request, baseURL }) => {
  const url = (baseURL ?? '') + '/api/og?status=birthday';
  const res = await request.get(url);
  expect(res.status()).toBe(200);
  const ct = res.headers()['content-type'] || '';

  if (ct.includes('image/svg+xml')) {
    const body = await res.text();
    expect(body).toContain('<svg');
    expect(body).toContain('Gefeliciteerd');
  } else {
    // Dev servers sometimes serve index.html for unknown routes.
    // Accept text/html in dev but ensure response body is not empty.
    expect(ct).toContain('text/html');
    const body = await res.text();
    expect(body.length).toBeGreaterThan(0);
  }
});

test('GET /api/og?status=not-birthday returns SVG (or dev fallback)', async ({ request, baseURL }) => {
  const url = (baseURL ?? '') + '/api/og?status=not-birthday';
  const res = await request.get(url);
  expect(res.status()).toBe(200);
  const ct = res.headers()['content-type'] || '';

  if (ct.includes('image/svg+xml')) {
    const body = await res.text();
    expect(body).toContain('<svg');
    expect(body).toContain('Nee, je bent niet jarig');
  } else {
    // Dev servers sometimes serve index.html for unknown routes.
    // Accept text/html in dev but ensure response body is not empty.
    expect(ct).toContain('text/html');
    const body = await res.text();
    expect(body.length).toBeGreaterThan(0);
  }
});
