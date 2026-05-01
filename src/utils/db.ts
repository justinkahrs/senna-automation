import { Pool } from 'pg';

// Create a singleton pool and reuse it
// For Vercel/serverless environments, the pool might be recreated on cold starts,
// but it's still better to share it within a single instance.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Automatically enable SSL for non-localhost connections
  // We use rejectUnauthorized: false because Digital Ocean / self-hosted certs
  // might not be in the trusted store of Vercel runners by default.
  ssl: process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1')
    ? false
    : { rejectUnauthorized: false },
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
