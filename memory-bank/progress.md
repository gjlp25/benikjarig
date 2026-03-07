# progress.md — voortgangslog (geüpdatet 2026-03-07)

## Samenvatting huidige status
- Development branch is gemerged naar main; wijzigingen zijn naar origin/main gepushed.
- Lokale dev-wijzigingen gecommit vóór merge.
- Build succesvol: `npm run build` produceert /dist zonder fouten.
- CI/Docker build initieel faalde door Vite entry-resolutie voor `privacy.html`; opgelost in `vite.config.ts`.

## Recente wijzigingen (kort)
- Merge: dev → main (alle recente features en fixes).
- Fix: Vite rollup input paden opgelost (gebruik fileURLToPath voor src/index.html en src/privacy.html).
- Fix: `chunkSizeWarningLimit` verhoogd naar 250 om onnodige waarschuwingen voor lazy-loaded html2canvas te onderdrukken.
- UI: "Bewaar als afbeelding" knoptekst aangepast; NEE-resultaat gebruikt nu `.theme-blue`.
- Sharing: sharing.ts bijgewerkt (X/twitter -> x.com); image-export gebruikt lazy-loaded html2canvas.
- public/config/content.json toegevoegd en gebruikt voor dynamische teksten & affiliate-kaarten.
- Memory bank: activeContext.md bijgewerkt met bovenstaande details.

## Build & CI
- Lokaal: `npm run build` succesvol; dist/ gegenereerd.
- Docker: eerder faalde build door Vite-resolutie van privacy.html — nu opgelost; her-test aanbevolen in Docker omgeving.
- Opmerking: html2canvas is relatief groot (gz ~48KB) maar wordt lazy-loaded op user-actie; geen impact op initial bundle.

## Openstaande taken / follow-ups
- Verifieer Docker build opnieuw (docker compose build) in target omgeving.
- Controleer security headers na deploy (observatory / SecurityHeaders.io).
- Overweeg server-side OG-generatie voor consistente social previews (optioneel).
- (Optioneel) Verdere chunking of manualChunks indien gewenst voor CI-linting.
- Run `npm run dev` om dev-server lokaal te verifiëren.

## Besluiten
- Snelle en veilige keuze: html2canvas lazy-loaden en warning onderdrukken — behoud eenvoud en performance.
- Vite input-resolutie is nu OS-onafhankelijk met fileURLToPath; dit voorkomt CI/Docker buildfouten.