FROM node:24-alpine
RUN useradd -ms /bin/sh -u 1001 app
USER app
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && \
    sed -i 's/\r$//' /entrypoint.sh
    
ENTRYPOINT ["/entrypoint.sh"]