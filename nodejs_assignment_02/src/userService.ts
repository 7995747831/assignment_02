import { Pool } from 'pg';
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Akhil123$',
  port: 5432,
});
 
export interface User {
  id: number;
  name: string;
  email: string;
}
 
export const getUsers = async (): Promise<User[]> => {
  const response = await pool.query('SELECT * FROM users');
  return response.rows;
};
 
export const getUserById = async (id: number): Promise<User | null> => {
  const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return response.rows[0] || null;
};
 
const createTable = async () => {
    const response = await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL)');
    return response.rows[0];
}

 

 
export const createUser = async (name: string, email: string): Promise<User> => {
    await createTable()
  const response = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return response.rows[0];
};

export const updateUser = async (id: number, name: string, email: string): Promise<User | null> => {
  const response = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return response.rows[0] || null;
};
 
export const deleteUser = async (id: number): Promise<User | null> => {
  const response = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return response.rows[0] || null;
};
 