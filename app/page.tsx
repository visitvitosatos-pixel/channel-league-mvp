import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";

export default function HomePage() {
  return (
    <main className="pageWrap landingGrid">
      {/* ГЛАВНЫЙ БЛОК: Оффер, от которого нельзя отказаться */}
      <section className="heroColumn">
        <span className="eyebrow">Enterprise-Ready Solution 2026</span>
        <h1>Channel League: Ультимативный Social Layer для вашего комьюнити.</h1>
        <p className="lead">
          Хватит тонуть в хаосе скриншотов. Превратите свой канал в <strong>экосистему</strong> с автоматическими рейтингами, 
          статусами игроков и азартом, который удерживает аудиторию 24/7.
        </p>
        
        <div className="ctaRow">
          {/* Сделаем акцент на твой клуб */}
          <Link className="primaryButton" href="/mini/vitos-club">
            Демонстрация игрока (Live)
          </Link>
          <Link className="secondaryButton" href="/admin/vitos-club">
            Панель управления (Admin)
          </Link>
        </div>
      </section>

      {/* МЕТРИКИ: Почему админ должен это купить */}
      <GlassCard className="metricCard highlight">
        <div className="cardHeader">
          <span className="badge">For Admins</span>
          <h2>Управляй хаосом</h2>
        </div>
        <ul className="featureList">
          <li><strong>Branding Control:</strong> Полный White-label под стиль вашего канала.</li>
          <li><strong>Retention 2.0:</strong> Юзеры возвращаются каждый день проверить свой Trust Index.</li>
          <li><strong>Data Driven:</strong> Видьте свое ядро (Active Core), а не просто цифру подписчиков.</li>
          <li><strong>Automated Hype:</strong> Генерация постов «Матч дня» и «Итоги» в один клик.</li>
        </ul>
      </GlassCard>

      {/* СМЫСЛОВЫЕ БЛОКИ: Бьем в боли */}
      <GlassCard className="featureCard">
        <div className="icon">💎</div>
        <h3>Больше не «Просто бот»</h3>
        <p>Мы создали <strong>Social Proof</strong> систему. Репутация игрока теперь имеет вес. Ваши подписчики больше не анонимы — они участники элитной лиги.</p>
      </GlassCard>

      <GlassCard className="featureCard">
        <div className="icon">🚀</div>
        <h3>Конверсия в действие</h3>
        <p>Интуитивный UX Mini App заставляет даже пассивного зрителя нажать кнопку и стать частью движухи. Рост активности в 3-4 раза гарантирован.</p>
      </GlassCard>
    </main>
  );
}