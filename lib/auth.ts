import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { normalizeLogin } from "@/lib/user-validation";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/** NextAuth requires this in production or it returns the generic "server configuration" error. */
const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const login = normalizeLogin(String(credentials?.login ?? ""));
        const password = credentials?.password;
        if (!login || typeof password !== "string" || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { login } });
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
          return null;
        }

        return {
          id: user.id,
          name: user.login,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: authSecret,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if (user.name) {
          token.name = user.name;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.id) {
          session.user.id = token.id as string;
        }
        if (token.name) {
          session.user.name = token.name as string;
        }
      }
      return session;
    },
  },
};
