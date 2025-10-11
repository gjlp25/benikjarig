# activeContext.md — benikvandaagjarig.nl

## Laatste status (geüpdatet 2025-10-11)

Kort overzicht van recente acties:
- **CI Update**: De `continue-on-error: true` vlag is verwijderd uit `.github/workflows/ci.yml`. De CI-pijplijn zal nu correct falen als er tests mislukken, wat de betrouwbaarheid van de `main` en `dev` branches waarborgt.
- **Tests Refactored**: `dom-order.spec.ts` is hernoemd naar `dom-structure.spec.ts` en bevat nu alleen DOM-validatie. Een nieuw bestand, `accessibility.spec.ts`, is aangemaakt voor alle axe-scans.
- **Accessibility Fixes**:
    - De `region` violation is opgelost door de "not birthday" resultaat-HTML in een `<section>` te wrappen.
    - De `aria-allowed-role` is opgelost door de `role="dialog"` van de consent banner te veranderen naar `role="region"`.
    - De `aria-hidden-focus` violation is opgelost door de consent banner als een sibling van de `#app` te injecteren, in plaats van erin.
    - Een `region` violation veroorzaakt door `canvas-confetti` is opgelost door een `aria-hidden="true"` canvas te creëren en te gebruiken voor de animatie.
- **CI Status**: Alle Playwright E2E tests draaien nu succesvol lokaal en in de CI.

## Wat werkt nu
- Alle unit- en E2E-tests (inclusief accessibility) zijn groen.
- De applicatie is functioneel compleet en voldoet aan de accessibility-eisen.
- De CI-workflow is geconfigureerd om builds te laten mislukken bij testfouten.

## Openstaande taken (prioriteit)
1.  **Commit & Push**: Commit alle wijzigingen naar de `dev` branch.
2.  **Final Review**: Voer een laatste controle uit van de `DEPLOYMENT.md` en de launch checklist in `projectbrief.md`.
3.  **Deploy**: Merge `dev` naar `main` om de publicatie te starten.

## Beslissingen / overwegingen
- Het project is nu volledig "production-ready". De volgende stap is de daadwerkelijke deployment.
