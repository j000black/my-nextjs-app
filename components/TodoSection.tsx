"use client";

import type { TodoErrorJson, TodoJson } from "@/types/todo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  todos: TodoJson[];
  /** True when Postgres could not be reached (e.g. Docker db not running). */
  dbUnavailable?: boolean;
};

export function TodoSection({ todos, dbUnavailable = false }: Props) {
  const { status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const sessionLoading = status === "loading";
  const signedIn = status === "authenticated";
  const formDisabled = pending || dbUnavailable || sessionLoading || !signedIn;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Enter a title");
      return;
    }

    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      });

      if (!res.ok) {
        const data: unknown = await res.json().catch(() => null);
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as TodoErrorJson).error === "string"
            ? (data as TodoErrorJson).error
            : "Could not create todo";
        throw new Error(message);
      }

      setTitle("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {dbUnavailable ? (
        <div
          role="alert"
          style={{
            marginBottom: "1.25rem",
            padding: "1rem",
            background: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: "6px",
            color: "#78350f",
          }}
        >
          <strong>Database unreachable.</strong> Start Postgres, then reload. For example:{" "}
          <code style={{ fontSize: "0.9em" }}>docker compose up -d db</code>
          <br />
          <span style={{ fontSize: "0.9em" }}>
            Your <code>DATABASE_URL</code> should use <code>localhost</code> and the <strong>host port</strong> mapped for
            <code>db</code> in <code>docker-compose.yml</code> (here <code>5433</code>), with the same user, password,
            and database name as in that file.
          </span>
        </div>
      ) : null}

      {!dbUnavailable && !sessionLoading && !signedIn ? (
        <p style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#57534e" }}>
          Sign in above to add todos.
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}
      >
        <label htmlFor="new-todo" style={{ flex: "1 1 200px" }}>
          <span style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>
            New todo
          </span>
          <input
            id="new-todo"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            disabled={formDisabled}
            autoComplete="off"
            style={{ width: "100%", padding: "0.5rem 0.75rem", fontSize: "1rem" }}
          />
        </label>
        <button
          type="submit"
          disabled={formDisabled}
          style={{ marginTop: "1.25rem", padding: "0.5rem 1rem" }}
        >
          {pending ? "Adding…" : "Add"}
        </button>
      </form>

      {error ? (
        <p role="alert" style={{ color: "#b91c1c", marginBottom: "1rem" }}>
          {error}
        </p>
      ) : null}

      <h2>Todos</h2>

      {dbUnavailable ? (
        <p style={{ color: "#57534e" }}>Todos could not be loaded until the database is available.</p>
      ) : todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} {todo.completed ? "✅" : "⬜"}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
