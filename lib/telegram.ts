import crypto from "node:crypto";
import { env } from "@/lib/env";

export interface TelegramUser {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
}

export function parseTelegramInitData(initData: string): { valid: boolean; user: TelegramUser | null } {
  if (!initData) {
    return { valid: false, user: null };
  }

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash || !env.botToken) {
    return { valid: false, user: null };
  }

  const dataCheckString = [...params.entries()]
    .filter(([key]) => key !== "hash")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto.createHmac("sha256", "WebAppData").update(env.botToken).digest();
  const signature = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  if (signature !== hash) {
    return { valid: false, user: null };
  }

  const userRaw = params.get("user");
  if (!userRaw) {
    return { valid: true, user: null };
  }

  const parsed = JSON.parse(userRaw);
  return {
    valid: true,
    user: {
      id: String(parsed.id),
      firstName: parsed.first_name || "Telegram",
      lastName: parsed.last_name || "",
      username: parsed.username || undefined,
    },
  };
}

export function makeMiniAppUrl(slug: string) {
  return `${env.appUrl}/mini/${slug}`;
}

export async function telegramApi(method: string, payload: Record<string, unknown>) {
  if (!env.botToken) {
    return { ok: false, skipped: true };
  }

  const response = await fetch(`https://api.telegram.org/bot${env.botToken}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  return response.json();
}
