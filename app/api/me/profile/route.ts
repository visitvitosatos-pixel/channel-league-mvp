import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "@/lib/repository";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("channel") || "vitos-club";
  const tgUserId = request.nextUrl.searchParams.get("tgUserId") || "1005";
  const repository = getRepository();
  const payload = await repository.getProfile(slug, tgUserId);
  return NextResponse.json(payload);
}
