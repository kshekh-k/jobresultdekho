# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests and install
COPY package.json yarn.lock ./
#RUN yarn install --frozen-lockfile
RUN yarn install --network-timeout 1000000

# Accept build argument from docker-compose
ARG VITE_API_URL
# This ENV line ensures Vite sees the value during the build step
ENV VITE_API_URL=${VITE_API_URL}

# Copy all source files
COPY . .

# Print for debugging (optional)
RUN echo "Building with VITE_API_URL=$VITE_API_URL"

# Build your SvelteKit app (Vite will embed the value)
RUN yarn build


# ---------- Stage 2: Runtime ----------
FROM node:20-alpine
WORKDIR /app

# Copy the built app and production dependencies only
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

EXPOSE 3000

# Run the built app
CMD ["node", "build/index.js"]
