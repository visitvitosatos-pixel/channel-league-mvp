"use client";

import { PickSide } from "@/lib/types";
import { pickLabel, classNames } from "@/lib/utils";

interface PickChipsProps {
  value: PickSide;
  onChange: (value: PickSide) => void;
}

const items: Array<{ label: string; value: PickSide }> = [
  { label: "П1", value: "HOME" },
  { label: "Х", value: "DRAW" },
  { label: "П2", value: "AWAY" },
];

export function PickChips({ value, onChange }: PickChipsProps) {
  return (
    <div className="chipRow">
      {items.map((item) => (
        <button key={item.value} type="button" className={classNames("chip", value === item.value && "chipActive")} onClick={() => onChange(item.value)}>
          {pickLabel(item.value)}
        </button>
      ))}
    </div>
  );
}
