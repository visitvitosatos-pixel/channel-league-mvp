import type { CSSProperties } from "react";
import { GlassCard } from "@/components/GlassCard";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { PredictionForm } from "@/components/PredictionForm";
import { getRepository } from "@/lib/repository";
import { formatTime, toPercent } from "@/lib/utils";

export default async function MiniAppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repository = getRepository();
  const branding = await repository.getChannelBranding(slug);
  const round = await repository.getCurrentRound(slug);
  const daily = await repository.getLeaderboard(slug, "daily");
  const weekly = await repository.getLeaderboard(slug, "weekly");
  const profile = await repository.getProfile(slug, "1005");

  return (
    <main className="pageWrap miniPage">
      <GlassCard className="brandHero" style={{ borderColor: `${branding.accentColor}66` } as CSSProperties}>
        <div className="brandBadge" style={{ background: branding.accentColor }} />
        <div>
          <span className="eyebrow">{branding.brandName}</span>
          <h1>{branding.title}</h1>
          <p className="muted maxWidth520">{branding.subtitle}</p>
        </div>
      </GlassCard>

      <div className="miniGrid">
        <GlassCard className="mainPanel">
          <div className="cardTopRow">
            <div>
              <span className="eyebrow">{round.title}</span>
              <h2>
                {round.featuredMatch.homeTeam} — {round.featuredMatch.awayTeam}
              </h2>
              <p className="muted">Старт: {formatTime(round.featuredMatch.startsAt)} · Дедлайн фиксации до начала матча</p>
            </div>
            <div className="pulseDot" style={{ background: branding.accentColor }} />
          </div>

          <div className="crowdSplitBlock">
            <div>
              <span className="muted">Толпа верит в П1</span>
              <strong>{toPercent(round.crowdSplit.HOME)}</strong>
            </div>
            <div>
              <span className="muted">Ничья</span>
              <strong>{toPercent(round.crowdSplit.DRAW)}</strong>
            </div>
            <div>
              <span className="muted">П2</span>
              <strong>{toPercent(round.crowdSplit.AWAY)}</strong>
            </div>
          </div>

          <PredictionForm slug={slug} defaultName={profile.displayName} />
        </GlassCard>

        <div className="sideColumn">
          <GlassCard>
            <span className="eyebrow">Профиль игрока</span>
            <h3>{profile.displayName}</h3>
            <div className="profileStats">
              <div><span>Точность</span><strong>{profile.hitRate}%</strong></div>
              <div><span>Серия</span><strong>{profile.streak}</strong></div>
              <div><span>Дивизион</span><strong>{profile.division}</strong></div>
              <div><span>Индекс доверия</span><strong>{profile.trustIndex}</strong></div>
            </div>
            <ul className="miniList">
              {profile.lastPicks.map((pick) => (
                <li key={pick.id}>
                  <strong>{pick.label}</strong>
                  <span>
                    {pick.pick} · {pick.settled ? (pick.won ? "зашло" : "не зашло") : "в процессе"}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>

      <div className="boardsGrid">
        <GlassCard>
          <LeaderboardTable title="Топ дня" entries={daily} />
        </GlassCard>
        <GlassCard>
          <LeaderboardTable title="Топ недели" entries={weekly} />
        </GlassCard>
      </div>
    </main>
  );
}
