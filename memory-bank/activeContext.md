# activeContext.md — benikvandaagjarig.nl

## Laatste status (geüpdatet 2026-03-11)

Kort overzicht van recente acties (nieuw):
- **Security & Analytics**: `vercel.json` CSP bijgewerkt (`connect-src` uitgebreid met `https://vitals.vercel-insights.com`) om Vercel Analytics correct te laten werken.
- Feature: dedicated off-screen share-card voor beeldexport (html2canvas) — geïmplementeerd in `src/scripts/sharing.ts`.
- Export: download target gewijzigd naar `#share-card`; scale 2 toegepast.
- UI: affiliate-kaarten en -data tijdelijk verwijderd uit UI en `public/config/content.json`.
- Fix: meerdere merge-conflict markers verwijderd en `src/scripts/main.ts` opgeschoond; TypeScript-typing aangepast.
- SEO: canonical + favicon toegevoegd; OG/Twitter meta bijgewerkt naar dynamische OG-endpoint; `public/sitemap.xml` voorzien van `lastmod`.
- Analytics: Vercel Analytics script-tag toegevoegd aan `src/index.html` (`/_vercel/insights/script.js`) en gepusht.
- Nieuwe sectie: "Ook jarig vandaag" banner toegevoegd in `src/scripts/main.ts` (renderTodayBanner) — rendert direct boven het formulier en leest `public/config/today.json`.
- Automatisering: n8n-workflow aanbevolen die dagelijks `public/config/today.json` bijwerkt via GitHub Contents API (commit → CI → deploy).

## Wat werkt nu
- "Bewaar als afbeelding" levert compacte, gebrande 1:1 PNG zonder UI-knoppen.
- Share-card bouwt met inline CSS voor betrouwbare html2canvas renders.
- "Vandaag" banner laadt non-blocking vanaf `/config/today.json` en toont tot 3 namen.
- Vercel Analytics zou nu correct data moeten verzamelen dankzij de CSP update.
- CI vangt lint/type-check/build fouten.

## Openstaande taken / follow-ups (prioriteit)
- [ ] Visuele verificatie op live (cross-browser, mobile).
- [ ] Playwright visual regression: snapshot toevoegen voor share-card & today-banner.
- [ ] (Optioneel) Re-introduce affiliate-kaarten achter feature-flag als monetization terug mag.
- [ ] Documenteer logo-variantstrategie als logo weer opgenomen wordt.
- [ ] Brainstormen over virale features (huidige focus).

## Beslissingen / overwegingen
- **CSP**: We kiezen voor een strikte Content Security Policy, maar staan Vercel Analytics expliciet toe.
- **Privacy**: We blijven weg van externe scripts behalve Vercel Analytics. Geen onnodige third-party connections.
- Productprioriteit: share/branding & share-experience eerst; monetization tijdelijk uitgeschakeld.
- Share-card en today-banner gebruiken client-side JSON bestanden.