import pool from './pool.js'
import { compare } from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

async function strategy(username, password, done) {
    try {
        const member = (await pool.query('SELECT * FROM member WHERE mem_name ILIKE $1 OR mem_email ILIKE $1', [username])).rows[0]
        if (!member) {
            return done(null, false, { message: 'Incorrect username or email.' })
        }
        const match = await compare(password, member.mem_hash)
        if (!match) {
            return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, member)
    } catch (err) {
        return done(err)
    }
}

passport.use(new LocalStrategy(strategy))

passport.serializeUser((user, done) => {
    done(null, user.mem_id)
})

async function deserialize(id, done) {
    try {
        const member = (await pool.query('SELECT * FROM member WHERE mem_id = $1', [id])).rows[0]
        done(null, member)
    } catch (err) {
        done(err)
    }
}

passport.deserializeUser(deserialize)

export default passport