import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { PGHOST, PGPORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

if (!PGHOST || !POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
  throw new Error('❌ Required environment variables for database are missing');
}

export const pool = new Pool({
  host: PGHOST,
  port: Number(PGPORT) || 5432,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
});
