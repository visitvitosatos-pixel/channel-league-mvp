import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "@/lib/repository";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("channel") || "vitos-club";
  const repository = getRepository();
  const round = await repository.getCurrentRound(slug);
  return NextResponse.json(round);
}
