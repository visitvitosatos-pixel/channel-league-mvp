import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TelegramThemeClient } from "@/components/TelegramThemeClient";
import { TopNav } from "@/components/TopNav";
import Script from "next/script"; // Импортируем для вставки скриптов

export const metadata: Metadata = {
  title: "Channel League | Vitos Edition",
  description: "Премиальная экосистема для Telegram-каналов. Статус, аналитика, доминирование.",
};

const topNavItems = [
  { label: "Главная", href: "/" },
  { label: "App", href: "/mini/vitos-club" },
  { label: "Admin", href: "/admin/vitos-club" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Подключаем "мозги" Telegram Mini App */}
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className="antialiased">
        <TelegramThemeClient />
        
        <div className="appShell">
          {/* Навигацию оставим только для десктопа, в ТГ она может мешать */}
          <TopNav items={topNavItems} />
          
          <main className="container">
            {children}
          </main>
        </div>

        {/* Скрипт автоматической настройки интерфейса */}
        <Script id="tg-init" strategy="afterInteractive">
          {`
            const tg = window.Telegram?.WebApp;
            if (tg) {
              tg.ready();
              tg.expand(); // Разворачиваем на максимум
              tg.enableClosingConfirmation(); // Чтобы юзер случайно не закрыл приложение свайпом
              
              // Настраиваем цвета шапки под темную тему нашего проекта
              tg.setHeaderColor('#0A0A0F');
              tg.setBackgroundColor('#0A0A0F');
            }
          `}
        </Script>
      </body>
    </html>
  );
}