import type { Todo as PrismaTodo } from "@prisma/client";

/** Database row shape from Prisma (matches `model Todo` in schema). */
export type Todo = PrismaTodo;

/**
 * Todo as sent over JSON (NextResponse, fetch, or RSC-serialized props).
 * `createdAt` is an ISO-8601 string, not a Date.
 */
export type TodoJson = Omit<PrismaTodo, "createdAt"> & {
  createdAt: string;
};

export type TodoErrorJson = {
  error: string;
};

export function todoToJson(todo: PrismaTodo): TodoJson {
  return {
    ...todo,
    createdAt: todo.createdAt.toISOString(),
  };
}

/** Extract a non-empty title from a parsed JSON body, or null if invalid. */
export function parseTodoTitleFromBody(body: unknown): string | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }
  const raw = (body as { title?: unknown }).title;
  const title = typeof raw === "string" ? raw.trim() : String(raw ?? "").trim();
  return title.length > 0 ? title : null;
}
