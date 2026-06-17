import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

/**
 * Lazy Drizzle client over Neon's HTTP driver (ideal for serverless functions —
 * no pooling to manage). Lazily created so importing this module never throws at
 * build time when DATABASE_URL is absent; it only connects on first query.
 */
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon connection string to .env.local (see .env.example)."
    );
  }
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export { schema };
