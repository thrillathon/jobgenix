
import config from "./lib/config";

export default {
  dialect: "postgresql",
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: config.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};