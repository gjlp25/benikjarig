# progress.md — benikvandaagjarig.nl

## Statusoverzicht (bijgewerkt 2026-03-05)

### Recent afgeronde taken
- ✅ Root `index.html` gearchiveerd naar `backup/root-index-archive-2026-03-05/index.html`
- ✅ `robots.txt` toegevoegd in `public/`
- ✅ `sitemap.xml` toegevoegd in `public/`
- ✅ CSP `img-src` aangescherpt in `vercel.json`
- ✅ GDPR: `withdrawConsent()` toegevoegd en footer-link "Verwijder toestemming" geïmplementeerd
- ✅ Confetti canvas cleanup toegevoegd (canvas verwijderd na animatie)
- ✅ Vite build checks toegevoegd (reportCompressedSize, chunkSizeWarningLimit)
- ✅ Visual-regression tests aangepast: worden alleen uitgevoerd op CI/Linux of expliciet Linux-dev
- ✅ `.gitignore` bijgewerkt om `backup/` uit te sluiten
- ✅ `theme-color` meta toegevoegd in `src/index.html`
- ✅ `dom-helpers.ts` verbeterd met null-checks en veilige API
- ✅ `sharing` unit-test uitgebreid met scenario waar `navigator.share` faalt
- ✅ `vite.config.ts` toegevoegd (migratie van JS-config)
- ✅ Lighthouse CI config (`lighthouserc.json`) toegevoegd

### Tests & verificatie
- Unit tests (Vitest) en E2E (Playwright) blijven de primaire verificatie.
- Visual tests zijn geprepareerd om in een containerized Linux-omgeving (CI/Docker) betrouwbare resultaten te geven.
- Aanbevolen: voer visual tests binnen Docker om platform-artefacten verder te minimaliseren.

### Openstaande (optioneel / lage inspanning)
- Privacy stylesheet pipeline: de huidige `src/privacy.html` gebruikt `./styles/privacy.css` en wordt door Vite opgenomen tijdens build — geen actie strikt vereist.
- Memory bank verdere updates (dit document is geüpdatet).
- Overige optionele verbeteringen: Lighthouse runner in CI integreren (Action), extra tests voor sharing fallbacks, of UI polish.

### Volgende aanbevolen stappen
1. Run full build & test locally:
   - npm ci
   - npm run build
   - npx playwright install
   - npm run test
   - npm run test:e2e (optioneel inside docker-compose for parity)
2. Run Lighthouse CI in CI pipeline (add GH Action using lighthouserc.json).
3. Review backup files and remove any stale artifacts not needed in repo.