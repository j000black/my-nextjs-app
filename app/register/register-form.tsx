"use client";

import { LOGIN_RULES } from "@/lib/user-validation";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "./actions";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerUser, null);

  return (
    <div className="mx-auto max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Account</p>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
          <UserPlus className="h-8 w-8 shrink-0 text-blue-600" strokeWidth={2} aria-hidden />
          Create an account
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Choose a unique login and a password. You will use these to sign in.
        </p>
      </div>

      {state ? (
        <div
          role="alert"
          className={`rounded-lg border px-4 py-3 text-sm ${
            state.error === "login_taken"
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="login" className="block text-sm font-medium text-slate-700">
            Login
          </label>
          <input
            id="login"
            name="login"
            type="text"
            autoComplete="username"
            required
            minLength={3}
            maxLength={32}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
            aria-describedby="login-hint"
          />
          <p id="login-hint" className="mt-1 text-xs text-slate-500">
            {LOGIN_RULES}
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
