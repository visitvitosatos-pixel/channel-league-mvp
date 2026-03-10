import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "@/lib/repository";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const slug = body.channelSlug || "vitos-club";
  const repository = getRepository();
  const round = await repository.getCurrentRound(slug);
  const text = `🔥 Матч дня: ${round.featuredMatch.homeTeam} — ${round.featuredMatch.awayTeam}\n\nФиксируй прогноз в Mini App и посмотри, куда пошла толпа. После матча покажем обновлённый рейтинг дня.`;
  return NextResponse.json({ ok: true, text });
}
