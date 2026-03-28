export const MAIN_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contacts" },
  { href: "/how-to", label: "How To" },
] as const;

export type MainNavLink = (typeof MAIN_NAV_LINKS)[number];
