#!/bin/sh
set -e
cd /app

if [ -z "$DATABASE_URL" ]; then
  echo "FATAL: DATABASE_URL is empty or unset in this container."
  echo "Fix: Railway → this app service → Variables → add DATABASE_URL (use the reference picker to point at your Postgres service)."
  echo "The Postgres service name in \${{Name.DATABASE_URL}} must match exactly. Redeploy after saving staged variables."
  exit 1
fi

exec npm run start:prod
