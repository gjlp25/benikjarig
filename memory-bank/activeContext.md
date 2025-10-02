# activeContext.md — benikvandaagjarig.nl

## Huidige focus (geüpdatet 2025-10-02)

- Finaliseer en verifieer UI-verbeteringen: result-design (theme: rose), DOM-order fixes, en accessibility tweaks.
- Documenteer recente codewijzigingen en next steps in de Memory Bank.
- Rond resterende taken af: visual-regressie in CI, gerichte E2E-assertions en cleanup CSS.

## Recente wijzigingen (laatste updates)
- Datum: 2025-10-02
- CI & infra:
  - GitHub Actions workflow toegevoegd/uitgebreid: `.github/workflows/ci.yml` (lint, type-check, Vitest, build, Playwright E2E met axe, visual-regression stap, upload test-results).
- Tests & verificatie:
  - Vitest unit toegevoegd voor `shouldUseWebShare` en lokaal succesvol uitgevoerd.
  - Playwright E2E tests inclusief axe-playwright geconfigureerd en uitgevoerd.
  - Visuele verificatie: screenshots opgeslagen in `test-results/visual/` en baseline snapshots toegevoegd onder `tests/e2e/__snapshots__/`.
  - Playwright visual-spec toegevoegd: `tests/e2e/visual.spec.ts`.
- Documentatie:
  - `readme.md` aangemaakt met quick-start, tests, CI-overzicht en Memory Bank verwijzingen.
  - `memory-bank/progress.md` bijgewerkt met recente status en changelog.
- Assets:
  - Statische OG-fallbacks toegevoegd: `public/og-default.svg` en `public/og-is-jarig.svg`.
- UI/CSS/JS:
  - DOM-order fixes en nieuwe `theme-rose` result-design aanwezig (zie `src/scripts/main.ts` en `src/styles/main.css`).
  - Accessibility-tweaks en reduced-motion ondersteuning zijn toegepast.

## Status nu
- Visuele en DOM-order issues tussen formulier, result en footer zijn opgelost.
- Unit- en E2E-tests draaien lokaal; axe-checks uitgevoerd.
- Baseline screenshots aanwezig voor visual regression; Playwright visual tests scaffolded.
- CI-workflow draait alle checks on PR (visual step runs separately and is allowed to fail by default).

## Volgende stappen (prioriteit)
1. Integratie en review van visual-regressie in CI:
   - Monitor visuele diffs in PRs; configureer policy for baseline updates.
2. Voeg gerichte E2E-assertions toe:
   - Share-button wrapping (target: 480–600px) en DOM-order checks where not present.
3. Cleanup en finalisatie:
   - Verwijder verouderde CSS-regels en refactor kleine layout quirks for narrow viewports.
4. Open PR met huidige wijzigingen zodat CI alle checks valideert; na review merge en release-tag aanmaken.
5. Optioneel: genereer PNG-varianten van OG-fallbacks als bepaalde crawlers dat vereisen.

## Actieve beslissingen
- Modals blijven in document flow (geen fixed overlays) voor voorspelbare layout en betere a11y.
- Privacy-first: geen datum of PII opslaan; analytics alleen na expliciete toestemming.
- Feestelijke UI enkel toepassen voor echte "jarig" resultaten (conditioneel).

## Referenties
- Screenshots: `test-results/visual/`
- Baseline snapshots: `tests/e2e/__snapshots__/`
- CI workflow: `.github/workflows/ci.yml`
- Visual helper: `tools/visual-verify.js`
- Tests: `tests/e2e/`, `src/tests/`
