# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn config set registry https://registry.npmjs.org \
 && yarn config set network-timeout 600000 -g \
 && yarn install --prefer-offline

# VITE_* vars are embedded by Vite at build time
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY . .
RUN yarn build

# ---------- Stage 2: Runtime ----------
FROM node:20-alpine
WORKDIR /app

# Copy built output and install only production deps
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn config set network-timeout 600000 -g \
 && yarn config set registry https://registry.npmjs.org \
 && yarn install --production \
 && chown -R node:node .

# PUBLIC_* vars are resolved at request-time by the Node adapter;
# pass them via docker-compose environment — no need to embed at build time.

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO /dev/null http://localhost:3000 || exit 1

CMD ["node", "build/index.js"]
