

FROM node:18

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  sqlite3 \
  libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*


WORKDIR /src/index.js

COPY package*.json ./

RUN npm install


COPY . .


EXPOSE 8050


CMD ["node", "src/index.js"]