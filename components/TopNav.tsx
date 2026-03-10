"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "@/lib/utils";

const items = [
  { href: "/", label: "Лендинг" },
  { href: "/mini/vitos-club", label: "Mini App" },
  { href: "/admin/vitos-club", label: "Admin" },
];

export function TopNav() {
  const pathname = usePathname();
  return (
    <nav className="topNav">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={classNames("topNavItem", pathname === item.href && "topNavItemActive")}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
