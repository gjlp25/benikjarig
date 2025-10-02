# techContext.md — benikvandaagjarig.nl

## Technologieën

- **Framework:** Vanilla JS/HTML met Vite bundler
- **TypeScript:** Strict mode voor type safety en development experience
- **Styling:** Moderne CSS met custom properties, GPU-accelerated keyframes
- **Animatie:** confetti (canvas-confetti, lazy-loaded). Ballonnen en automatische geluidseffecten zijn verwijderd per gebruikerswens.
- **Hosting:** Vercel met auto-deploy op main branch
- **Analytics:** Plausible of Umami (cookieloos, GDPR-proof)
- **Testing:** Vitest (unit), Playwright (E2E + visual snapshots), axe-core (a11y)
- **Linting:** ESLint + Prettier
- **Performance monitoring:** Core Web Vitals in productie

## Development Setup

- **Local dev:** `npm run dev` (Vite dev server)
- **Build:** `npm run build` (tsc + vite build)
- **Preview:** `npm run preview`
- **Lint:** `npm run lint`
- **Type-check:** `npm run type-check`
- **Unit tests:** `npm test` (Vitest)
- **E2E:** `npm run test:e2e` (Playwright)
- **Visual baseline helper:** `node tools/visual-verify.js` (captures screenshots)
- **Recreate static OG assets:** `node tools/create-og-images.js` (creates `public/og-default.svg` and `public/og-is-jarig.svg`)

## Technische beperkingen

- **Geen backend:** Alles draait client-side, geen server calls of data-opslag
- **Bundle size:** ≤ 50KB gzipped (main bundle)
- **Fonts:** System font stack, custom fonts alleen met `display=swap`
- **Confetti:** Alleen laden bij "jarig" (dynamic import); ballonnen en geluid zijn verwijderd in de productie-setup per gebruikerswens.
- **Consent:** Analytics/ads pas na expliciete toestemming
- **Security:** Strakke headers via `vercel.json`, CSP alleen whitelisted origins

## Dependencies

- **canvas-confetti:** Voor feestelijke animaties
- **axe-core / axe-playwright:** Accessibility testing
- **Vitest, Playwright:** Testing frameworks (Playwright gebruikt ook voor visual snapshot checks)
- **ESLint, Prettier:** Code quality

## Visual regression & CI

- Baseline screenshots zijn opgeslagen in `tests/e2e/__snapshots__/` (desktop/tablet/mobile).
- Playwright visual tests live in `tests/e2e/visual.spec.ts` and vergelijken screenshots met die baselines.
- CI workflow voert de visual-spec als aparte stap uit vóór de volledige E2E-run; de stap mag standaard falen zodat PRs niet automatisch geblokkeerd worden terwijl diffs worden beoordeeld.
- Policy voor visuele diffs (aanbevolen):
  1. CI draait visual tests op elke PR en uploadt eventuele diffs / rapporten als artifacts (zie `.github/workflows/ci.yml` -> `visual-artifacts`).
  2. Een reviewer moet visuele diffs handmatig inspecteren in de CI-artifacts.
  3. Als de visual changes gewenst zijn, re-generate de baselines lokaal en commit de bijgewerkte bestanden:
     - Lokale procedure:
       - run: `node tools/visual-verify.js` (of open de site en maak nieuwe screenshots)
       - update en commit baselines: `git add tests/e2e/__snapshots__ && git commit -m "update visual baselines"`
     - Push naar de PR branch; CI zal opnieuw draaien en de visual checks moeten dan slagen.
  4. Als diffs onbedoeld zijn, herstel de UI-fix en push een nieuwe commit vóór het bijwerken van baselines.
  5. Stel een kleine matching-threshold in (bijv. 2%) in tests/e2e/visual.spec.ts om kleine AA-compressie- of antialias-ruis te tolereren.
- Aanbeveling: houd beeldbaselines onder versiebeheer en update ze alleen na expliciete menselijke goedkeuring.

## Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge
- **Graceful fallback:** Animaties en sharing werken ook bij beperkte support

## Notes & tools

- `tools/create-og-images.js` — reproducible script to (re)generate static OG SVGs.
- `tools/visual-verify.js` — helper to capture visual screenshots locally for baseline updates.
- Keep snapshot baselines under source-control and review diffs carefully; do not auto-approve image updates in CI.
