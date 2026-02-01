import { Pool } from 'pg'

const url = process.env.DATABASE_URL
export default new Pool({ connectionString: url })