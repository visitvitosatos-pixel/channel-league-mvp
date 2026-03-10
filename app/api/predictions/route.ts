import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRepository } from "@/lib/repository";

const schema = z.object({
  channelSlug: z.string().min(1),
  tgUserId: z.string().min(1),
  displayName: z.string().min(1),
  username: z.string().optional().nullable(),
  pick: z.enum(["HOME", "DRAW", "AWAY"]),
  confidence: z.number().min(50).max(95),
  note: z.string().max(160).optional().nullable(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Некорректные данные формы." },
      { status: 400 }
    );
  }

  const repository = getRepository();

  const payload = {
    ...parsed.data,
    username: parsed.data.username ?? undefined,
    note: parsed.data.note ?? undefined,
  };

  const result = await repository.submitPrediction(payload);

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
