import { Pool } from 'pg';
 
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Akhil123$', // Use environment variable or fallback
  port: parseInt(process.env.DB_PORT || '5432', 10), // Convert port to number
});
 
export default pool;