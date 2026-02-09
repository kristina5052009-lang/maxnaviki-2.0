# MAX.Навыки — проект для олимпиады

Проект обучает работе со смартфоном, мессенджером MAX, онлайн‑покупками и Госуслугами. Интерфейс полностью русифицирован, с крупными кнопками, озвучиванием шагов, подсветкой активных зон и упрощённой линейной навигацией.

Ссылка на видео - https://vkvideo.ru/video710973333_456239017

## Структура
- `apps/api` — backend (Express + Prisma + PostgreSQL)
- `apps/web` — frontend (React + Vite)
- `docs` — Agile‑спринты, план тестирования, запись демонстрации

## Быстрый старт
### 1) Запуск базы данных
```bash
cd C:\project
docker compose up -d
```

### 2) Backend
```bash
cd apps\api
copy .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### 3) Frontend
```bash
cd apps\web
copy .env.example .env
npm install
npm run dev
```

Откройте `http://localhost:5173`.

## Тесты
### Backend
```bash
cd apps\api
npm test
```

### Frontend
```bash
cd apps\web
npm test
```

