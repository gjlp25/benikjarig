# activeContext.md — benikvandaagjarig.nl

## Laatste status (geüpdatet 2026-03-06)

Kort overzicht van recente acties:
- Build-time injectie toegevoegd: Vite define __BUILD_DATE__ (vite.config.ts) en TypeScript-declaratie (src/types/env.d.ts).
- Security headers aangescherpt in vercel.json: striktere CSP (geen 'unsafe-inline'), beperkter img-src, uitgebreid Permissions-Policy en Cache-Control voor HTML.
- Privacyverklaring bijgewerkt (src/privacy.html) — tekst geactualiseerd en datum aangepast naar 2026-03-05.
- Sharing: Twitter/X share-URL aangepast naar x.com (src/scripts/sharing.ts).
- Favicon/logo: assets toegevoegd aan public/ (favicon.png, logo.png) maar uiteindelijk niet geactiveerd in HTML (wijziging in index.html en footer teruggedraaid).
- Kleine UI cleanup: footer-logo verwijderd en favicon-links uit index.html verwijderd per gebruikersverzoek.
- Alle codewijzigingen gecommit en gepusht naar main.

## Wat werkt nu
- Build-time metadata wordt automatisch ingesloten in builds.
- Strakke security headers zijn aanwezig voor hosting op Vercel.
- Consent flow en privacy-tekst zijn up-to-date en documenteert dat er geen persoonlijke gegevens worden opgeslagen.
- Social sharing werkt zoals bedoeld, inclusief Web Share API fallback en X/twitter URL correct.

## Openstaande taken (prioriteit)
1. Verifieer headers en CSP na deploy (SecurityHeaders.io / Mozilla Observatory).
2. Controleer OG API (api/og) onder strengere CSP en pas indien nodig bronnen toe.
3. (Optioneel) Verwijder ongebruikte assets uit public/ als je ze niet wilt bewaren.

## Beslissingen / overwegingen
- We bewaren `favicon.png` en `logo.png` in `public/` als assets voor later gebruik, maar houden de live HTML schoon totdat je expliciet wil activeren.
- Vercel blijft de aanbevolen hostingoptie.