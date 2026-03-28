"use client";

import { signOut, useSession } from "next-auth/react";
import { KeyRound, Loader2, LogIn, LogOut, User, UserPlus } from "lucide-react";
import Link from "next/link";

export function AuthHeader() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-slate-500" aria-hidden />
        Checking session…
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          <KeyRound className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Sign in
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Register
        </Link>
        <p className="flex items-start gap-2 text-sm text-slate-600 sm:basis-full">
          <LogIn className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden />
          <span>You can browse todos without signing in. Sign in to add new todos.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 text-sm text-slate-700">
        <User className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
        Signed in as{" "}
        <strong className="font-semibold text-slate-900">
          {session.user.name ?? session.user.id}
        </strong>
      </span>
      <button
        type="button"
        onClick={() => signOut()}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
      >
        <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        Sign out
      </button>
    </div>
  );
}
