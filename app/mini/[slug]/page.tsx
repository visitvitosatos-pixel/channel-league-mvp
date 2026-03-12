import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";

export default function HomePage() {
  return (
    <main className="landing-wrapper">
      {/* ПЕРВЫЙ ЭКРАН: Сразу в бой */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="status-badge live-pulse">LIVE: СЕЗОН ОТКРЫТ</span>
          <h1>Vitos Betting League</h1>
          <p className="description">
            Твоя репутация в беттинге начинается здесь. Делай прогнозы, поднимай Trust Index и докажи, что ты лучший в комьюнити.
          </p>
          <div className="button-group">
            {/* Кнопка "Вход" — самая яркая */}
            <Link className="btn-main pulse-animation" href="/mini/vitos-club">
              ВСТУПИТЬ В ЛИГУ (TG)
            </Link>
          </div>
        </div>
      </section>

      {/* БОЕВОЙ КОМПЛЕКТ: Стеклянные карточки */}
      <section className="features-grid">
        <GlassCard className="info-card glass-effect">
          <div className="card-status">Мой Профиль</div>
          <h3>Личная статистика</h3>
          <p>Твои хиты, промахи и текущий стрик. Всё сохраняется в твоем ID.</p>
          <Link href="/mini/vitos-club" className="card-link">Посмотреть →</Link>
        </GlassCard>

        <GlassCard className="info-card glass-effect">
          <div className="card-status">Топ Игроков</div>
          <h3>Рейтинг Лиги</h3>
          <p>Борьба за Gold Division. Узнай, кто сегодня забирает банк и возглавляет таблицу.</p>
          <Link href="/mini/vitos-club" className="card-link">Открыть топ →</Link>
        </GlassCard>

        <GlassCard className="info-card glass-effect">
          <div className="card-status">Админам</div>
          <h3>Управление каналом</h3>
          <p>Инструменты для автоматизации твоего сообщества и удержания аудитории.</p>
          <Link href="/admin/vitos-club" className="card-link">Вход в панель →</Link>
        </GlassCard>
      </section>
    </main>
  );
}