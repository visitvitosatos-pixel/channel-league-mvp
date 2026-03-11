// components/GlassCard.tsx
import { CSSProperties, ReactNode } from "react";

// Описываем, какие данные принимает компонент
interface GlassCardProps {
  children: ReactNode;      // Внутреннее содержимое карточки
  className?: string;       // Дополнительные CSS классы
  style?: CSSProperties;    // Возможность передать стили напрямую (например, цвет бордера)
}

export function GlassCard({ children, className = "", style }: GlassCardProps) {
  return (
    <section 
      className={`glassCard ${className}`.trim()} 
      style={{
        ...style,
        // Добавляем эффект дорогого матового стекла прямо в инлайн-стили
        backdropFilter: "blur(12px) saturate(160%)", 
        WebkitBackdropFilter: "blur(12px) saturate(160%)", // Поддержка iPhone (Safari)
      }}
    >
      {children}
    </section>
  );
}