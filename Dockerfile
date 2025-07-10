
# Вказуємо базовий образ з Node.js
FROM node:20

# Встановлюємо робочу директорію в контейнері
WORKDIR /src/index.js

# Копіюємо package.json і package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY . .

# Відкриваємо порт (той, який використовує твій сервер)
EXPOSE 8050

# Команда запуску програми
CMD ["node", "index.js"]