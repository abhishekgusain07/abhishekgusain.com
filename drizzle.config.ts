import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit config for Neon Postgres.
 * - `npm run db:generate` → create SQL migrations from src/db/schema.ts
 * - `npm run db:migrate`  → apply migrations to the DB in DATABASE_URL
 * - `npm run db:push`     → push schema straight to the DB (handy for first setup)
 * - `npm run db:studio`   → open Drizzle Studio to browse leads
 */
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: true,
});
