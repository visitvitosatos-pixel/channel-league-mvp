import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";

export default function HomePage() {
  return (
    <main className="landing-wrapper">
      {/* ГЛАВНЫЙ БАННЕР */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="status-badge">Solution 2026</span>
          <h1>Channel League</h1>
          <p className="description">
            Профессиональный Social Layer для беттинг-сообществ. 
            Автоматизируем турниры, считаем рейтинги, вовлекаем аудиторию.
          </p>
          <div className="button-group">
            <Link className="btn-main" href="/mini/vitos-club">Открыть приложение</Link>
            <Link className="btn-alt" href="/admin/vitos-club">Панель управления</Link>
          </div>
        </div>
      </section>

      {/* СЕТКА С ПРЕИМУЩЕСТВАМИ: На ПК в ряд, на мобилках в столбик */}
      <section className="features-grid">
        <GlassCard className="info-card">
          <div className="icon">🏆</div>
          <h3>Для игроков</h3>
          <p>Личный профиль, Trust Index, история прогнозов и борьба за топ в глобальном рейтинге.</p>
        </GlassCard>

        <GlassCard className="info-card">
          <div className="icon">📊</div>
          <h3>Для админов</h3>
          <p>Полная аналитика ядра канала. Автогенерация отчетов и постов для Telegram в один клик.</p>
        </GlassCard>

        <GlassCard className="info-card">
          <div className="icon">⚙️</div>
          <h3>White Label</h3>
          <p>Настройка брендинга, логотипов и цветов под стиль вашего сообщества.</p>
        </GlassCard>
      </section>
    </main>
  );
}