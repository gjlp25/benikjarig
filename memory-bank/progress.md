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
- [x] Visual verification across devices and browsers (confirm centering & spacing). Screenshots saved to `test-results/visual/` (mobile.png, tablet.png, desktop.png).
- [x] E2E checks: add tests to assert DOM order (`main > #app > #modal-root` and footer after main).
- [x] Axe-playwright: re-run accessibility checks and fix any remaining violations (contrast/landmark issues).
- [x] Add Vitest unit for `shouldUseWebShare`.
- [x] Add static fallback OG images in `public/` (optional; dynamic endpoint exists). Completed: `public/og-default.svg` and `public/og-is-jarig.svg` added as SVG fallbacks and verified non-empty (created via `tools/create-og-images.js` on 2025-10-02). Consider adding PNG variants if preferred for specific social crawlers.
- [x] CI pipeline: lint, type-check, unit tests, E2E, axe checks and build preview. (Created `.github/workflows/ci.yml`.)
- [x] Update `readme.md` with development and deployment instructions.

### Bekende issues (open)
- Minor visual tweaks may still be required for very narrow devices; share-button wrapping thresholds.
- Add targeted E2E assertions so DOM-order regressions are detected early.

### Volgende korte termijn stappen (aanbevolen)
1. Visual verification completed: screenshots captured at mobile/tablet/desktop and saved to `test-results/visual/`. Review screenshots and adjust CSS breakpoints as needed.
2. Adjust responsive breakpoints if share buttons wrap too early (target wrap between 480–600px).
3. Playwright DOM-order test added and axe-playwright re-run (no violations detected). Vitest unit for `shouldUseWebShare` added and passing. A visual verification helper was added at `tools/visual-verify.js`.
4. CI pipeline created (`.github/workflows/ci.yml`) — next: add `readme.md` and finalize Memory Bank. The CI runs lint, type-check, Vitest, Playwright (with axe) and builds the production bundle on push/PR.

### Change log (recent)
- 2025-10-02 — Added Playwright DOM-order test, integrated axe-playwright check (no violations), added Vitest unit for `shouldUseWebShare` (all tests passed), performed visual verification (screenshots saved to `test-results/visual/`), and created CI workflow (`.github/workflows/ci.yml`).
- 2025-09-26 — Applied JS & CSS fixes to ensure correct DOM order and remove overlap between form/result/footer; updated Memory Bank.
- 2025-09-18 — Accessibility improvements and OG endpoint implemented.

---

### Memory Bank — Update log
- 2025-10-04 — Memory bank updated on user request. Reviewed all memory-bank files (`projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`, `activeContext.md`, `progress.md`). No functional code changes were made. Noted current state and readiness for public deployment (Vercel recommended; Netlify/Cloudflare as alternatives). Switched to ACT MODE to proceed with requested updates and next steps.
- Next recommended actions:
  - Decide on hosting provider (Vercel, Netlify, Cloudflare Pages, or GitHub Pages with static OG fallbacks).
  - If proceeding with Vercel, connect repository and verify deploy settings (build: `npm run build`, output: `dist`).
  - If choosing Netlify or Cloudflare Pages, plan migration for `api/og/route.ts` to respective serverless function format and convert `vercel.json` headers to platform-specific config.
  - Commit and tag a release after final review; monitor CI checks and visual diffs in PR.
