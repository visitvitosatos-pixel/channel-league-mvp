import "./globals.css";
import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { TelegramThemeClient } from "@/components/TelegramThemeClient";

export const metadata: Metadata = {
  title: "Channel League MVP",
  description: "White-label Telegram Mini App для каналов со ставками и репутацией участников.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <TelegramThemeClient />
        <div className="appShell">
          <TopNav />
          {children}
        </div>
      </body>
    </html>
  );
}
