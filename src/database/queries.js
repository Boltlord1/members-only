import pool from './pool.js'

async function insertMember(name, hash, email) {
    await pool.query('INSERT INTO member (mem_name, mem_hash, mem_email) VALUES ($1, $2, $3)',
        [name, hash, email])
}

async function getAllMessages(verified = false) {
    const { rows } = verified ? await pool.query('SELECT mem_name, msg_head, msg_text, msg_date FROM message JOIN member ON member.mem_id = message.mem_id') :
    await pool.query('SELECT msg_head, msg_text FROM message')

    if (verified === false) {
        for (const row of rows) {
            row.mem_name = 'Anonymous'
            row.msg_date = 'Unknown date'
        }
    }

    return rows
}

async function verifyMember(id) {
    await pool.query('UPDATE member SET mem_verified = TRUE WHERE mem_id = $1', [id])
}

async function insertMessage(id, header, body) {
    await pool.query('INSERT INTO message (mem_id, msg_head, msg_text, msg_date) VALUES ($1, $2, $3, $4)',
        [id, header, body, new Date()])
}

export {
    insertMember,
    getAllMessages,
    verifyMember,
    insertMessage
}