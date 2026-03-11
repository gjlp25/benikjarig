# progress.md — voortgangslog (geüpdatet 2026-03-11)

## Samenvatting huidige status
- Nieuwe feature: dedicated off-screen share-card en verbeterde image-export zijn geïmplementeerd en gemerged naar main.
- UI-opruiming: affiliate-buttons en -data tijdelijk verwijderd om zichtbaarheid en share-ervaring te prioriteren.
- UX-fix: extra bottom-padding toegevoegd aan result containers om animatie-icoontjes niet over de "Delen" knop te laten vallen.
- Virale verbeteringen: countdown/teller toegevoegd voor "niet-jarig" flow en share-card render toont nu "Nog X dagen tot je verjaardag".
- Security: `vercel.json` CSP bijgewerkt om Vercel Analytics (vitals.vercel-insights.com) toe te staan.

## Recente wijzigingen (kort)
- `src/scripts/sharing.ts` — `buildShareCard()` uitgebreid met optionele `daysToNext` en countdown-lijn in de kaart.
- `src/scripts/main.ts` — berekent `daysUntilBirthday()` en toont "Nog X dagen..." in de not-birthday view; geeft `daysToNext` door aan `buildShareCard()`.
- `src/styles/main.css` — affiliate-styling verwijderd; `.container-result` padding-bottom verhoogd om UI overlaps te voorkomen.
- `public/config/content.json` — `affiliate_ja` & `affiliate_nee` tijdelijk leeggemaakt.
- `vercel.json` — CSP `connect-src` uitgebreid met `https://vitals.vercel-insights.com` om Vercel Analytics correct te laten werken.
- Memory bank (dit bestand + activeContext.md) bijgewerkt met sessie-notities.

## Build & QA
- Lokaal: devserver aanbevolen (`npm run dev`) voor visuele check.
- Build: `npm run build` om type-check en bundling te valideren.
- Tests: voeg Playwright visual snapshot toe voor:
  - share-card (with/without countdown)
  - today-banner / celebrity grid
- Accessibility: run `axe-core` audits in CI for result dialogs.

## Openstaande taken / follow-ups
- [ ] Visuele verificatie cross-browser & mobile (inclusief share-card downloads).
- [ ] Playwright visual regression: snapshot toevoegen voor share-card & today-banner.
- [ ] (Optioneel) Re-introduce affiliate‑content achter feature-flag met contrast-geschikte logo‑varianten.
- [ ] Documenteer logo-variantstrategie als logo weer opgenomen wordt.
- [ ] Automatisering: n8n of GH Action die dagelijks `public/config/today.json` bijwerkt.

## Besluiten
- Default: geen logo in de gegenereerde share-image tenzij expliciet gewenst door gebruiker.
- Gebruik inline stijlen voor off‑screen share-card om html2canvas-compatibiliteit te maximaliseren.
- Respecteer privacy: geen geboortedata persistent opslaan, alleen transient client-side berekeningen.
- Focus: share/branding & share-experience eerst; monetization tijdelijk uitgeschakeld.