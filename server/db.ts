import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use different drivers based on environment
let pool: any;
let db: any;
let initialized = false;

async function initializeDatabase() {
  if (initialized) return { pool, db };
  
  if (process.env.NODE_ENV === 'production') {
    // For production (like Replit), use regular PostgreSQL driver
    const { Pool } = await import('pg');
    const { drizzle } = await import('drizzle-orm/node-postgres');
    
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  } else {
    // For development, use Neon serverless driver
    const { Pool } = await import('@neondatabase/serverless');
    const { drizzle } = await import('drizzle-orm/neon-serverless');
    
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
  }
  
  initialized = true;
  return { pool, db };
}

// Export the initialization function and getters
export { initializeDatabase };

// Export getters that will initialize if needed
export const getPool = async () => {
  if (!initialized) await initializeDatabase();
  return pool;
};

export const getDb = async () => {
  if (!initialized) await initializeDatabase();
  return db;
};
