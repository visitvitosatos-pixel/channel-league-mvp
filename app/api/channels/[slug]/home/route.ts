import { NextResponse } from "next/server";
import { getRepository } from "@/lib/repository";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const repository = getRepository();
  const channel = await repository.getChannelBranding(slug);
  const round = await repository.getCurrentRound(slug);
  return NextResponse.json({ channel, round });
}
