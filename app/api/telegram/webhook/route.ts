import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { makeMiniAppUrl, telegramApi } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-telegram-bot-api-secret-token") || "";
  if (env.webhookSecret && secret !== env.webhookSecret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await request.json();
  const message = update.message;

  if (message?.text === "/start") {
    await telegramApi("sendMessage", {
      chat_id: message.chat.id,
      text: "Открой лигу канала. Здесь игроки фиксируют пики, собирают доверие толпы и попадают в недельный рейтинг.",
      reply_markup: {
        inline_keyboard: [[{
          text: "Открыть Mini App",
          web_app: { url: makeMiniAppUrl("vitos-club") },
        }]],
      },
    });
  }

  return NextResponse.json({ ok: true });
}
