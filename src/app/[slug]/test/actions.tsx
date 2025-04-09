'use server'
import pg from 'pg'
export async function connect () {
    const { Pool } = pg
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PAS,
        port: 5432,
    });
    return pool
}
export async function getLevelbyId (id:string) {
    const pool = await connect()
    const result = await pool.query(`Select * from level_yaric_test where id='${id}'`)
    return result.rows[0]
}