import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";

export default function HomePage() {
  return (
    <main className="landing-wrapper">
      <nav className="top-nav">
        <div className="logo">SECTOR_88</div>
        <div className="nav-links">
          <Link href="/mini/vitos-club">Лига</Link>
          <Link href="/admin/vitos-club">Админ-панель</Link>
        </div>
      </nav>

      <section className="hero">
        <span className="badge live-pulse">ACTIVE ROUND: OPEN</span>
        <h1>Channel League</h1>
        <p className="lead">
          Ультимативная платформа для футбольных прогнозов. 
          Анализируй <strong>xG</strong>, бей <strong>ТБ 2.5</strong> и забирай <strong>Streak Bonus</strong>.
        </p>
        
        <div className="cta-group">
          <Link href="/mini/vitos-club" className="btn-primary pulse">СДЕЛАТЬ ПРОГНОЗ (TG)</Link>
          <Link href="/admin/vitos-club" className="btn-secondary">УПРАВЛЯТЬ КАНАЛОМ</Link>
        </div>
      </section>

      <section className="features">
        <GlassCard className="glass-node">
          <div className="node-head">⚽ FOOTBALL INSIGHTS</div>
          <h3>Аналитика матчей</h3>
          <p>Счет первого тайма (HT) и финальный результат. Всё для глубокого анализа твоих ставок.</p>
        </GlassCard>

        <GlassCard className="glass-node">
          <div className="node-head">📈 SCORING SYSTEM</div>
          <h3>Crowd & Streak</h3>
          <p>Получай дополнительные очки, если твой прогноз совпал с мнением большинства или если ты идешь на серии.</p>
        </GlassCard>

        <GlassCard className="glass-node">
          <div className="node-head">🏢 WHITE LABEL</div>
          <h3>Brand Control</h3>
          <p>Настраивай <strong>accentColor</strong> и свой логотип для каждого отдельного Telegram-канала.</p>
        </GlassCard>
      </section>
    </main>
  );
}