import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";// `globalThis` is the global object in Node.js (similar to `window` in the browser).
// We extend its type so TypeScript knows it may contain a `prisma` instance.
// Without this type assertion, TypeScript would complain that


// `globalThis.prisma` does not exist.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient| undefined;
};

// Reuse the existing Prisma client if one already exists.
// Otherwise, create a new instance.
//
// This is mainly useful during development because tools like
// Next.js, Nodemon, or other hot-reloading environments reload
// modules whenever files change. Without reusing the client,
// every reload would create a new PrismaClient and open another
// database connection, eventually leading to connection limit errors.
const adapter = new PrismaBetterSqlite3({
  url: process.env["DATABASE_URL"]!,
});

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

// In production, modules are loaded only once, so there is no need
// to store the client globally. During development, however, we save
// the instance on `globalThis` so future reloads can reuse it.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}