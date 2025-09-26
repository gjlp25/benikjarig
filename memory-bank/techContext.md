# techContext.md — benikvandaagjarig.nl

## Technologieën

- **Framework:** Vanilla JS/HTML met Vite bundler
- **TypeScript:** Strict mode voor type safety en development experience
- **Styling:** Moderne CSS met custom properties, GPU-accelerated keyframes
- **Animatie:** confetti (canvas-confetti, lazy-loaded). Ballonnen en automatische geluidseffecten zijn verwijderd per gebruikerswens.
- **Hosting:** Vercel met auto-deploy op main branch
- **Analytics:** Plausible of Umami (cookieloos, GDPR-proof)
- **Testing:** Vitest (unit), Playwright (E2E), axe-core (a11y)
- **Linting:** ESLint + Prettier
- **Performance monitoring:** Core Web Vitals in productie

## Development Setup

- **Local dev:** `npm run dev` (Vite dev server)
- **Build:** `npm run build` (tsc + vite build)
- **Preview:** `npm run preview`
- **Lint:** `npm run lint`
- **Type-check:** `npm run type-check`
- **Test:** `npm run test` (unit), `npm run test:e2e` (E2E)

## Technische beperkingen

- **Geen backend:** Alles draait client-side, geen server calls of data-opslag
- **Bundle size:** ≤ 50KB gzipped (main bundle)
- **Fonts:** System font stack, custom fonts alleen met `display=swap`
- **Confetti:** Alleen laden bij "jarig" (lazy import); ballonnen en geluid zijn verwijderd in de productie-setup per gebruikerswens.
- **Consent:** Analytics/ads pas na expliciete toestemming
- **Security:** Strakke headers via `vercel.json`, CSP alleen whitelisted origins

## Dependencies

- **canvas-confetti:** Voor feestelijke animaties
- **axe-core:** Accessibility testing
- **Vitest, Playwright:** Testing frameworks
- **ESLint, Prettier:** Code quality

## Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge
- **Graceful fallback:** Animaties en sharing werken ook bij beperkte support
