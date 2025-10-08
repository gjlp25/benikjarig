# Deployment Guide — benikvandaagjarig.nl

This document describes how to deploy the project to a home Docker host for testing. It covers prerequisites, files to copy, transfer options, build/run commands, verification, updates and troubleshooting.

---

## 1 — Prerequisites (on the Docker server)
- Docker (Engine) installed (Docker Desktop, Docker Engine on Linux). Confirm: `docker --version`
- (Optional but recommended) Docker Compose v2: `docker compose version` (or `docker-compose` v1)
- git (optional, for pulling the repo on the server)
- Open port(s) for testing (e.g., TCP 8080 or 80) in your firewall/router
- Enough disk space for images and build output

If server has no internet or you prefer to build locally, see "Build locally and transfer image" below.

---

## 2 — Files required on the Docker server
You can copy the entire repository folder. Minimal required files for build-on-server approach:
- Dockerfile
- docker-compose.yml
- nginx.conf
- .dockerignore
- package.json
- package-lock.json
- vite.config.js (if present)
- tsconfig.json (if building TS)
- src/ (source)
- public/ (static assets)
- tools/ (optional helpers)

Note: .dockerignore prevents copying node_modules and other large artifacts into Docker build context.

If you prefer to only copy artifacts for runtime (no build on server), you can build locally and transfer the resulting Docker image (see "Build locally and transfer image").

---

## 3 — Transfer methods
Choose one of these:

A. Clone/pull on the server (recommended if server has internet)
- SSH into server:
  - git clone https://github.com/your/repo.git
  - cd repo

B. Rsync / SCP from your workstation:
- rsync (preserves perms, resumes, faster):
  - rsync -av --progress --exclude node_modules --exclude test-results --exclude .git ./ user@server:/path/to/site/
- scp:
  - scp -r ./ user@server:/path/to/site/

C. Build locally and push image to registry or transfer image:
- Build image locally and push to Docker Hub / private registry
- Or export image and copy:
  - docker build -t benikvandaagjarig:local .
  - docker save benikvandaagjarig:local -o benikvandaagjarig.tar
  - scp benikvandaagjarig.tar user@server:/path/
  - On server: docker load -i benikvandaagjarig.tar

---

## 4 — Build & run (on the Docker server)

Option A — Build on server using docker-compose (recommended)
1. cd /path/to/project
2. Build and run:
   - docker compose build
   - docker compose up -d
3. Open http://SERVER_IP:8080 (or port in docker-compose)

Option B — Build image then run (manual)
1. docker build -t benikvandaagjarig:local .
2. docker run -d --name benikvandaagjarig -p 8080:80 --restart unless-stopped benikvandaagjarig:local

Notes:
- The provided `docker-compose.yml` maps container port 80 → host 8080. Adjust ports if you want 80 externally.
- If you map to host port 80, you may require root privileges (use sudo).

---

## 5 — Build locally and deploy image (if server is offline)
1. Build locally:
   - docker build -t benikvandaagjarig:1.0.0 .
2. Save image:
   - docker save benikvandaagjarig:1.0.0 -o benikvandaagjarig-1.0.0.tar
3. Copy to server (scp/rsync)
4. On server:
   - docker load -i benikvandaagjarig-1.0.0.tar
   - docker run -d -p 8080:80 --name benikvandaagjarig benikvandaagjarig:1.0.0

---

## 6 — Verify deployment
- Visit http://SERVER_IP:8080 (or http://localhost:8080 if running locally)
- Check container status and logs:
  - docker ps
  - docker compose ps
  - docker logs benikvandaagjarig --follow
  - docker compose logs -f
- Confirm index.html loads and static assets are served
- Confirm SPA fallback: open deep route and ensure it returns index.html

---

## 7 — Updating the site
If you built on the server (git workflow):
1. ssh server
2. cd /path/to/project
3. git pull origin main
4. docker compose build --no-cache
5. docker compose up -d --remove-orphans

If you pushed new image to registry or copied a new tar:
1. docker pull your-registry/benikvandaagjarig:latest
2. docker compose up -d --no-deps --build web
or
1. docker load -i benikvandaagjarig-new.tar
2. docker stop benikvandaagjarig && docker rm benikvandaagjarig
3. docker run ... with new tag

Rollback: keep previous image tags; re-run docker run with previous tag.

---

## 8 — TLS / Reverse proxy (recommended for production)
For HTTPS on a home server, use a reverse proxy (Caddy, Traefik, or Nginx) that terminates TLS and forwards to the container port.
- Example with Caddy (automatic LetsEncrypt) or Traefik (dynamic routing).
- Alternatively, use your router to forward ports and test via local https tools (not recommended for public exposure without proper certs).

---

## 9 — Firewall / Router notes
- Forward port 8080 (or chosen port) from router to server IP if you need access from outside LAN.
- For local-only testing, use localhost or server's internal IP.
- Keep services behind a firewall and avoid exposing management ports.

---

## 10 — Environment & secrets
- This app is client-side; there are no special runtime environment variables required by default.
- If you add analytics or secrets, do NOT store PII in the build. Use environment-based configuration or server-side solutions carefully.

---

## 11 — Troubleshooting checklist
- Build failed? Run `npm run build` locally to surface errors.
- Container starts but shows 404 or index mismatch: check `nginx.conf` (SPA fallback).
- Missing assets: ensure `public/` is included in the build and `vite` output path is default `dist/`.
- Port conflicts: check `ss -ltnp` or `netstat -tlnp` to find colliding service.
- Inspect logs: `docker compose logs -f` and `docker logs <container>`.

---

## 12 — Cleanup commands
- Remove stopped containers and dangling images:
  - docker system prune
  - docker image prune
- Remove a specific image:
  - docker rmi image:tag

---

## 13 — Files to copy to the Docker server (summary)
- Recommended: copy entire project folder (excludes large items thanks to `.dockerignore`)
- Minimum list for server-side build:
  - Dockerfile
  - docker-compose.yml
  - nginx.conf
  - .dockerignore
  - package.json
  - package-lock.json
  - src/
  - public/
  - vite.config.js
  - tsconfig.json
- Alternatively, copy the built image (`*.tar`) if building locally.

---

## 14 — Example commands (quick copy + deploy)
From your workstation (server reachable via SSH):
- Copy project using rsync:
  - rsync -av --exclude node_modules --exclude test-results --exclude .git ./ user@server:/srv/benikvandaagjarig
- SSH and deploy:
  - ssh user@server
  - cd /srv/benikvandaagjarig
  - docker compose build
  - docker compose up -d

---

## 15 — Contact points & notes
- For local testing only: port mapping 8080 is convenient and avoids root on port 80.
- For production-like testing behind TLS, run behind a reverse proxy.
- This guide assumes the Dockerfile and nginx.conf in this repo; adjust if you changed names or ports.

---

End of guide.
