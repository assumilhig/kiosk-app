# Use the official Node.js image with Alpine for smaller size
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Use a lightweight image for production
FROM node:18-alpine AS runner
WORKDIR /app

# Only copy the build output and necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]

# Build the Docker image
# docker build -t kiosk-app .
