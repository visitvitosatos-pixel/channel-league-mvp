import { getRepository } from "@/lib/repository";
import { GlassCard } from "@/components/GlassCard";
import { PredictionForm } from "@/components/PredictionForm";
// ВАЖНО: Импортируем именно в фигурных скобках!
import { LiveFeed } from "@/components/LiveFeed"; 
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MiniAppPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getRepository();
  
  const [round, profile, leaderboard] = await Promise.all([
    repository.getCurrentRound(slug),
    repository.getProfile(slug, "demo-user"), 
    // Исправили на "weekly", чтобы TS не ругался
    repository.getLeaderboard(slug, "weekly") 
  ]);

  if (!round) notFound();
  if (!profile) return <div>Загрузка...</div>;

  return (
    <div className="miniAppWrapper">
      <GlassCard className="profileCard">
         {/* ... твой код профиля ... */}
         <h3>{profile.displayName}</h3>
      </GlassCard>

      {/* ТЕПЕРЬ ОН ЗАРАБОТАЕТ */}
      <LiveFeed />

      <GlassCard className="mainPanel">
        {/* ... твой код матча ... */}
        <PredictionForm slug={slug} defaultName={profile.displayName} />
      </GlassCard>

      <LeaderboardTable title="Топ лиги" entries={leaderboard} />
    </div>
  );
}