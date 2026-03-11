import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";

export default function HomePage() {
  return (
    <main className="pageWrap landingGrid">
      {/* 1. ГЛАВНЫЙ БЛОК: Заголовок и кнопки */}
      <section className="heroColumn">
        <span className="eyebrow">ENTERPRISE-READY SOLUTION 2026</span>
        <h1>Channel League: Ультимативный Social Layer для вашего комьюнити.</h1>
        <p className="lead">
          Хватит тонуть в хаосе скриншотов. Превратите свой канал в <strong>экосистему</strong> с автоматическими рейтингами, 
          статусами игроков и азартом, который удерживает аудиторию 24/7.
        </p>
        
        <div className="ctaRow">
          <Link className="primaryButton" href="/mini/vitos-club">
            Демонстрация игрока (Live)
          </Link>
          <Link className="secondaryButton" href="/admin/vitos-club">
            Панель управления (Admin)
          </Link>
        </div>
      </section>

      {/* 2. ВИЗУАЛЬНЫЙ БЛОК (ТОТ САМЫЙ ТЕЛЕФОН): Закрывает пустое место слева */}
      <div className="phoneVisualWrapper">
        {/* Фиолетовое свечение за телефоном */}
        <div className="phoneGlow"></div>
        
        {/* Корпус телефона */}
        <div className="phoneFrame">
          <div className="phoneScreen">
            {/* Имитация интерфейса твоего приложения внутри телефона */}
            <div className="mockNav">League MVP</div>
            <div className="mockProfileCard">
              <div className="mockAvatar"></div>
              <div className="mockLines">
                <div className="line long"></div>
                <div className="line short"></div>
              </div>
            </div>
            <div className="mockBetCard">
              <div className="line medium"></div>
              <div className="mockButton">Прогноз</div>
            </div>
            <div className="mockList">
              <div className="line full"></div>
              <div className="line full"></div>
              <div className="line full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. МЕТРИКИ ДЛЯ АДМИНА: Теперь этот блок будет справа от телефона */}
      <GlassCard className="metricCard highlight">
        <div className="cardHeader">
          <span className="badge">For Admins</span>
          <h2>Управляй хаосом</h2>
        </div>
        <ul className="featureList">
          <li><strong>Branding Control:</strong> Полный White-label под стиль вашего канала.</li>
          <li><strong>Retention 2.0:</strong> Юзеры возвращаются каждый день проверить свой Trust Index.</li>
          <li><strong>Data Driven:</strong> Видьте свое ядро (Active Core), а не просто цифру подписчиков.</li>
          <li><strong>Automated Hype:</strong> Генерация постов в один клик.</li>
        </ul>
      </GlassCard>

      {/* 4. ДОПОЛНИТЕЛЬНЫЕ КАРТОЧКИ */}
      <GlassCard className="featureCard">
        <div className="icon">💎</div>
        <h3>Больше не «Просто бот»</h3>
        <p>Мы создали <strong>Social Proof</strong> систему. Репутация игрока теперь имеет вес.</p>
      </GlassCard>

      <GlassCard className="featureCard">
        <div className="icon">🚀</div>
        <h3>Конверсия в действие</h3>
        <p>Интуитивный UX Mini App заставляет даже пассивного зрителя стать частью движухи.</p>
      </GlassCard>
    </main>
  );
}