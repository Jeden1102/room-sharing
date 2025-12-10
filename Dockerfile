FROM node:lts AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build 

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /app/public ./public 

ENV HOST 0.0.0.0
ENV PORT 8080
EXPOSE 8080

CMD ["npm", "run", "start"]