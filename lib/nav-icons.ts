import { BookOpen, Home, Mail, UsersRound, type LucideIcon } from "lucide-react";

/** Lucide icon per main-nav href (keep in sync with `lib/nav.ts`). */
export const navIconByHref: Record<string, LucideIcon> = {
  "/": Home,
  "/about": UsersRound,
  "/contact": Mail,
  "/how-to": BookOpen,
};
