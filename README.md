# WebbyLab-Test


## Швидкій запуск 

- [введіть команду в термінал] — docker run --name movies -p 8000:8050 -e APP_PORT=8050 1dixon1/movies
- [перейдіть по посиланню] — `http://localhost:8000/register`


## API

### Авторизація
- `POST /api/auth/register` — реєстрація
- `POST /api/auth/login` — логін (отримання токена)

### Робота з фільмами (потрібен токен)
- `POST /api/movies` — додати фільм
- `DELETE /api/movies/:id` — видалити
- `GET /api/movies/:id` — перегляд одного
- `GET /api/movies` — список (сортований)
- `GET /api/movies/search/title?title=...` — пошук за назвою
- `GET /api/movies/search/actor?actor=...` — пошук за актором
- `POST /api/movies/import` — імпорт з текстового файлу

## Веб-інтерфейс

- `GET /register` — форма реєстрації
- `GET /login` — форма логіну
- `GET /app` — головна панель фільмів

## Приклад імпорту через форму
1. Увійди через `/login`
2. Перейди до `/app`
3. Завантаж `sample_movies.txt` в секцію імпорту

## Веб-інтерфейс 
- [Реєстрація](http://localhost:8000/register)
- [Логін](http://localhost:8000/login)
- [Інтерфейс](http://localhost:8000/app)


## Структура проєкту
```
├── src/
│   ├── app.js                 # Точка входу
│   ├── config/db.js           # Налаштування Sequelize + SQLite
│   ├── models/                # Моделі Movie, Actor, User
│   ├── routes/                # Роутери auth, movies
│   ├── controllers/           # Логіка авторизації та фільмів
│   ├── middlewares/           # JWT-мідлвар
│   └── views/                 # HTML сторінки: login, register, app
├── Dockerfile
├── .dockerignore
├── package.json
├── db.sqlite (автоматично створюється)
└── README.md
```

---
## 📦 Складання Docker образу

```bash
docker build -t your_dockerhub_username/movies .
docker push your_dockerhub_username/movies
```


## 🔗 DockerHub образ
[https://hub.docker.com/r/1dixon1/movies]
----

## Start server
docker run --name movies -p 8000:8050 -e APP_PORT=8050 1dixon1/movies

