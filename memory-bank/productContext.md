# productContext.md — benikvandaagjarig.nl

## Waarom bestaat dit project?
Mensen willen op een leuke, snelle manier ontdekken of ze vandaag jarig zijn. Benikvandaagjarig.nl biedt een speelse, virale webervaring die direct antwoord geeft en uitnodigt tot delen.

## Opgelost probleem
- Geen gedoe met berekeningen of zoeken: direct resultaat.
- Vier schrikkeljaren en andere edge cases op een toegankelijke manier.
- Privacy: geen data-opslag, alles client-side.

## Hoe moet het werken?
- Gebruiker voert geboortedatum in.
- Website toont direct of het vandaag hun verjaardag is.
- Bij jarig: feestelijke animaties met confetti (canvas-confetti, lazy-loaded). Ballonnen en automatische geluid zijn verwijderd per gebruikerswens; geluid blijft uit tenzij expliciet gevraagd in toekomstige updates.
- Bij niet jarig: speelse boodschap en aanmoediging.
- Leap year: speciale melding en keuze voor alternatieve viering.

## Analytics & privacy
- Analytics zijn cookieless (Plausible / Umami style) and loaded only after explicit user consent via a consent banner.
- Geen geboortedata of PII wordt opgeslagen of gedeeld.
- Consent is persisted locally (localStorage) and can be revoked by the user (future UI).

## User Experience doelen
- Instant feedback, geen wachttijd.
- Volledig in het Nederlands, inclusief copy en UI.
- Toegankelijk voor iedereen: toetsenbord, screenreader, AA-contrast.
- Delen via WhatsApp, Facebook, X, LinkedIn (Web Share API first); share dialog only opens on explicit user click.
- Responsive en snel, ook op mobiel.
- Geen persoonsgegevens opslaan, volledig GDPR-proof.

## Doelgroep
- Nederlandse internetgebruikers die houden van humor en snelle webtools.
- Iedereen die zijn verjaardag wil checken of delen.
