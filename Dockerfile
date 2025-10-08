# --- Build stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps using package-lock.json for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Copy source & build
COPY . .
RUN npm run build

# --- Run stage ---
FROM nginx:stable-alpine AS runner

# Copy built static files from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with one that supports SPA fallback and sensible caching + security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
