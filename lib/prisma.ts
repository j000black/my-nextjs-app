import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

/** True when the cached client matches the generated schema (has `User`). */
function hasUserModel(client: PrismaClient): boolean {
  return typeof client.user?.findUnique === "function";
}

function getPrisma(): PrismaClient {
  const existing = globalForPrisma.prisma;
  if (existing && hasUserModel(existing)) {
    return existing;
  }

  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  return client;
}

/** Lazy singleton so `next build` can run without `DATABASE_URL` (set it in production). */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, client);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
