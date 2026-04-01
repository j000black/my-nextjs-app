FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

RUN chmod +x scripts/railway-start.sh

CMD ["./scripts/railway-start.sh"]
