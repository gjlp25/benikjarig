# Deployment — benikvandaagjarig

Kort overzicht voor deployen naar een externe Docker-server die de repository kan clonen.

## Vereisten op de server
- git
- Docker (v20+)
- Docker Compose v2 of hoger
- Poort 8080 (of gewenste poort) open in firewall / reverse-proxy

## Stappen (aanbevolen)
1. Clone de repository (gebruik altijd de `main` branch voor productie)
```bash
git clone -b main https://github.com/gjlp25/benikjarig.git
cd benikjarig
```

2. Bouw en start containers (productie)
```bash
docker compose up -d --build
```

3. Controleer status & logs
```bash
docker compose ps
docker compose logs -f web
# of
curl -I http://localhost:8080
```

4. Run tests (optioneel, in compose)
```bash
docker compose run --rm tests
```

## Rollback
- Checkout een eerder bekend goede tag/commit:
```bash
git fetch --all --tags
git checkout <tag-or-commit>
docker compose up -d --build
```

## Release workflow (optioneel)
1. Maak een semver-tag lokaal:
```bash
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```
2. Op de server: pull en rebuild:
```bash
git fetch --tags
git checkout v1.2.3
docker compose up -d --build
```

## Security & environment notes
- Deze repo levert een statische build die door nginx geserveerd wordt; terminatie van TLS gebeurt idealiter door een reverse-proxy (Traefik/Nginx) vóór de container.
- Stel secrets/omgevingsvariabelen in op de host (of gebruik docker secrets), niet in de repo.
- HSTS in `nginx.conf` is veilig bij HTTPS-terminatie — in lokale HTTP-tests werkt HSTS niet.

## Veelvoorkomende problemen
- `vite` not recognized bij `npm run dev` → draai `npm install` lokaal; CI/production maakt gebruik van de Docker multi-stage build.
- Poortconflict → verander `docker-compose.yml` poortmapping of stop bestaande service.

## Aanvullende tips
- Gebruik `docker system prune` regelmatig op de server om ruimte vrij te maken.
- Voor automatische deploys kun je een CI pipeline of een Git-hook opzetten die bij push naar `main` de server een webhook laat triggeren.