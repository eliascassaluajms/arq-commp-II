# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code and config files
COPY tsconfig.json vite.config.ts tailwind.config.js postcss.config.js index.html ./
COPY public ./public
COPY src ./src

# Build production bundle
RUN npm run build

# Production Stage
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built SPA files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
