#!/bin/sh
set -e

echo "Waiting database..."
until nc -z -v -w30 postgres 5432
do
  echo "Trying to connect..."
  sleep 1
done

echo "OK!"
npx prisma db push
exec npm run start:dev