import config from "./config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql = neon(config.DATABASE_URL);
export const db = drizzle({ client: sql, logger: true });
  