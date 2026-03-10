import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { makeMiniAppUrl, telegramApi } from "@/lib/telegram";

function extractSlug(text: string): string {
  const parts = text.trim().split(/\s+/, 2);
  const raw = parts[1] || "vitos-club";
  return raw.replace(/[^a-zA-Z0-9_-]/g, "") || "vitos-club";
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-telegram-bot-api-secret-token") || "";

  if (env.webhookSecret && secret !== env.webhookSecret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await request.json();
  const message = update?.message;

  if (!message?.chat?.id) {
    return NextResponse.json({ ok: true });
  }

  const text = typeof message.text === "string" ? message.text.trim() : "";
  const chatId = message.chat.id;
  const isPrivate = message.chat.type === "private";

  if (!isPrivate) {
    return NextResponse.json({ ok: true });
  }

  const slug = text.startsWith("/start") ? extractSlug(text) : "vitos-club";
  const miniAppUrl = makeMiniAppUrl(slug);

  await telegramApi("sendMessage", {
    chat_id: chatId,
    text: text.startsWith("/start")
      ? "Открой лигу канала. Здесь участники публикуют пики, собирают реакцию толпы и попадают в недельный рейтинг."
      : "Бот живой. Нажми кнопку ниже и открой Mini App с лигой канала.",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть Mini App",
            web_app: { url: miniAppUrl },
          },
        ],
      ],
    },
  });

  return NextResponse.json({ ok: true });
}