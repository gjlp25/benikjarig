# techContext.md — benikvandaagjarig.nl

## Technologieën (updates)

- Vite build-time defines:
  - `__BUILD_DATE__` wordt nu gedefinieerd in `vite.config.ts` via `define` en gebruikt in `src/scripts/main.ts` om de footer-tekst automatisch te voorzien van maand/jaar.
  - TypeScript declaratiebestand toegevoegd: `src/types/env.d.ts` (declare const __BUILD_DATE__: string;)
- Hosting & headers:
  - `vercel.json` bevat nu de aanbevolen security headers en Cache-Control voor HTML.
- Development commands (herhaling):
  - lokaal dev: `npm run dev`
  - build: `npm run build`
  - preview: `npm run preview`
  - tests: `npm test` (unit), `npm run test:e2e` (playwright)