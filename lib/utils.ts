import { PickSide } from "@/lib/types";

export function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function pickLabel(pick: PickSide) {
  if (pick === "HOME") return "П1";
  if (pick === "DRAW") return "Х";
  return "П2";
}

export function toPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function telegramDisplayName(input?: string | null) {
  if (!input) return "Игрок";
  return input.replace(/_/g, " ");
}

export function formatTime(input: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(input));
}
