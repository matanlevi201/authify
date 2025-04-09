import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DB URL is missing");
}
export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    ssl: {
      // for Render's self-signed cert, only for educational and skill showcase purposes
      rejectUnauthorized: false,
    },
  },
  dialect: "postgresql",
});
