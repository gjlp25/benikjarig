# systemPatterns.md — benikvandaagjarig.nl

## Architectuur (updates)

- Build-time metadata: gebruik Vite `define` om kleine build-metadata (zoals `__BUILD_DATE__`) te injecteren tijdens build. Dit is nu een standaard pattern in het project voor niet-gevoelige, display-only metadata.
- CSP as code: beveiligingsheaders (CSP, HSTS, X-Frame-Options, etc.) worden beheerd via `vercel.json` en dienen als single source of truth voor edge headers.
- Assets in public/: statische assets (OG images, favicons, logo's) worden in `public/` geplaatst en niet automatisch in HTML opgenomen — dit biedt flexibiliteit zonder layout-veranderingen.

## Design & Security Patterns (herhaling)
- ES Modules, feature toggles, accessibility-first en performance-first blijven leidend.
- Prefer build-time injection voor niet-dynamische metadata i.p.v. handmatige updates in HTML.