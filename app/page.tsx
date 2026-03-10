import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";

export default function HomePage() {
  return (
    <main className="pageWrap landingGrid">
      <section className="heroColumn">
        <span className="eyebrow">Pilot-ready MVP</span>
        <h1>Channel League — Mini App, который превращает хаос скриншотов в статус, рейтинг и вовлечённость.</h1>
        <p className="lead">
          Продукт для Telegram-каналов, где участники показывают свои пики, собирают реакцию толпы и попадают в недельную лигу,
          а админ получает живое ядро сообщества и понятную статистику участия.
        </p>
        <div className="ctaRow">
          <Link className="primaryButton" href="/mini/vitos-club">
            Открыть Mini App
          </Link>
          <Link className="secondaryButton" href="/admin/vitos-club">
            Открыть admin view
          </Link>
        </div>
      </section>
      <GlassCard className="metricCard">
        <h2>Что админ увидит до установки</h2>
        <ul className="featureList">
          <li>White-label оболочка под его канал</li>
          <li>Пики участников в структурированном виде</li>
          <li>Рейтинг дня и недели</li>
          <li>Карточку ядра активной аудитории</li>
          <li>Посты “Матч дня” и “Итоги дня”</li>
        </ul>
      </GlassCard>
      <GlassCard className="featureCard">
        <h3>Почему это сильнее обычного бота</h3>
        <p>Пользователи уже кидают скрины и просят мнение. Мы не ломаем ритуал — мы превращаем его в продукт.</p>
      </GlassCard>
      <GlassCard className="featureCard">
        <h3>Что продаём</h3>
        <p>Не “ставочный бот”, а social layer для группы: репутация, реакция толпы, weekly league и понятная польза для админа.</p>
      </GlassCard>
    </main>
  );
}
