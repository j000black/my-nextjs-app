import { MAIN_NAV_LINKS } from "@/lib/nav";
import { navIconByHref } from "@/lib/nav-icons";
import Link from "next/link";
import { Copyright, Home } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {MAIN_NAV_LINKS.map((item) => {
              const Icon = navIconByHref[item.href] ?? Home;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <p className="inline-flex items-center gap-2 text-sm text-slate-500 sm:justify-end sm:text-right">
            <Copyright className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            <span>
              © {year} My First Cursor App. All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
