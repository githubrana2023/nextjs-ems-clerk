import 'dotenv/config'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migration",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.LOCAL_DATABASE_URL!
    }
});