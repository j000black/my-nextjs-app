import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseTodoTitleFromBody, todoToJson, type TodoJson } from "@/types/todo";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  const todos: TodoJson[] = rows.map(todoToJson);
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Sign in to create todos" }, { status: 401 });
  }

  const body: unknown = await req.json();
  const title = parseTodoTitleFromBody(body);

  if (title === null) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const created = await prisma.todo.create({
    data: { title },
  });

  return NextResponse.json(todoToJson(created), { status: 201 });
}
