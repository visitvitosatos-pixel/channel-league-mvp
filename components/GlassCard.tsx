import { CSSProperties, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function GlassCard({ children, className = "", style }: GlassCardProps) {
  return <section className={`glassCard ${className}`.trim()} style={style}>{children}</section>;
}
