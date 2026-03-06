# activeContext.md — benikvandaagjarig.nl

## Laatste status (geüpdatet 2026-03-06)

Kort overzicht van recente acties:
- Build-time injectie toegevoegd: Vite define __BUILD_DATE__ (vite.config.ts) en TypeScript-declaratie (src/types/env.d.ts).
- Security headers aangescherpt in vercel.json: striktere CSP (geen 'unsafe-inline'), beperkter img-src, uitgebreid Permissions-Policy en Cache-Control voor HTML.
- Privacyverklaring bijgewerkt (src/privacy.html) — tekst geactualiseerd en datum aangepast naar 2026-03-05.
- Sharing: Twitter/X share-URL aangepast naar x.com (src/scripts/sharing.ts).
- Favicon/logo: assets toegevoegd aan public/ (favicon.png, logo.png) maar uiteindelijk niet geactiveerd in HTML (wijziging in index.html en footer teruggedraaid).
- Kleine UI cleanup: footer-logo verwijderd en favicon-links uit index.html verwijderd per gebruikersverzoek.
- Alle codewijzigingen gecommit en gepusht naar main.

## Recente wijzigingen (nieuw)
- publicDir toegevoegd aan `vite.config.ts` (`publicDir: '../public'`) zodat `/config/content.json` correct wordt geserveerd tijdens development.
- Content.json (public/config/content.json) toegevoegd/gebruiked als runtime content (teksten + affiliate data).
- Affiliate-kaarten functionaliteit toegevoegd en geïntegreerd in de result-card (src/scripts/main.ts + src/styles/main.css).
- Download/beeld-export feature toegevoegd (lazy-load html2canvas) en knoptekst gewijzigd naar "🖼️ Bewaar als afbeelding" (src/scripts/sharing.ts).
- Tijdelijke debug-logs tijdelijk toegevoegd voor verificatie en daarna verwijderd uit src/scripts/main.ts.
- NEE-resultaat heeft nu een licht thema `.theme-blue` zodat screenshots / gegenereerde afbeeldingen lichter en vriendelijker zijn.
- Event-delegatie voor share/download is verplaatst naar `#modal-root` (fix voor klikdelegatie).

## Wat werkt nu
- Build-time metadata wordt automatisch ingesloten in builds.
- Strakke security headers zijn aanwezig voor hosting op Vercel.
- Consent flow en privacy-tekst zijn up-to-date en documenteert dat er geen persoonlijke gegevens worden opgeslagen.
- Social sharing werkt inclusief Web Share API fallback; share buttons + native share + image-export werken in dev.
- Dynamic content via `public/config/content.json` wordt geladen en gebruikt voor affiliate-kaarten en teksten.

## Openstaande taken (prioriteit)
1. Verifieer headers en CSP na deploy (SecurityHeaders.io / Mozilla Observatory).
2. Controleer OG API (api/og) onder strengere CSP en pas indien nodig bronnen toe.
3. (Optioneel) Verwijder ongebruikte assets uit `public/` als je ze niet wilt bewaren.
4. Overweeg: Web Share met `files` ondersteuning (deel image als bijlage op mobiele apparaten) — optioneel en platform-gebonden.
5. Productie cleanup: verwijder eventuele resterende console.debug statements en voer final tests uit (build/test/CI).

## Beslissingen / overwegingen
- We bewaren `favicon.png` en `logo.png` in `public/` voor toekomstig gebruik, maar activeren ze niet in HTML zonder expliciete aanwijzing.
- Vercel blijft de aanbevolen hostingoptie — `public/` wordt meegenomen door de build nu dat `publicDir` correct is ingesteld.
- Dynamische OG-images blijven de aanbevolen manier om consistente social previews te garanderen; client-side gegenereerde PNG's zijn handig voor gebruikers maar niet geschikt als OG-preview door platforms.