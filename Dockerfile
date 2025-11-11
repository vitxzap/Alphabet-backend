FROM node:24-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && \
    sed -i 's/\r$//' /entrypoint.sh
    
ENTRYPOINT ["/entrypoint.sh"]