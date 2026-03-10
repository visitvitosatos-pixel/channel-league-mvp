"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { classNames } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

type TopNavProps = {
  items: NavItem[];
};

export function TopNav({ items }: TopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="topNav">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href as Route}
          className={classNames(
            "topNavItem",
            pathname === item.href && "topNavItemActive"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}