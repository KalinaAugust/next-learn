import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

const envFile = readFileSync(".env.local", "utf-8");
const match = envFile.match(/^DATABASE_URL=(.+)$/m);
if (!match) throw new Error("DATABASE_URL not found in .env.local");
const DATABASE_URL = match[1].trim();

const sql = neon(DATABASE_URL);

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    password TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS accounts (
    id TEXT NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,
    UNIQUE(provider, "providerAccountId")
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" TEXT NOT NULL UNIQUE
  )`,
  `CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (identifier, token)
  )`,
];

for (const stmt of statements) {
  try {
    await sql.query(stmt);
    const tableName = stmt.match(/CREATE TABLE IF NOT EXISTS (\S+)/)[1];
    console.log(`✓ ${tableName}`);
  } catch (err) {
    console.error("Ошибка:", err.message);
    process.exit(1);
  }
}

console.log("✓ Миграция завершена");
