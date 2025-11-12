FROM node:24-alpine
RUN useradd -ms /bin/sh -u 1001 app
USER app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY --chown=app:app . /app
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["npm", "run", "start:dev"]
ENTRYPOINT ["/entrypoint.sh"]