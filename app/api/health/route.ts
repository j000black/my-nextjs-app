import { prisma } from "@/lib/prisma";

function isVerboseHealth(): boolean {
  const v = process.env.HEALTHCHECK_VERBOSE;
  return v === "1" || v === "true";
}

function serializeError(error: unknown): Record<string, string> {
  if (error instanceof Error) {
    const out: Record<string, string> = {
      name: error.name,
      message: error.message,
    };
    const code = (error as { code?: string }).code;
    if (typeof code === "string") {
      out.code = code;
    }
    return out;
  }
  return { message: String(error) };
}

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return Response.json(
      { status: "ok", db: "up", timestamp: new Date().toISOString() },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Health check database query failed:",
      error instanceof Error ? error.message : error,
      error,
    );

    const body: Record<string, unknown> = {
      status: "error",
      db: "down",
      timestamp: new Date().toISOString(),
    };

    if (isVerboseHealth()) {
      body.error = serializeError(error);
    }

    return Response.json(body, { status: 503 });
  }
}
