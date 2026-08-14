FROM node:22-alpine AS builder
WORKDIR /app

# Prepare pnpm
RUN corepack enable
RUN corepack prepare pnpm@10.24.0 --activate

# Copy only what we need for install first (leverage cache)
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./

RUN pnpm install --no-frozen-lockfile

# Copy rest of the source
COPY . .

# Build
RUN pnpm build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
