export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000",
  demoMode: (process.env.NEXT_PUBLIC_DEMO_MODE || process.env.DEMO_MODE || "true") === "true",
  botToken: process.env.TELEGRAM_BOT_TOKEN || "",
  botUsername: process.env.TELEGRAM_BOT_USERNAME || "",
  webhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET || "",
  adminAllowlist: (process.env.ADMIN_ALLOWLIST || "").split(",").map((v) => v.trim()).filter(Boolean),
};
