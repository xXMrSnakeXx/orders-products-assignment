
# Orders Products App

Полноценное full-stack приложение для управления товарами и приходами. Состоит из:

- **Frontend**: React + Vite + TypeScript + Bootstrap
- **Backend**: Node.js + Express + PostgreSQL + Socket.IO
- **Database**: PostgreSQL
- **Контейнеризация**: Docker / Docker Compose

---

## Стек технологий

- **Frontend**: React, TypeScript, Vite, Bootstrap, Socket.IO Client
- **Backend**: Node.js, Express, PostgreSQL, Socket.IO, dotenv
- **DevOps**: Docker, Docker Compose, Railway (БД), Render (Backend), Vercel (Frontend)

---

## Онлайн-доступ

- Frontend (Vercel): https://orders-products.vercel.app
- Backend (Render API): https://orders-products-backend.onrender.com

> Для полноценной работы фронтенд использует переменную окружения `VITE_SOCKET_URL`, указывающую на URL бекенда.

---

## Запуск в режиме разработки (Docker)

> Перед запуском убедитесь, что у вас установлены Docker и Docker Compose.

### 1. Клонирование репозитория

```bash
git clone https://github.com/xXMrSnakeXx/orders-products-assignment
cd orders-products-assignment
```

### 2. Запуск

```bash
npm run dev
```

Будут запущены следующие контейнеры:

- `db` — PostgreSQL (порт: 5432)
- `backend` — Node.js API (порт: 4000)
- `frontend` — React SPA (порт: 3000)

### 3. Проверка

Откройте в браузере: http://localhost:3000

---

## Продакшн

### Backend

- Развёрнут на Render
- Использует облачную базу данных Railway
- Запускается командой:

```bash
cd backend
npm install
npm run build
npm run start:prod
```

> Используются переменные из `.env.production`

### Frontend

- Развёрнут на Vercel `https://orders-products-assignment.vercel.app/orders`
- Для деплоя:
  - Указывается директория: `frontend`
  - Добавляется переменная окружения:  
    `VITE_SOCKET_URL=https://orders-products-backend.onrender.com`

---

## Структура проекта

```
├── backend
│   ├── src
│   ├── Dockerfile
│   ├── .env.development
│   ├── .env.production
├── frontend
│   ├── src
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .env.development
│   ├── .env.production (опционально)
├── docker-compose.yml
├── package.json (root)
```

---

## Переменные окружения

### Backend

`.env.development`
```
POSTGRES_DB=orders_products
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
PGHOST=db
PGPORT=5432
PORT=4000
```

`.env.production`
```
PGHOST=nozomi.proxy.rlwy.net
PGPORT=36211
POSTGRES_USER=postgres
POSTGRES_PASSWORD=qkjNacGdWyGiSDXYhAZpImpMCbUHsbux
POSTGRES_DB=railway
PORT=4000
```

### Frontend

`.env.development`
```
VITE_SOCKET_URL=http://localhost:4000
```

`.env.production` (на Vercel)
```
VITE_SOCKET_URL=https://orders-products-backend.onrender.com
```

---

## Готово

- Проект полностью запускается через `docker-compose`
- Backend подключён к облачной БД
- Frontend размещён на Vercel
- Работает WebSocket для обновлений в реальном времени
