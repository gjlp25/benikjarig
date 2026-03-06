# progress.md — benikvandaagjarig.nl

## Statusoverzicht (bijgewerkt 2026-03-06)

### Recent afgeronde taken
- ✅ Injectie van build-datum via `__BUILD_DATE__` (vite.config.ts + src/types/env.d.ts).
- ✅ Strengere security headers toegevoegd in `vercel.json` (CSP, Permissions-Policy, HSTS, Cache-Control voor HTML).
- ✅ Privacyverklaring geactualiseerd (tekst + datum).
- ✅ Twitter → X share-URL bijgewerkt (src/scripts/sharing.ts).
- ✅ Tijdelijke favicon/logo-assets toegevoegd aan `public/` (niet geactiveerd in HTML).
- ✅ Revert: favicon-links en footer-logo verwijderd uit HTML per gebruikersverzoek.
- ✅ Alle wijzigingen gecommit en naar `main` gepusht.
- ✅ publicDir toegevoegd aan `vite.config.ts` zodat `/config/content.json` vanuit `public/` wordt geserveerd tijdens development.
- ✅ Affiliate-kaarten functionaliteit geïmplementeerd en gerenderd binnen de resultaatkaart (src/scripts/main.ts + src/styles/main.css).
- ✅ Download van resultaatcard toegevoegd (lazy-load html2canvas, src/scripts/sharing.ts) en getest in dev.
- ✅ Tijdelijke debug-logs verwijderd uit src/scripts/main.ts na verificatie.

### Tests & verificatie
- Aanbevolen: draai de volledige build en run de tests lokaal:
  - npm ci
  - npm run build
  - npx playwright install
  - npm run test
  - npm run test:e2e (optioneel in Docker)
- Voer een security scan (Mozilla Observatory / SecurityHeaders.io) na deploy.

### Openstaande (optioneel / lage inspanning)
- Verwijder of archiveer ongebruikte bestanden in `public/` als je ze niet wilt bewaren.
- Voeg CSP-reporting toe (report-to/report-uri) voor monitoring.
- Integreer Lighthouse CI in de CI workflow.

### Volgende aanbevolen stappen
1. Deploy naar Vercel en verifieer headers.
2. Test OG-image API onder de stricte CSP.
3. Beslis of `public/favicon.png` en `public/logo.png` moeten blijven of verwijderd.