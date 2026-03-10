# Установка на GitHub + Vercel + Telegram

## 1. GitHub

1. Создай новый пустой репозиторий.
2. Загрузи туда содержимое этой папки.
3. Проверь, что в репозитории есть `.env.example`, `package.json`, `app/`, `components/`, `lib/`, `prisma/`.

## 2. Vercel

1. Подключи репозиторий в Vercel.
2. Framework Preset: **Next.js**.
3. Root Directory: оставь корень проекта.
4. Добавь переменные окружения из `.env.example`.
5. На первую презентацию можешь поставить:
   - `DEMO_MODE=true`
   - `NEXT_PUBLIC_DEMO_MODE=true`
6. Сделай Deploy.

## 3. Telegram бот

1. Создай бота через `@BotFather`.
2. Возьми токен.
3. Заполни в Vercel:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_BOT_USERNAME`
   - `TELEGRAM_WEBHOOK_SECRET`
4. В BotFather настрой **Menu Button** и укажи URL:
   - `https://<твой-домен>/mini/vitos-club`

## 4. Webhook

После деплоя вызови Telegram API вручную:

```powershell
$BotToken = "PASTE_BOT_TOKEN"
$WebhookUrl = "https://your-domain.vercel.app/api/telegram/webhook"
$Secret = "PASTE_SECRET"

Invoke-RestMethod -Method Post -Uri "https://api.telegram.org/bot$BotToken/setWebhook" -ContentType "application/json" -Body (@{
  url = $WebhookUrl
  secret_token = $Secret
} | ConvertTo-Json)
```

## 5. Supabase / Postgres

Для живого пилота:

1. Создай Postgres базу.
2. Возьми connection string.
3. Поставь:
   - `DATABASE_URL=postgresql://...`
4. Переключи:
   - `DEMO_MODE=false`
   - `NEXT_PUBLIC_DEMO_MODE=false`
5. Запусти:

```powershell
npm install
npx prisma generate
npx prisma db push
npm run build
```

## 6. Что показывать админу

- `/` — лендинг
- `/mini/vitos-club` — как выглядит Mini App
- `/admin/vitos-club` — какие цифры получит админ

## 7. Что можно ставить в реальный канал уже после первой настройки

Даже текущую версию можно ставить как пилот, если:
- подключён реальный Postgres
- отключён demo mode
- настроен Telegram webhook
- сделан Menu Button в BotFather

В таком режиме:
- люди смогут открывать Mini App
- отправлять прогноз
- попадать в общую механику
- админ увидит витрину продукта

Для полного боевого режима потом стоит добавить:
- авторизацию админов
- внесение результатов из UI
- авто-пересчёт очков
- weekly digest generation
