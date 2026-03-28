const steps = [
  {
    title: "Create an account (optional)",
    description:
      "Use Register to pick a login and password stored in the database, then Sign in. You need an account to add todos.",
  },
  {
    title: "Add a todo",
    description: "Type a task into the input field and click Add.",
  },
  {
    title: "Toggle status",
    description: "Click Toggle to mark a task complete or incomplete.",
  },
  {
    title: "Delete a todo",
    description: "Click Delete to remove a task from the list.",
  },
];

export default function HowToPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">How To</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          How to use this application
        </h1>
        <p className="mt-3 text-slate-600">
          This page explains the main actions a user can take in the app.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              {index + 1}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
