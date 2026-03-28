import { AuthHeader } from "@/components/AuthHeader";
import { prisma } from "@/lib/prisma";
import type { Todo } from "@/types/todo";
import { CirclePlus, Inbox, ListTodo, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { createTodo, deleteTodo, toggleTodo } from "./actions";

export const dynamic = "force-dynamic";

async function getTodos(): Promise<Todo[]> {
  try {
    return await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <section className="space-y-10">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white shadow-lg">
        <h1 className="inline-flex items-center gap-3 text-4xl font-bold tracking-tight sm:text-5xl">
          <Sparkles className="h-9 w-9 shrink-0 text-blue-200 sm:h-11 sm:w-11" strokeWidth={2} aria-hidden />
          WELCOME
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-7 text-blue-50 sm:text-xl">
          This is your personal ToDo checklist organizer.
        </p>
      </div>

      <AuthHeader />

      <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <CirclePlus className="h-6 w-6 shrink-0 text-blue-600" strokeWidth={2} aria-hidden />
            Add Todo
          </h2>
          <p className="mt-2 text-sm text-slate-600">Enter a task below to add it to your list.</p>

          <form action={createTodo} className="mt-6 flex gap-3">
            <input
              name="title"
              placeholder="Enter a new todo"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <CirclePlus className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Add
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <ListTodo className="h-6 w-6 shrink-0 text-indigo-600" strokeWidth={2} aria-hidden />
                Your Todos
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {todos.length} item{todos.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {todos.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
              <Inbox className="h-10 w-10 text-slate-400" strokeWidth={1.5} aria-hidden />
              No todos yet. Add your first one.
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-3 w-3 rounded-full ${
                        todo.completed ? "bg-emerald-500" : "bg-amber-400"
                      }`}
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          todo.completed ? "text-slate-400 line-through" : "text-slate-900"
                        }`}
                      >
                        {todo.title}
                      </p>
                      <p className="text-xs text-slate-500">ID: {todo.id}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <form action={toggleTodo}>
                      <input type="hidden" name="id" value={todo.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        <RefreshCw className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                        Toggle
                      </button>
                    </form>

                    <form action={deleteTodo}>
                      <input type="hidden" name="id" value={todo.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
