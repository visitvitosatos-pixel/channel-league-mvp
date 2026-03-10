import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "@/lib/repository";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("channel") || "vitos-club";
  const repository = getRepository();
  const payload = await repository.getAdminOverview(slug);
  return NextResponse.json(payload);
}
