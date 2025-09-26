# progress.md — benikvandaagjarig.nl

## Statusoverzicht (bijgewerkt 2025-09-18)

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
- ✅ Accessibility-focused fixes applied:
  - Dialogs and result modals now render into a `modal-root` appended to `document.body` (outside `<main>`)
  - `aria-modal` and `aria-labelledby` added; focus managed on modal open
  - While a modal is open, `<main>` is marked with `aria-hidden` to hide background content from assistive tech
  - Consent banner moved to `document.body` and restores focus/aria state on teardown
  - Removed problematic explicit roles (e.g., `role="group"` removed for share buttons)
  - Several color contrast improvements applied (headings, buttons, leap-year message, footer, muted text)

### Wat moet nog gebouwd / verbeterd worden
- [ ] Fix remaining Axe violations reported by E2E (color-contrast on 4 nodes; region/landmark; occasional aria-role)
  - These are localized in `test-results/.../error-context.md` and require small, targeted CSS/markup tweaks for the flagged selectors.
- [ ] Add static fallback OG images in `public/og-birthday.svg` and `public/og-not-birthday.svg` (optional; currently dynamic endpoint covers cases)
- [ ] Add Vitest unit for `shouldUseWebShare`
- [ ] Add additional E2E checks for share flows and OG endpoint to CI
- [ ] Verify `vercel.json` and deploy to staging, validate social crawlers (Facebook/Twitter) and caching headers
- [ ] Add axe-run to CI pipeline and set acceptable thresholds (fail on serious/regression)

### Bekende issues
- E2E (axe-playwright) currently reports a small set of accessibility items on the "happy path" test; these are actionable and scoped to a few selectors (contrast + region). Changes made reduced the number of violations, further targeted fixes are low-risk.
- Some editor write attempts required careful replace blocks; all current file changes are saved and in repo.
- Consider generating raster OGs (PNG) if social platforms require it.

### Volgende korte termijn stappen (aanbevolen)
1. Inspect `test-results/birthday-flow-happy-path---today-is-birthday-chromium/error-context.md` and map each reported node to a selector.
2. Apply targeted CSS/markup patches for the flagged selectors (contrast / role corrections).
3. Re-run Playwright E2E (axe-playwright) until violations are cleared.
4. Add axe checks to CI and add unit test for `shouldUseWebShare`.
5. Add static fallback OGs and deploy to staging; validate metadata with social debuggers.

### Change log (recent)
- 2025-09-18 — Accessibility improvements:
  - Move modals to `modal-root` in `document.body`
  - `aria-hidden` handling for `<main>` while modal open
  - Consent banner moved to document body; focus/teardown handling
  - Removed problematic roles and tightened color palette for improved contrast
  - Re-ran Playwright E2E; captured axe error contexts for final targeted fixes
- 2025-09-17 — Added dynamic OG endpoint and initial sharing UX work
