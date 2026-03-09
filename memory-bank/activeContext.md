# activeContext.md — benikvandaagjarig.nl

<<<<<<< HEAD
## Laatste status (geüpdatet 2026-03-09)
=======
## Laatste status (geüpdatet 2026-03-08)
>>>>>>> 0581c0c87746f6108f4f270638aa0f5631f7826f

Kort overzicht van recente acties (nieuw):
- Feature: compacte "share-card" toegevoegd als off-screen render-target voor beeldexport (500×500, inline styles). Implementatie: `buildShareCard(opts)` in `src/scripts/sharing.ts`.
- Export: `downloadResultCard()` aangepast om `#share-card` te capturen (html2canvas, scale 2) in plaats van `.container-result`. Dit levert een compacte 1:1 afbeelding zonder knoppen of affiliate‑kaarten.
- Integratie: `src/scripts/main.ts` is bijgewerkt om `buildShareCard()` aan te roepen in alle result‑branches (jarig / niet-jarig / schrikkeljaar) en zo de share-card direct voor te bereiden na het tonen van de resultaten.
<<<<<<< HEAD
- Branding: logo‑injectie in de share-card werd getest maar op verzoek teruggedraaid — share-card gebruikt nu tekst‑only branding ("benikvandaagjarig.nl").
- Monetization change: affiliate‑cards verwijderd uit de UI per productbesluit:
  - `src/scripts/main.ts` — affiliate-rendering verwijdert (no-op).
  - `public/config/content.json` — `affiliate_ja` & `affiliate_nee` leeggemaakt.
  - `src/styles/main.css` — affiliate CSS-regels verwijderd.
- UX tweak: extra spacing toegevoegd aan result containers zodat geanimeerde icoontjes niet de share-knoppen overlappen:
  - `.container-result` padding-bottom verhoogd naar 80px.
  - `.container-result.theme-rose::after` bottom verplaatst naar 48px.
- Dev: bestanden aangepast en lokaal geverifieerd; aanbevolen: run `npm run dev` voor visuele controle.

## Wat werkt nu
- De "Bewaar als afbeelding" knop downloadt een compacte, gebrande 1:1 PNG (geen knoppen/affiliate‑kaarten).
- Share-card bouwt consistent met inline CSS zodat html2canvas betrouwbare renders produceert.
- UI is opgeschoond van affiliate-kaarten om zichtbaarheid/branding en share-ervaring te prioriteren.
- Animaties staan nog aan, maar de layout voorkomt overlap met belangrijke knoppen.

## Openstaande taken / follow-ups (prioriteit)
1. Visuele verificatie: controleer gedownloade afbeeldingen en UI op meerdere devices/browsers (contrast, fonts, rendering).
2. (Optioneel) Als monetization later terug mag: herstel data‑driven affiliate-kaarten, of maak feature‑flag / toggle; bewaar types/shape in code.
3. Voeg visual regression test toe voor share-card in CI (Playwright snapshot).
4. Documenteer logo-variant‑strategie (contrast‑vriendelijke versies) voordat logo weer wordt opgenomen.

## Beslissingen / overwegingen
- Productprioriteit: zichtbaarheid en share‑ervaring eerst; monetization (affiliate cards) staat tijdelijk uit.
- Share‑card rendering: gebruik inline styles en off‑screen element voor html2canvas-compatibiliteit.
=======
- Experimentele wijziging: logo (`/public/logo.png`) tijdelijk in de share-card toegevoegd met een inline CSS-filter om zichtbaarheid op lichte achtergronden te garanderen. De gebruiker vroeg direct om deze wijziging terug te draaien.
- Revert: logo‑invoeging verwijderd; share-card is teruggezet naar de oorspronkelijke tekst-only branding ("benikvandaagjarig.nl" bovenin). De rest van de share-card functionaliteit bleef actief.
- Dev: Vite devserver gestart tijdens verificatie (http://localhost:5173).

## Wat werkt nu
- De "Bewaar als afbeelding" knop downloadt nu een compacte, gebrande 1:1 PNG (geen knoppen/affiliate-kaarten).
- De share-card wordt consistent gebouwd met inline CSS zodat html2canvas betrouwbare renders produceert.
- Alle drie flows (jarig / niet-jarig / schrikkeljaar) produceren een passende share-card en roepen `buildShareCard()`.

## Openstaande taken / follow-ups (prioriteit)
1. Visuele verificatie: controleer gedownloade afbeeldingen op meerdere devices/browsers (contrast, fonts, rendering). (aanraden: Playwright visual checks / handmatige controle)
2. (Optioneel) Logo-varianten: als we het logo toch willen opnemen, maak 1–2 contrast‑vriendelijke logo‑varianten (donker / wit) of kies een dynamische filter‑strategie en test deze. (Wens van gebruiker: revert uitgevoerd — wacht op expliciete heraanvraag.)
3. (Optioneel) Persistente QA: voeg een e2e visual test voor de share-card toe in `tests/e2e/visual.spec.ts` als onderdeel van CI.
4. Update memory bank: dit bestand en `progress.md` bijwerken met de uitgevoerde wijzigingen (huidige stap: afgerond).

## Beslissingen / overwegingen
- Keuze: share-card wordt off‑screen opgebouwd met inline styles (betrouwbaarheid voor html2canvas > onderhoud via CSS-bestanden).
- Logo: niet automatisch ingesloten zonder expliciete goedkeuring van de gebruiker (privacy/branding/esthetiek). Als de gebruiker het logo later wil, adviseren we vooraf gegenereerde logo‑variants of inline filter‑fine‑tuning.
>>>>>>> 0581c0c87746f6108f4f270638aa0f5631f7826f
- Accessibility: share-card heeft `aria-hidden="true"` en beïnvloedt geen screen reader flow.