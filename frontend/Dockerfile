# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: runtime
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# Install runtime dependencies + svelte-preprocess if needed
RUN yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["node", "build/index.js"]
