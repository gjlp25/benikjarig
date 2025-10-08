# benikvandaagjarig.nl

Korte samenvatting
Een lichte, prettige gimmick-site die controleert of iemand vandaag jarig is. Interface en copy in het Nederlands. Prototype en productie-implementatie in `src/` en `public/`.

Snelle start
1. Install dependencies
   ```
   npm install
   ```
2. Development
   ```
   npm run dev
   ```
3. Build / preview
   ```
   npm run build
   npm run preview
   ```

Tests
- Unit tests (Vitest)
  ```
  npm test
  ```
- E2E (Playwright)
  ```
  npm run test:e2e
  ```
- Visual verification helper
  ```
  node tools/visual-verify.js
  ```

CI
De CI (`.github/workflows/ci.yml`) voert uit:
- lint, type-check
- unit tests (Vitest)
- Playwright E2E + axe accessibility checks
- build preview

OG afbeeldingen
- Dynamic OG generator endpoint: `/api/og` (SVG 1200×630)
- Static fallbacks available in `public/`:
  - `public/og-default.svg`
  - `public/og-is-jarig.svg`
  Consider adding PNG variants if required for specific crawlers.

Memory Bank
Lees bij voorkeur in deze volgorde:
1. `memory-bank/projectbrief.md`
2. `memory-bank/progress.md`
3. `memory-bank/activeContext.md`

Belangrijke bestanden
- `src/index.html` — prototype / canonical UI
- `src/scripts/*` — verjaardag-logica, animaties, sharing
- `api/og/route.ts` — dynamic OG generator
- `tools/visual-verify.js` — maakt screenshots voor visual verification
- `tests/e2e/` — Playwright tests

Contributing & deploy
- Feature work via branches + PRs targeting `main`
- PR must pass CI (lint, tests, E2E, axe)
- Deploys are automatic via Vercel on `main`

Toekomstige taken
- Integrate visual-regression in CI (Playwright snapshots / image-diff)
- Add targeted E2E assertions for share-button wrapping and DOM-order
- Small visual tweaks for narrow viewports

Contact / Troubleshooting
- Regenerating OG assets: create SVG/PNG in `public/` (1200×630) and commit
- If write_to_file fails in the editor: ensure no diff editors are open and retry

License
MIT
