import pool from './pool.js'

const member = `
CREATE TABLE IF NOT EXISTS member (
    mem_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    mem_name varchar ( 255 ) UNIQUE,
    mem_hash varchar ( 255 ),
    mem_email varchar ( 255 ) UNIQUE,
    mem_admin boolean DEFAULT FALSE
);
`

const message = `
CREATE TABLE IF NOT EXISTS message (
    msg_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    mem_id integer REFERENCES member (mem_id),
    msg_head varchar ( 255 ),
    msg_text text,
    msg_date timestamp
);
`

async function drop() {
    try {
        console.log('Dropping tables...')
        await pool.query('DROP TABLE IF EXISTS message;')
        await pool.query('DROP TABLE IF EXISTS member;')
        console.log('Dropped Tables.')
    } catch (err) {
        console.log('Failed to drop tables.')
        throw err
    }
}

async function create() {
    try {
        console.log('Creating tables...')
        await pool.query(member)
        await pool.query(message)
        console.log('Created tables.')
    } catch (err) {
        console.log('Failed to create tables.')
        throw err
    }
}

try {
    await drop()
    await create()
} catch (err) {
    console.error(err)
}