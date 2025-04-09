import './main.css'
import pg from 'pg'
import Client from './client';
import { notFound } from 'next/navigation';

export default async function ServerComponent({params}: {params: Promise<{ slug: string }>}) {
    const slug = (await params).slug
    const { Pool } = pg
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PAS,
        port: 5432,
    });
    const result = await pool.query(`Select * from level_yaric_main where id = '${slug}'`)
    if (result.rows[0]==undefined) {notFound()}
    return(
        <Client slug={slug} />
    )
}