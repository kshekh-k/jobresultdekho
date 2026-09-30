# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# Build-time native deps for sharp / vips / node-gyp
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git python3

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn config set registry https://registry.npmjs.org \
  && yarn config set network-timeout 600000 -g \
  && yarn install --ignore-engines
COPY . .
RUN yarn build

# ---------- Stage 2: Runtime ----------
FROM node:20-alpine

# Only the vips shared library is needed at runtime (sharp uses it)
RUN apk add --no-cache vips

WORKDIR /app

# Copy the compiled app from builder — build tools (gcc, python3, git) are NOT present here
COPY --from=builder /app .

# Ensure the uploads mount-point exists and is owned by the non-root node user
RUN mkdir -p public/uploads && chown -R node:node /app

USER node

EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO /dev/null http://localhost:1337/_health || exit 1

CMD ["yarn", "start"]
