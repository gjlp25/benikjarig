# benikvandaagjarig.nl — README

Korte projectoverzicht
- Doel: Snel controleren of iemand vandaag jarig is en dit makkelijk delen.
- Stack: Vanilla HTML/TypeScript + Vite. Styling: moderne CSS met custom properties.
- Privacy-first: geen geboortedata opgeslagen; cookieless analytics (Plausible/Umami pattern) loaded only after explicit consent.

Belangrijke features (huidige status)
- Jarig-check met schrikkeljaar-logica en leeftijdsberekening — geïmplementeerd
- Confetti celebration (canvas-confetti, lazy-loaded) — behouden
- Ballonnen en automatische geluidseffecten — verwijderd per gebruikerswens
- Share: Web Share API + fallback links; native share opens only on explicit share-button click
- Consent: consent banner implemented; Plausible lazy-load after consent
- Security: vercel.json contains baseline security headers and CSP entries for analytics origin
- Tests: Vitest (unit) + Playwright (E2E) configured; E2E passing locally

Run locally
- Install: npm install
- Dev server: npm run dev
- Build: npm run build
- Preview production build: npm run preview
- Unit tests: npm run test
- E2E tests: npm run test:e2e

Memory Bank (source-of-truth)
- memory-bank/projectbrief.md
- memory-bank/productContext.md
- memory-bank/systemPatterns.md
- memory-bank/techContext.md
- memory-bank/activeContext.md
- memory-bank/progress.md

Next recommended steps
1. Visual parity check: compare src build output to root `index.html` prototype and tweak styles if needed.
2. Add CI workflow (lint, type-check, unit tests, E2E, axe-core a11y checks).
3. Implement dynamic OG-images if desired.
4. Finalize deployment to Vercel and monitoring (Core Web Vitals).

Notes
- All recent changes are documented in the Memory Bank. The prototype `index.html` at project root remains unchanged as canonical backup.
