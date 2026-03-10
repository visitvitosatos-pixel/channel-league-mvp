import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "@/lib/repository";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const slug = body.channelSlug || "vitos-club";
  const repository = getRepository();
  const weekly = await repository.getLeaderboard(slug, "weekly");
  const text = `🏁 Итоги дня готовы. Топ недели сейчас ведут: ${weekly.slice(0, 3).map((x) => x.displayName).join(", ")}. Открой Mini App и проверь, как изменилось твоё место.`;
  return NextResponse.json({ ok: true, text });
}
