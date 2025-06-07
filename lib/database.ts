import { Sequelize } from 'sequelize';
import config from '../config/config.js';


const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port
});
export default sequelize;

async function testConnection() {
   try {
       await sequelize.authenticate();
       console.log('Connection has been established successfully.');
   } catch (error) {
       console.error('Unable to connect to the database:', error);
   }
}
testConnection();



// CHECK IF CAN BE REMOVED

import { Pool, PoolClient } from 'pg';

// Global connection pool
let pool: Pool;

export const getPool = (): Pool => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('PostgreSQL pool error:', err);
    });
  }
  return pool;
};

export const query = async (text: string, params?: any[]) => {
  const client = getPool();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const getClient = async (): Promise<PoolClient> => {
  return await getPool().connect();
};


// Cleanup function
export const closePool = async () => {
  if (pool) {
    await pool.end();
  }
};



