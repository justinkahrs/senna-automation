import { Pool } from 'pg';

// Create a singleton pool and reuse it
// For Vercel/serverless environments, the pool might be recreated on cold starts,
// but it's still better to share it within a single instance.
const sslConfig = () => {
  if (process.env.DATABASE_URL?.includes("sslmode=disable")) return false;
  if (process.env.DATABASE_URL?.includes("localhost") || process.env.DATABASE_URL?.includes("127.0.0.1")) return false;
  return { rejectUnauthorized: false };
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig(),
});

/**
 * Executes a query against the Postgres pool.
 * @param text The SQL query text.
 * @param params Optional array of parameters for the query.
 * @returns The query result.
 */
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
