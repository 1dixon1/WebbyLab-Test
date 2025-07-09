# WebbyLab-Test

- POST  `/api/movies` — додати фільм
- DELETE `/api/movies/:id` — видалити фільм
- GET   `/api/movies/:id` — інформація про фільм
- GET   `/api/movies` — список фільмів (сортованих за назвою)
- GET   `/api/movies/search/title?title=Gladiator` — пошук за назвою
- GET   `/api/movies/search/actor?actor=Tom Cruise` — пошук за актором
- POST  `/api/movies/import` — імпорт (multipart/form-data, поле "file")
            Приклад запиту на імпорт
            POST /api/movies/import
            Content-Type: multipart/form-data
            Поле: file (вказати файл sample_movies.txt)

- GET   `/api/profile`

## 🌐 Веб-інтерфейс імпорту
Відкрий у браузері:
`http://localhost:8050/login`
