<<<<<<< HEAD
# progress.md — voortgangslog (geüpdatet 2026-03-09)

## Samenvatting huidige status
- Nieuwe feature: dedicated off-screen share-card en verbeterde image-export zijn geïmplementeerd.
- UI-opruiming: affiliate-buttons en -data tijdelijk verwijderd om zichtbaarheid en share-ervaring te prioriteren.
- UX-fix: extra bottom-padding toegevoegd aan result containers om animatie-icoontjes niet over de "Delen" knop te laten vallen.

## Recente wijzigingen (kort)
- `src/scripts/sharing.ts` — `buildShareCard()` + `downloadResultCard()` toegevoegd/gevinaliseerd.
- `src/scripts/main.ts` — affiliate-rendering verwijderd (no-op) en `buildShareCard()` aangeroepen in result flows.
- `src/styles/main.css` — affiliate-styling verwijderd; `.container-result` padding-bottom verhoogd naar 80px; `.container-result.theme-rose::after` bottom -> 48px.
- `public/config/content.json` — `affiliate_ja` & `affiliate_nee` leeggemaakt.
- Memory bank (dit bestand + activeContext.md) bijgewerkt met sessie-notities.

## Build & QA
- Lokaal: devserver aanbevolen (`npm run dev`) voor visuele check.
- Tests: overweeg Playwright visual snapshot voor share-card in CI.

## Openstaande taken / follow-ups
- [ ] Visuele verificatie over browsers/devices (inclusief mobile screenshots).
- [ ] Voeg visual regression test toe voor de share-card in CI (Playwright / snapshot).
- [ ] Eventuele herintroductie van affiliate‑content voorzien van feature-flag / A/B en contrast‑vriendelijke logo‑varianten.
- [x] Memory bank bijgewerkt
=======
# progress.md — voortgangslog (geüpdatet 2026-03-08)

## Samenvatting huidige status
- Nieuwe feature: dedicated off-screen share-card en verbeterde image-export zijn geïmplementeerd en gemerged naar de werkbranch.
- Lokale devserver draait voor snelle verificatie (Vite).
- Een poging om het logo in de share-card op te nemen is gemaakt maar op verzoek van de gebruiker onmiddellijk teruggedraaid.

## Recente wijzigingen (kort)
- Implementatie: `buildShareCard()` toegevoegd aan `src/scripts/sharing.ts`.
- `downloadResultCard()` aangepast om `#share-card` te capturen met html2canvas op een vaste 500×500 px card (scale 2).
- `src/scripts/main.ts` bijgewerkt om `buildShareCard()` op het juiste moment aan te roepen.
- UI-experiment: logo tijdelijk toegevoegd en daarna teruggedraaid naar tekst‑branding.

## Build & CI
- Lokaal: devserver gestart (`npm run dev`). Aanbevolen: run `npm run build` en CI pipeline voor volledige verificatie.
- Testen: handmatige verificatie aanbevolen (download PNGs, controleer contrast en snijrand). Optioneel: voeg een Playwright visual test toe.

## Openstaande taken / follow-ups
- [ ] Visuele verificatie over browsers/devices (inclusief mobile screenshots).
- [ ] Overweeg logo‑variant(en) en test strategy als gebruiker terug wil dat logo opgenomen wordt.
- [ ] Voeg visual regression test toe voor de share-card in CI (Playwright / snapshot).
- [x] Update memory bank met deze sessie (deze wijziging).

## Besluiten
- Default: geen logo in de gegenereerde share-image tenzij expliciet gewenst.
- Gebruik inline stijlen voor off‑screen share-card om html2canvas-compatibiliteit te maximaliseren.
- Keep it simple: compacte, snel leesbare 1:1 afbeeldingen zonder functionele UI-elementen.
>>>>>>> 0581c0c87746f6108f4f270638aa0f5631f7826f
