"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function ensureSignedIn() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/")}`);
  }
}

export async function createTodo(formData: FormData) {
  await ensureSignedIn();

  const title = String(formData.get("title") ?? "").trim();
  if (!title) {
    return;
  }

  await prisma.todo.create({
    data: { title },
  });
  revalidatePath("/");
}

export async function toggleTodo(formData: FormData) {
  await ensureSignedIn();

  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) {
    return;
  }

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    return;
  }

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });
  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  await ensureSignedIn();

  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) {
    return;
  }

  await prisma.todo.deleteMany({ where: { id } });
  revalidatePath("/");
}
