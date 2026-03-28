import { Suspense } from "react";
import { LoginForm } from "./login-form";

function LoginFallback() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
      Loading…
    </div>
  );
}

export default function LoginPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center py-6">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
