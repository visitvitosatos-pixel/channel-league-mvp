"use client";

import { useEffect, useState } from "react";

// Делаем ИМЕНОВАННЫЙ экспорт (Named Export)
export function LiveFeed() {
  const [index, setIndex] = useState(0);
  const events = [
    { id: 1, text: "⚡️ Новый прогноз на матч дня!" },
    { id: 2, text: "🔥 Кто-то зашел в Gold Division" },
    { id: 3, text: "💎 Trust Index лидера вырос до 98%" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="liveFeed">
      <span className="feedIcon">📡</span>
      <span className="feedText">{events[index].text}</span>
    </div>
  );
}