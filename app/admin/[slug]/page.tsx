import { GlassCard } from "@/components/GlassCard";
import { getRepository } from "@/lib/repository";

export default async function AdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repository = getRepository();
  const overview = await repository.getAdminOverview(slug);

  return (
    <main className="pageWrap adminPage">
      <div className="adminHeaderRow">
        <div>
          <span className="eyebrow">Admin digest</span>
          <h1>{overview.channel.title}</h1>
          <p className="lead smallLead">Ниже — тот минимум, который реально продаёт установку админу: участие, ядро и контент.</p>
        </div>
        <button className="primaryButton">Сгенерировать weekly report</button>
      </div>
      <div className="adminMetricGrid">
        <GlassCard><span>Открытия сегодня</span><strong>{overview.opensToday}</strong></GlassCard>
        <GlassCard><span>Прогнозы сегодня</span><strong>{overview.submittedToday}</strong></GlassCard>
        <GlassCard><span>Вечерние возвраты</span><strong>{overview.eveningReturns}</strong></GlassCard>
        <GlassCard><span>Ядро канала</span><strong>{overview.activeCore}</strong></GlassCard>
      </div>
      <div className="adminGrid">
        <GlassCard>
          <h2>Что публиковать сегодня</h2>
          <div className="postPreview">
            <strong>Матч дня</strong>
            <p>
              Сегодня в лиге главный пик — <b>{overview.hottestBet}</b>. Заходите в Mini App, фиксируйте свой выбор и смотрите, куда пошла толпа.
            </p>
          </div>
          <div className="postPreview">
            <strong>Итоги дня</strong>
            <p>Вечером покажем: кто угадал, кто поднялся в рейтинге и кто собрал больше всего доверия толпы.</p>
          </div>
        </GlassCard>
        <GlassCard>
          <h2>Топ игроков недели</h2>
          <ul className="miniList">
            {overview.topPlayers.map((player) => (
              <li key={player.tgUserId}>
                <strong>{player.rank}. {player.displayName}</strong>
                <span>{player.totalPoints} очков · {player.hitRate}% точность</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </main>
  );
}
