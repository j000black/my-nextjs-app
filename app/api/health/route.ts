import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return Response.json(
      { status: "ok", db: "up", timestamp: new Date().toISOString() },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { status: "error", db: "down", timestamp: new Date().toISOString() },
      { status: 503 },
    );
  }
}
