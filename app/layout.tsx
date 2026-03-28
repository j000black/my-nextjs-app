import { Footer } from "@/components/Footer";
import { MainNav } from "@/components/MainNav";
import { fontMono, fontSans } from "./fonts";
import "./globals.css";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My First Cursor App",
  description: "Next.js + TypeScript + PostgreSQL + Docker starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased">
        <Providers>
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 transition hover:text-blue-700"
              >
                <LayoutDashboard className="h-7 w-7 text-blue-600" strokeWidth={2} aria-hidden />
                <span>My First Cursor App</span>
              </Link>

              <MainNav />
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
