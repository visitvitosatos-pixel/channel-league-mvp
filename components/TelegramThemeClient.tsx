"use client";

import { useEffect } from "react";

interface TelegramWindow extends Window {
  Telegram?: {
    WebApp?: {
      ready: () => void;
      expand: () => void;
      themeParams?: Record<string, string>;
      colorScheme?: "light" | "dark";
      initData?: string;
      MainButton?: {
        setParams: (params: Record<string, unknown>) => void;
        show: () => void;
        hide: () => void;
      };
    };
  };
}

export function TelegramThemeClient() {
  useEffect(() => {
    const w = window as TelegramWindow;
    const webApp = w.Telegram?.WebApp;
    if (!webApp) return;

    webApp.ready();
    webApp.expand();

    const theme = webApp.themeParams || {};
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--tg-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`, value);
    });
    root.dataset.scheme = webApp.colorScheme || "dark";
  }, []);

  return null;
}
