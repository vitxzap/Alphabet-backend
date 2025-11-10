FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]