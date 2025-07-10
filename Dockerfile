

FROM node:20

RUN apk add --no-cache python3 make g++ sqlite sqlite-dev

WORKDIR /src/index.js

COPY package*.json ./

RUN npm install


COPY . .


EXPOSE 8050


CMD ["node", "src/index.js"]