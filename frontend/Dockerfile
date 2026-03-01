# Base image with Bun
FROM node:24-alpine AS base
WORKDIR /app

# -------- Install stage (dev + prod dependencies) --------
FROM base AS install
COPY package.json ./
RUN npm install

# -------- Build stage (compile the Next.js app) --------
FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
