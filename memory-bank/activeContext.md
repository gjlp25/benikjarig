# activeContext.md — benikvandaagjarig.nl

## Huidige focus (geüpdatet)

- Corrigeren van layout-issues tussen formulier, result-card en footer.
- Duidelijke, consistente DOM-volgorde waar `<main>` direct de form container bevat en de result container (`#modal-root`) volgt — footer komt daarna.
- Documentatie (Memory Bank) bijwerken met recente wijzigingen.

## Recente wijzigingen (laatste updates)
- JS:
  - `#modal-root` wordt nu binnen `<main>` geplaatst (direct na `#app`) om correcte DOM-volgorde te garanderen zodat de result card altijd onder het formulier verschijnt.
  - `appendFooter()` plaatst de reale footer direct na `<main>` (fallback naar body als main ontbreekt).
  - Extra safeguard: script controleert verplaatste/voorgaande `#modal-root` en verplaatst deze naar binnen `<main>` bij mount to ensure order.
- CSS:
  - `src/styles/main.css` aangepast om:
    - `main`, `.container` en `#modal-root` dezelfde `max-width` en centrering te geven (max-width: 500px).
    - `#modal-root` marges ingesteld: `margin-top: 24px` (gap naar formulier) en `margin-bottom: 48px` (ruimte naar footer).
    - `.result` en `.leap-year-message` in document flow (`position: static`) met gecentreerde tekst en share-buttons in een horizontale, wrap-capabele rij.
    - Decoratieve top-strip is inside `.result` via `::before` met absolute-positionering maar zonder negatieve marges (card padding reserveert ruimte).
  - Overbodige `padding-bottom` op `main` verwijderd; footer wordt in normale flow gerenderd.
- Accessibility & UX:
  - Modals behouden `role="dialog"`, `aria-modal` en focus management.
  - While modal visible, `<main>` marked `aria-hidden` for assistive tech.
  - Share buttons remain anchors + native share fallback; ARIA live announcements present for clipboard copy.
- Dev:
  - HMR updates applied; dev server running locally (Vite) and reflects CSS/JS changes immediately.

## Status nu
- Overlap issue tussen form en result card is verholpen in DOM en CSS (result card no longer overlaps form).
- Footer is no longer inserted inside the result card in normal flows (JS ensures correct order).
- Share buttons show as a horizontal row and wrap on small screens.
- Some visual spacing and centering tweaks completed; final verification in browser required.

## Volgende stappen
1. Visuele verificatie in verschillende viewports (mobile/desktop) en browsers. Fix any remaining centering or spacing edge cases.
2. Add/adjust responsive breakpoints if share buttons wrap prematurely on specific widths (target wrap < 480–600px).
3. Run Playwright E2E and re-run axe-playwright to ensure no regressions in accessibility.
4. Update `readme.md` and Memory Bank with final deployment notes once verified.
5. Consider adding a small integration test that verifies DOM order (`main > #app > #modal-root` and footer after main).

## Actieve beslissingen
- Keep modals accessible and in-flow (no fixed overlays) to avoid layout overlap and improve predictable DOM order.
- Maintain strict privacy rules: no DOB storage, analytics only after consent.
- Continue prioritizing accessibility and minimal runtime footprint.
