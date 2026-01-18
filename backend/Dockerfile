FROM node:20-alpine

# Install dependencies
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git python3

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock (if exists)
COPY package.json yarn.lock* ./

#RUN yarn install

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else yarn install; fi
#RUN yarn install --frozen-lockfile

# Copy app source
COPY . .

# Build Strapi
RUN yarn build

# Expose the port Strapi runs on
EXPOSE 1337

# Start Strapi
CMD ["yarn", "start"]
#CMD ["yarn", "develop"]