import { config } from "dotenv";
import pg from 'pg';

config();

const { Pool } = pg;

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'NOT FOUND');
console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length);
console.log('First 50 chars:', process.env.DATABASE_URL?.substring(0, 50));

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set!');
  process.exit(1);
}

try {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Connection error:', err.message);
      console.error('Error details:', err);
      process.exit(1);
    } else {
      console.log('✅ Connection successful!');
      console.log('Current time:', res.rows[0].now);
      pool.end();
      process.exit(0);
    }
  });
} catch (error) {
  console.error('Error creating pool:', error);
  process.exit(1);
}

