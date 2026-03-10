import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { parseTelegramInitData } from "@/lib/telegram";

export async function GET(request: NextRequest) {
  const initData = request.headers.get("x-telegram-init-data") || request.nextUrl.searchParams.get("initData") || "";

  if (env.demoMode) {
    return NextResponse.json({
      ok: true,
      mode: "demo",
      user: {
        id: "demo-user-1005",
        displayName: "Pulsar",
        username: "visit.vitos.atos",
      },
    });
  }

  const payload = parseTelegramInitData(initData);
  if (!payload.valid || !payload.user) {
    return NextResponse.json({ ok: false, error: "INVALID_TELEGRAM_INIT_DATA" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    mode: "live",
    user: {
      id: payload.user.id,
      displayName: `${payload.user.firstName} ${payload.user.lastName || ""}`.trim(),
      username: payload.user.username || null,
    },
  });
}
