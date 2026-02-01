import pool from './pool.js'
import { hash } from 'bcrypt'

async function truncate() {
    try {
        console.log('Truncating tables...')
        await pool.query('TRUNCATE TABLE member RESTART IDENTITY CASCADE;')
        await pool.query('TRUNCATE TABLE message;')
        console.log('Truncated tables.')
    } catch (err) {
        console.log('Failed to truncate tables.')
        throw err
    }
}

async function populate() {
    const hashed = await hash(process.env.ADMIN_PASS, 10)
    try {
        console.log('Populating tables...')
        await pool.query('INSERT INTO member (mem_name, mem_hash, mem_email, mem_admin) VALUES ($1, $2, $3, $4)',
            ['Boltlord', hashed, 'boltlord1@gmail.com', true])
        await pool.query('INSERT INTO message (mem_id, msg_head, msg_text, msg_date) VALUES ($1, $2, $3, $4)',
            [1, 'Welcome', 'Welcome to my members only club!', new Date()])
        console.log('Populated tables.')
    } catch (err) {
        console.log('Failed to populate tables.')
        throw err
    }
}

try {
    await truncate()
    await populate()
} catch (err) {
    console.error(err)
}