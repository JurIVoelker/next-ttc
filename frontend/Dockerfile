# Base image with Bun
FROM oven/bun:1 AS base
WORKDIR /app

# -------- Install stage (dev + prod dependencies) --------
FROM base AS install
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

# -------- Build stage (compile the Next.js app) --------
FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bunx next build

# -------- Final image: minimal runtime --------
FROM oven/bun:1 AS release
WORKDIR /app

# Copy only production dependencies
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile --production

# Copy build artifacts and public assets
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Expose the default Next.js port
EXPOSE 3000
CMD ["bun", "start"]
