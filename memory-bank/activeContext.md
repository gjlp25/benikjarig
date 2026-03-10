# activeContext.md — benikvandaagjarig.nl

## Laatste status (geüpdatet 2026-03-10)

Kort overzicht van recente acties (nieuw):
- Feature: dedicated off-screen share-card voor beeldexport (html2canvas) — geïmplementeerd in `src/scripts/sharing.ts`.
- Export: download target gewijzigd naar `#share-card`; scale 2 toegepast.
- UI: affiliate-kaarten en -data tijdelijk verwijderd uit UI en `public/config/content.json`.
- Fix: meerdere merge-conflict markers verwijderd en `src/scripts/main.ts` opgeschoond; TypeScript-typing aangepast.
- SEO: canonical + favicon toegevoegd; OG/Twitter meta bijgewerkt naar dynamische OG-endpoint; `public/sitemap.xml` voorzien van `lastmod`.
- Analytics: Vercel Analytics script-tag toegevoegd aan `src/index.html` (`/_vercel/insights/script.js`) en gepusht.
- Nieuwe sectie: "Ook jarig vandaag" banner toegevoegd in `src/scripts/main.ts` (renderTodayBanner) — rendert direct boven het formulier en leest `public/config/today.json`.
- Automatisering: n8n-workflow aanbevolen die dagelijks `public/config/today.json` bijwerkt via GitHub Contents API (commit → CI → deploy).
- Commits: meerdere commits naar main (o.a. conflict-fix, SEO updates, analytics tag, today-banner). Zie recente commits voor hashes (b4d3266, 5929a61, 0aee579, aa86ef5, …).

## Wat werkt nu
- "Bewaar als afbeelding" levert compacte, gebrande 1:1 PNG zonder UI-knoppen.
- Share-card bouwt met inline CSS voor betrouwbare html2canvas renders.
- "Vandaag" banner laadt non-blocking vanaf `/config/today.json` en toont tot 3 namen.
- CI vangt lint/type-check/build fouten; recent falen door merge-markers is opgelost.
- Vercel Analytics is toegevoegd (script-tag). Dashboard toont events na deploy.

## Openstaande taken / follow-ups (prioriteit)
- [ ] Voeg `public/config/today.json` toe (n8n zal dit dagelijks updaten). Voorbeeldbestand is nog nodig.
- [ ] Visuele verificatie op live (cross-browser, mobile).
- [ ] Playwright visual regression: snapshot toevoegen voor share-card & today-banner.
- [ ] (Optioneel) Re-introduce affiliate-kaarten achter feature-flag als monetization terug mag.
- [ ] Documenteer logo-variantstrategie als logo weer opgenomen wordt.

## Beslissingen / overwegingen
- Productprioriteit: share/branding & share-experience eerst; monetization tijdelijk uitgeschakeld.
- Share-card en today-banner gebruiken client-side JSON bestanden onder `public/config/` zodat n8n of scripts eenvoudig kunnen committen updates zonder server changes.
- CI blijft actief en handhaaft codekwaliteit (lint + tsc + build). Dit ving een kritieke fout (merge markers).