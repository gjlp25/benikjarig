# activeContext.md — benikvandaagjarig.nl

## Laatste status (geüpdatet 2026-03-08)

Kort overzicht van recente acties (nieuw):
- Feature: compacte "share-card" toegevoegd als off-screen render-target voor beeldexport (500×500, inline styles). Implementatie: `buildShareCard(opts)` in `src/scripts/sharing.ts`.
- Export: `downloadResultCard()` aangepast om `#share-card` te capturen (html2canvas, scale 2) in plaats van `.container-result`. Dit levert een compacte 1:1 afbeelding zonder knoppen of affiliate‑kaarten.
- Integratie: `src/scripts/main.ts` is bijgewerkt om `buildShareCard()` aan te roepen in alle result‑branches (jarig / niet-jarig / schrikkeljaar) en zo de share-card direct voor te bereiden na het tonen van de resultaten.
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
- Accessibility: share-card heeft `aria-hidden="true"` en beïnvloedt geen screen reader flow.