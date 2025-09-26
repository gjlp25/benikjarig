# systemPatterns.md — benikvandaagjarig.nl

## Architectuur

- **Client-side only:** Alle logica draait in de browser, geen backend of data-opslag.
- **Modulair ontwerp:** Code wordt opgesplitst in logische modules (birthday-logic, animations, sharing, utils).
- **Strict TypeScript:** Type safety en duidelijke interfaces voor alle modules.
- **Performance-first:** Lazy loading van confetti, animaties via GPU-geoptimaliseerde CSS keyframes.
- **Accessibility:** Semantische HTML, ARIA-labels, AA-contrast, volledige toetsenbordbediening, screenreader support.

## Design Patterns

- **ES Modules:** Consistente imports en exports, duidelijke function signatures.
- **Custom Properties:** CSS-variabelen voor kleuren, spacing en animaties.
- **Event-driven UI:** Interacties via event listeners, geen globale state buiten modulegrenzen.
- **Feature toggles:** Animaties en geluid respecteren `prefers-reduced-motion` en autoplay policies.
- **Fallbacks:** Web Share API met fallback naar platform-URL's; confetti/ballonnen gracefully degraded bij failure.

## Component Relaties

- **birthday-logic.ts:** Verwerkt datuminput, leap year checks, leeftijdsberekening.
- **animations.ts:** Regelt confetti, ballonnen, geluidseffecten.
- **sharing.ts:** Handelt social sharing en OG-image logica.
- **main.ts:** Initialiseert app, koppelt modules en UI.
- **utils/date-helpers.ts:** Datumvalidatie, schrikkeljaarlogica.
- **utils/dom-helpers.ts:** DOM-manipulatie, focus states, accessibility helpers.

## Security Patterns

- **CSP & headers:** Strakke Content Security Policy, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options.
- **GDPR:** Geen opslag van geboortedata, analytics/ads pas na consent, cookieloze tracking.

## Test Patterns

- **Vitest:** Unit tests voor logica en edge cases.
- **Playwright:** E2E tests voor user flows.
- **axe-core:** Accessibility checks op critical flows.
