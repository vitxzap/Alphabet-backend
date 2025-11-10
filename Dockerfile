FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["npm", "run", "start:dev"]
ENTRYPOINT ["/entrypoint.sh"]