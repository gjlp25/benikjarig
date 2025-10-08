# progress.md — benikvandaagjarig.nl

## Statusoverzicht (bijgewerkt 2025-10-08)

### Wat werkt al
- ✅ Prototype in index.html: complete celebratie flow, leap year handling, leeftijdsberekening
- ✅ Nederlandse UI, toegankelijkheid (ARIA, toetsenbord, contrast) — ongoing improvements
- ✅ Animaties: confetti (canvas-confetti, lazy loaded)
- ✅ Social sharing: WhatsApp, Facebook, X, LinkedIn, Web Share API fallback
- ✅ Responsive design, mobile-first
- ✅ Geen data-opslag, alles client-side
- ✅ Build toolchain en scripts (Vite, TypeScript, ESLint, Prettier)
- ✅ Playwright E2E and Vitest configured and running locally
- ✅ Dynamic OG endpoint geïmplementeerd: `api/og/route.ts` (SVG 1200×630)
- ✅ Consent banner + cookieless analytics (consent-first)
- ✅ Share UX: anchors + native-share button, clipboard fallback, ARIA live announcements
- ✅ Accessibility-focused fixes toegepast en getest
- ✅ Layout fixes toegepast (DOM-order, modal-root, footer placement)

### Nieuw toegevoegde functionaliteit (recent)
- ✅ Docker: toegevoegd `Dockerfile`, `.dockerignore`, `nginx.conf` en `docker-compose.yml` voor lokale/container deployment testing.
- ✅ DEPLOYMENT.md: uitgebreide deployment guide voor lokale Docker host en image-transfer workflow.
- ✅ Randomized messages: niet-jarig & jarig messages ge-implementeerd in `src/scripts/main.ts` (30+ not-birthday, 25+ birthday lines).
- ✅ Share preview screenshots: gegenereerd previews voor Facebook / X / WhatsApp / LinkedIn en opgeslagen onder `test-results/visual-share/`.
- ✅ Privacy update: `src/privacy.html` aangepast om Vercel Analytics als (optionele) provider te beschrijven; oude Plausible-verwijzingen verwijderd.
- ✅ Security hardening: `vercel.json` CSP opgeschoond (Plausible entries verwijderd) en overige security headers bevestigd.

### Wat moet nog gebouwd / verbeterd worden
- [ ] Optioneel: verwijder 'unsafe-inline' uit CSP door inline scripts naar externe bestanden te verplaatsen en CSP hashes te gebruiken.
- [ ] (Optioneel) Extract messages naar een aparte i18n / messages module voor makkelijker beheer en vertalingen.
- [ ] (Optioneel) Voeg unit test voor random message selection (Vitest) om valid index selection te valideren.
- [ ] (Opslag) Bij inzetten van externe analytics of embeds: update CSP en privacytekst overeenkomstig.

### Bekende issues (open)
- Minor visual tweaks voor very-narrow viewports kunnen nog nodig zijn (share-button wrapping thresholds).
- Als analytics provider verandert, moet consent-logica en privacytekst opnieuw geverifieerd worden.

### Volgende korte termijn stappen (aanbevolen)
1. Review `DEPLOYMENT.md` en kies deploy-strategie voor testserver (build-on-server of push image).
2. (Security) Verwijder 'unsafe-inline' uit `vercel.json` CSP door inline scripts in `src/` te verplaatsen en met hashes te werken.
3. Voeg kleine Vitest unit toe voor randomizers en run in CI.
4. Commit en tag release; laat CI draaien en controleer visual diffs in PR.

### Change log (recent)
- 2025-10-08 — Infrastructure & policy updates:
  - Added Docker support (Dockerfile, nginx.conf, .dockerignore, docker-compose.yml) and DEPLOYMENT.md.
  - Implemented randomized messages for birthday / not-birthday in `src/scripts/main.ts`.
  - Generated social preview screenshots into `test-results/visual-share/`.
  - Updated privacy statement to reference Vercel Analytics and removed Plausible mentions.
  - Hardened CSP in `vercel.json` by removing obsolete plausible.io origins.
- 2025-10-04 — Memory bank reviewed on user request; readiness checklist for public deployment.
- 2025-10-02 — Playwright DOM-order test added, axe-playwright configured, visual verification captured.
- 2025-09-26 — UI/DOM fixes and accessibility improvements.

---

### Memory Bank — Update log
- 2025-10-08 — Memory bank updated: added infra/deployment docs, security hardening, privacy update, randomized messages, and generated share-preview assets. Progress.md reflects current project state and recommended next actions.
- 2025-10-04 — Memory bank reviewed and validated (no functional regressions).
