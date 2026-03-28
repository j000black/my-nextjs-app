This is a [Next.js](https://nextjs.org) App Router project using PostgreSQL + Prisma.

## Getting Started

1) Start PostgreSQL with Docker Compose:

```bash
docker compose up -d
```

2) Configure `DATABASE_URL` in `.env`:

```bash
DATABASE_URL="postgresql://appuser:apppassword@localhost:5433/appdb?schema=public"
```

3) Create and apply migrations:

```bash
npx prisma migrate dev --name init
```

4) Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the home page and [http://localhost:3000/api/health](http://localhost:3000/api/health) for health status.

Stop the database when needed:

```bash
docker compose down
```

## What was added

- Prisma schema with a `Post` model in `prisma/schema.prisma`
- Prisma singleton client in `lib/prisma.ts`
- Health check route at `app/api/health/route.ts`
- Home page database query/listing in `app/page.tsx`

## Learn More

To learn more, check:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs)
