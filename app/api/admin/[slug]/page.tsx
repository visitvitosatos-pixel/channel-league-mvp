import { GlassCard } from "@/components/GlassCard";
import { getRepository } from "@/lib/repository";

export default async function AdminPage({ params }: { params: { slug: string } }) {
  const repository = getRepository();
  const overview = await repository.getAdminOverview(params.slug);

  return (
    <main className="pageWrap adminLayout">
      <header className="adminHeader">
        <div className="flex-between">
          <h1>Control Panel: {overview.channel.brandName}</h1>
          <span className="liveStatus">● LIVE DATA</span>
        </div>
      </header>

      <section className="statsGrid">
        {/* Метрика 1: Конверсия дня */}
        <GlassCard className="adminStat">
          <span className="muted">Прогнозы сегодня</span>
          <div className="bigNum">{overview.submittedToday}</div>
          <div className="trend positive">+12% к прошлому туру</div>
        </GlassCard>

        {/* Метрика 2: Ядро (NLP: называем это Активом, а не просто юзерами) */}
        <GlassCard className="adminStat">
          <span className="muted">Active Core (Ядро)</span>
          <div className="bigNum">{overview.activeCore}</div>
          <p className="tiny-label">Юзеры с серией 3+ прогноза</p>
        </GlassCard>

        {/* Метрика 3: Хайп-ставка */}
        <GlassCard className="adminStat">
          <span className="muted">Самый горячий рынок</span>
          <div className="hottestBet">{overview.hottestBet || "Боруссия - Бавария (П1)"}</div>
        </GlassCard>
      </section>

      {/* КРЕАТИВ: Блок генерации контента для канала */}
      <GlassCard className="contentGenerator">
        <h3>Content Engine</h3>
        <p className="muted">Сгенерируй пост для канала на основе данных лиги</p>
        <div className="adminActions">
          <button className="secondaryButton">📊 Пост "Итоги дня"</button>
          <button className="secondaryButton">🔥 Пост "Анонс тура"</button>
          <button className="primaryButton">📢 Опубликовать в канал</button>
        </div>
      </GlassCard>

      {/* Топ игроков для админа (кого похвалить в посте) */}
      <section className="topPlayersAdmin">
         <h3>Топ-3 кандидата на репост</h3>
         <div className="playerList">
           {overview.topPlayers.slice(0, 3).map(player => (
             <div key={player.tgUserId} className="adminPlayerRow">
               <span>{player.displayName}</span>
               <span className="badge">Streak: {player.streak}🔥</span>
             </div>
           ))}
         </div>
      </section>
    </main>
  );
}