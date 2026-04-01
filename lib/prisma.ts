import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function skipAutoTls(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "db" // docker-compose service name
  );
}

function createPrismaClient(): PrismaClient {
  const rawConnectionString = process.env.DATABASE_URL;
  if (!rawConnectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  const parsedUrl = new URL(rawConnectionString);
  const hostname = parsedUrl.hostname;
  const isLocalish = skipAutoTls(hostname);

  // `node-pg` reads `sslmode` from the URL and can enforce certificate verification there,
  // which ignores `PoolConfig.ssl` and causes P2010 on Railway-style chains.
  // For hosted DBs, drop URL sslmode and rely on explicit `ssl` below.
  if (!isLocalish) {
    parsedUrl.searchParams.delete("sslmode");
  }

  const connectionString = parsedUrl.toString();

  const adapter = isLocalish
    ? new PrismaPg({ connectionString })
    : new PrismaPg({
        connectionString,
        ssl: { rejectUnauthorized: false },
      });

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
