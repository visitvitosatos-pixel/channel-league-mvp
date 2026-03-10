# Channel League MVP

Pilot-ready MVP для Telegram Mini App: пользователи фиксируют свои пики, видят реакцию толпы и попадают в рейтинг, а админ канала получает white-label витрину и статистику участия.

## Что внутри

- **`app/`** — фронтенд и API на Next.js
- **`components/`** — UI-компоненты Mini App и admin view
- **`lib/`** — env, Telegram helpers, mock data, repository
- **`prisma/`** — схема PostgreSQL
- **`scripts/`** — вспомогательные скрипты
- **demo mode** — показывает продукт без базы и без реального Telegram initData
- **live mode** — включается через `DEMO_MODE=false` и `DATABASE_URL`

## Что уже готово

- Лендинг для презентации админу
- Mini App с white-label оболочкой
- Форма фиксации прогноза
- Crowd split
- Топ дня и недели
- Профиль игрока
- Admin digest page
- API routes
- Telegram webhook route для `/start`

## Что нужно подключить для боевого пилота

1. Vercel Pro
2. Supabase Postgres или другой Postgres
3. Токен Telegram-бота
4. Webhook secret
5. BotFather → Menu Button → Mini App URL

## Быстрый старт локально

```powershell
Copy-Item .env.example .env
npm install
npm run build
npm run dev
```

После запуска открой:
- `http://localhost:3000/` — лендинг
- `http://localhost:3000/mini/vitos-club` — Mini App demo
- `http://localhost:3000/admin/vitos-club` — admin demo

## Режимы

### Demo

```env
DEMO_MODE=true
NEXT_PUBLIC_DEMO_MODE=true
```

Подходит для демонстрации админу без базы и реальных Telegram-пользователей.

### Live

```env
DEMO_MODE=false
NEXT_PUBLIC_DEMO_MODE=false
DATABASE_URL=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_BOT_USERNAME=...
TELEGRAM_WEBHOOK_SECRET=...
```

Подходит для реального пилота в канале.

## Что ещё сделать после первой презентации

- Реальный scoring job
- Weekly report generation
- Admin auth
- Внесение результата матча через админку
- Share card для публикации в группу
- Redis для кэша и очередей
