import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { TelegramThemeClient } from "@/components/TelegramThemeClient";
import { TopNav } from "@/components/TopNav";

export const metadata: Metadata = {
  title: "Channel League MVP",
  description: "White-label Mini App для Telegram-каналов с рейтингом ставок и вовлечением.",
};

const topNavItems = [
  { label: "лавная", href: "/" },
  { label: "Mini App", href: "/mini/vitos-club" },
  { label: "дмин", href: "/admin/vitos-club" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <TelegramThemeClient />
        <div className="appShell">
          <TopNav items={topNavItems} />
          <main className="container">{children}</main>
        </div>
      </body>
    </html>
  );
}
