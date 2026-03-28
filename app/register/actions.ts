"use server";

import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import {
  isValidLoginNormalized,
  isValidNewPassword,
  normalizeLogin,
} from "@/lib/user-validation";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export type RegisterFormState = {
  error: "login_taken" | "validation";
  message: string;
} | null;

export async function registerUser(
  _prevState: RegisterFormState | undefined,
  formData: FormData,
): Promise<RegisterFormState> {
  const rawLogin = String(formData.get("login") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const login = normalizeLogin(rawLogin);

  if (!isValidLoginNormalized(login)) {
    return {
      error: "validation",
      message:
        "Choose a valid login: 3–32 characters using letters, numbers, and underscores only.",
    };
  }

  if (!isValidNewPassword(password)) {
    return {
      error: "validation",
      message: "Password must be between 8 and 128 characters.",
    };
  }

  if (password !== confirm) {
    return {
      error: "validation",
      message: "Password and confirmation do not match.",
    };
  }

  const taken = await prisma.user.findUnique({
    where: { login },
    select: { id: true },
  });
  if (taken) {
    return {
      error: "login_taken",
      message:
        "That login is already taken. Pick another one.",
    };
  }

  const passwordHash = await hashPassword(password);

  try {
    await prisma.user.create({
      data: { login, passwordHash },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        error: "login_taken",
        message:
          "That login is already taken. Pick another one.",
      };
    }
    throw e;
  }

  redirect("/login?registered=1");
}
