import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const outDir = resolve(process.cwd(), "infra", "docs");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "demo-seed.json"), JSON.stringify({
  channel: "vitos-club",
  players: 5,
  round: "2026-03-10",
}, null, 2));
console.log("[OK] wrote infra/docs/demo-seed.json");
