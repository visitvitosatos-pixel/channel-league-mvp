"use client";

import { useState } from "react";
import { PickSide } from "@/lib/types";
import { PickChips } from "@/components/PickChips";

interface PredictionFormProps {
  slug: string;
  defaultName?: string;
}

export function PredictionForm({ slug, defaultName = "Pulsar" }: PredictionFormProps) {
  const [pick, setPick] = useState<PickSide>("HOME");
  const [confidence, setConfidence] = useState(67);
  const [name, setName] = useState(defaultName);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          channelSlug: slug,
          tgUserId: "demo-user-1005",
          displayName: name,
          username: "visit.vitos.atos",
          pick,
          confidence,
          note,
        }),
      });
      const payload = await response.json();
      setMessage(payload.message || "Готово");
    } catch (error) {
      setMessage("Не удалось отправить прогноз. Проверь API и env.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="predictionForm">
      <div className="field">
        <label>Имя игрока</label>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Pulsar" />
      </div>
      <div className="field">
        <label>Ваш выбор</label>
        <PickChips value={pick} onChange={setPick} />
      </div>
      <div className="field">
        <label>Уверенность — {confidence}%</label>
        <input type="range" min={50} max={95} value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} />
      </div>
      <div className="field">
        <label>Короткая заметка</label>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Пишу ставку аккуратно: команда лучше по темпу и форме." />
      </div>
      <button className="primaryButton" disabled={loading} type="submit">
        {loading ? "Отправляем..." : "Зафиксировать прогноз"}
      </button>
      {message ? <p className="statusMessage">{message}</p> : null}
    </form>
  );
}
