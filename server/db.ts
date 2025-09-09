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
  
  console.log('Initializing database with NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_URL format:', process.env.DATABASE_URL?.substring(0, 20) + '...');
  
  // Check if DATABASE_URL is a Neon URL (contains 'neon.tech' or uses WebSocket)
  const isNeonUrl = process.env.DATABASE_URL?.includes('neon.tech') || 
                    process.env.DATABASE_URL?.startsWith('wss://') ||
                    process.env.DATABASE_URL?.startsWith('ws://');
  
  if (isNeonUrl) {
    // Use Neon serverless driver for Neon databases
    const ws = (await import('ws')).default;
    const { Pool } = await import('@neondatabase/serverless');
    const { drizzle } = await import('drizzle-orm/neon-serverless');
    
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      webSocketConstructor: ws,  // 👈 Fix here
    });
    db = drizzle({ client: pool, schema });
  } else {
    // Use regular PostgreSQL driver for other databases
    console.log('Using regular PostgreSQL driver');
    const { Pool } = await import('pg');
    const { drizzle } = await import('drizzle-orm/node-postgres');
    
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  }
  
  initialized = true;
  return { pool, db };
}

// Export the initialization function and getters
export { initializeDatabase };

// Export getters that will initialize if needed
export const getPool = async () => {
  try {
    if (!initialized) await initializeDatabase();
    return pool;
  } catch (error) {
    console.error('Error getting database pool:', error);
    throw error;
  }
};

export const getDb = async () => {
  try {
    if (!initialized) await initializeDatabase();
    return db;
  } catch (error) {
    console.error('Error getting database connection:', error);
    throw error;
  }
};
