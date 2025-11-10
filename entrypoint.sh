#!/bin/sh
set -e


until nc -z postgres 5432 2>/dev/null
do
  echo "Trying to connect..."
  sleep 2
done

echo "Pushing..."
npx prisma db push
npx prisma generate

echo "Done!"
exec npm run start:dev