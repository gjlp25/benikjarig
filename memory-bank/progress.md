# progress.md — benikvandaagjarig.nl

## Statusoverzicht (bijgewerkt 2025-10-10)

### Wat werkt al
- ✅ Prototype in index.html: complete celebratie flow, leap year handling, leeftijdsberekening
- ✅ Nederlandse UI, toegankelijkheid (ARIA, toetsenbord, contrast) — ongoing improvements
- ✅ Animaties: confetti (canvas-confetti, lazy loaded)
- ✅ Social sharing: WhatsApp, Facebook, X, LinkedIn, Web Share API fallback
- ✅ Responsive design, mobile-first
- ✅ Geen data-opslag, alles client-side
- ✅ Build toolchain en scripts (Vite, TypeScript, ESLint, Prettier)
- ✅ **Alle Playwright E2E en Vitest tests draaien succesvol lokaal.**
- ✅ Dynamic OG endpoint geïmplementeerd: `api/og/route.ts` (SVG 1200×630)
- ✅ Consent banner + cookieless analytics (consent-first)
- ✅ Share UX: anchors + native-share button, clipboard fallback, ARIA live announcements
- ✅ Accessibility-focused fixes toegepast en getest
- ✅ Layout fixes toegepast (DOM-order, modal-root, footer placement)

### Nieuw toegevoegde functionaliteit (recent)
- ✅ **Test Suite Refactor**: DOM-structuur en accessibility tests zijn nu gescheiden (`dom-structure.spec.ts` en `accessibility.spec.ts`).
- ✅ **Accessibility Fixes**: Alle bekende `axe` violations (`region`, `aria-allowed-role`, `aria-hidden-focus`) zijn opgelost.
- ✅ Docker: toegevoegd `Dockerfile`, `.dockerignore`, `nginx.conf` en `docker-compose.yml` voor lokale/container deployment testing.
- ✅ DEPLOYMENT.md: uitgebreide deployment guide voor lokale Docker host en image-transfer workflow.
- ✅ Randomized messages: niet-jarig & jarig messages ge-implementeerd in `src/scripts/main.ts`.
- ✅ Share preview screenshots: gegenereerd previews voor social media.
- ✅ Privacy update: `src/privacy.html` bijgewerkt voor Vercel Analytics.
- ✅ Security hardening: `vercel.json` CSP opgeschoond.

### Wat moet nog gebouwd / verbeterd worden
- [ ] **(Aanbevolen)** Verwijder `continue-on-error: true` uit `.github/workflows/ci.yml` nu alle tests slagen.
- [ ] Optioneel: verwijder 'unsafe-inline' uit CSP door inline scripts naar externe bestanden te verplaatsen en CSP hashes te gebruiken.
- [ ] (Optioneel) Extract messages naar een aparte i18n / messages module voor makkelijker beheer en vertalingen.
- [ ] (Optioneel) Voeg unit test voor random message selection (Vitest) om valid index selection te valideren.

### Bekende issues (open)
- Geen kritieke issues bekend.

### Volgende korte termijn stappen (aanbevolen)
1. **Commit en push** alle recente fixes naar de `dev` branch.
2. **Verwijder `continue-on-error: true`** uit de CI-workflow.
3. Review `DEPLOYMENT.md` en de launch checklist in `projectbrief.md`.
4. Merge `dev` naar `main` om de site te publiceren.

### Change log (recent)
- 2025-10-10 — E2E Test & Accessibility Fixes:
  - Refactored E2E tests into separate DOM structure and accessibility suites.
  - Fixed all outstanding `axe` accessibility violations (`region`, `aria-allowed-role`, `aria-hidden-focus`).
  - All tests are now passing locally.
- 2025-10-08 — Infrastructure & policy updates:
  - Added Docker support and DEPLOYMENT.md.
  - Implemented randomized messages.
  - Generated social preview screenshots.
  - Updated privacy statement and hardened CSP.
- 2025-10-04 — Memory bank reviewed on user request; readiness checklist for public deployment.
- 2025-10-02 — Playwright DOM-order test added, axe-playwright configured, visual verification captured.
- 2025-09-26 — UI/DOM fixes and accessibility improvements.

---

### Memory Bank — Update log
- 2025-10-10 — Memory bank updated: E2E test suite refactored and all accessibility violations fixed. Project is now ready for final review and deployment.
- 2025-10-08 — Memory bank updated: added infra/deployment docs, security hardening, privacy update, randomized messages, and generated share-preview assets.
- 2025-10-04 — Memory bank reviewed and validated (no functional regressions).
