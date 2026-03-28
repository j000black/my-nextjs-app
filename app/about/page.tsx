export default function AboutPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">About Us</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Building simple tools that are easy to use
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Our Mission</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            We create clean, practical software that helps users get real work done quickly.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">What We Build</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Modern web applications with fast interfaces, reliable data, and thoughtful user experience.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">How We Work</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            We iterate in small steps, improve continuously, and prioritize clarity over complexity.
          </p>
        </div>
      </div>
    </section>
  );
}
