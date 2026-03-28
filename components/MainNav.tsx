"use client";

import { MAIN_NAV_LINKS } from "@/lib/nav";
import { navIconByHref } from "@/lib/nav-icons";
import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2" aria-label="Main">
      {MAIN_NAV_LINKS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = navIconByHref[item.href] ?? Home;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              isActive
                ? "inline-flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-800"
                : "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            }
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-4 w-4 shrink-0 opacity-90" strokeWidth={2} aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
