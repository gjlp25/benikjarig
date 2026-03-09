# progress.md — voortgangslog (geüpdatet 2026-03-09)

## Samenvatting huidige status
- Nieuwe feature: dedicated off-screen share-card en verbeterde image-export zijn geïmplementeerd.
- UI-opruiming: affiliate-buttons en -data tijdelijk verwijderd om zichtbaarheid en share-ervaring te prioriteren.
- UX-fix: extra bottom-padding toegevoegd aan result containers om animatie-icoontjes niet over de "Delen" knop te laten vallen.

## Recente wijzigingen (kort)
- `src/scripts/sharing.ts` — `buildShareCard()` + `downloadResultCard()` toegevoegd/gevinaliseerd.
- `src/scripts/main.ts` — affiliate-rendering verwijderd (no-op) en `buildShareCard()` aangeroepen in result flows.
- `src/styles/main.css` — affiliate-styling verwijderd; `.container-result` padding-bottom verhoogd naar 80px; `.container-result.theme-rose::after` bottom -> 48px.
- `public/config/content.json` — `affiliate_ja` & `affiliate_nee` leeggemaakt.
- Memory bank (dit bestand + activeContext.md) bijgewerkt met sessie-notities.

## Build & QA
- Lokaal: devserver aanbevolen (`npm run dev`) voor visuele check.
- Tests: overweeg Playwright visual snapshot voor share-card in CI.

## Openstaande taken / follow-ups
- [ ] Visuele verificatie over browsers/devices (inclusief mobile screenshots).
- [ ] Voeg visual regression test toe voor de share-card in CI (Playwright / snapshot).
- [ ] Eventuele herintroductie van affiliate‑content voorzien van feature-flag / A/B en contrast‑vriendelijke logo‑varianten.
- [x] Memory bank bijgewerkt