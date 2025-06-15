FROM node:18-alpine AS builder

WORKDIR /app

COPY */package*.json ./

RUN npm ci

COPY */. .

RUN npm run build


FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]