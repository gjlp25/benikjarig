# progress.md — benikvandaagjarig.nl

## Statusoverzicht (bijgewerkt 2025-09-26)

### Wat werkt al
- ✅ Prototype in index.html: complete celebratie flow, leap year handling, leeftijdsberekening
- ✅ Nederlandse UI, toegankelijkheid (ARIA, toetsenbord, contrast) — ongoing improvements
- ✅ Animaties: confetti (canvas-confetti, lazy loaded)
- ✅ Social sharing: WhatsApp, Facebook, X, LinkedIn, Web Share API fallback
- ✅ Responsive design, mobile-first
- ✅ Geen data-opslag, alles client-side
- ✅ Build toolchain en scripts (Vite, TypeScript, ESLint, Prettier)
- ✅ Playwright E2E and Vitest configured and running locally
- ✅ Dynamic OG endpoint implemented: `api/og/route.ts` (SVG 1200×630)
- ✅ Consent banner + cookieless analytics (Plausible) with lazy load after consent
- ✅ Share UX: anchors + native-share button, clipboard fallback, ARIA live announcements
- ✅ Accessibility-focused fixes applied and tracked (aria-hidden on main, dialog roles, focus management)
- ✅ Layout fixes applied to prevent overlap between form/result/footer:
  - `#modal-root` insertion moved inside `<main>` (script)
  - `appendFooter()` places footer after `<main>`
  - CSS unified widths/centering and consistent margins

### Wat moet nog gebouwd / verbeterd worden
- [ ] Visual verification across devices and browsers (confirm centering & spacing).
- [ ] E2E checks: add tests to assert DOM order (`main > #app > #modal-root` and footer after main).
- [ ] Axe-playwright: re-run accessibility checks and fix any remaining violations (contrast/landmark issues).
- [ ] Add Vitest unit for `shouldUseWebShare`.
- [ ] Add static fallback OG images in `public/` (optional; dynamic endpoint exists).
- [ ] CI pipeline: lint, type-check, unit tests, E2E, axe checks and build preview.
- [ ] Update `readme.md` with development and deployment instructions.

### Bekende issues (open)
- Minor visual tweaks may still be required for very narrow devices; share-button wrapping thresholds.
- Add targeted E2E assertions so DOM-order regressions are detected early.

### Volgende korte termijn stappen (aanbevolen)
1. Run visual verification in Chrome/Firefox/Safari on desktop and mobile widths.
2. Adjust responsive breakpoints if share buttons wrap too early (target wrap between 480–600px).
3. Add Playwright test asserting DOM order and re-run axe-playwright.
4. Add `readme.md` and finalize Memory Bank after verification.

### Change log (recent)
- 2025-09-26 — Applied JS & CSS fixes to ensure correct DOM order and remove overlap between form/result/footer; updated Memory Bank.
- 2025-09-18 — Accessibility improvements and OG endpoint implemented.
