import { validationResult, matchedData } from 'express-validator'
import { hash } from 'bcrypt'
import { varchar, email } from '../validate.js'
import { insertMember, verifyMember } from '../database/queries.js'

async function postSignUpLast(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.redirect('/invalid')
        return
    }
    const { mem_name, mem_email, mem_password, mem_confirm } = matchedData(req)
    if (mem_password !== mem_confirm) {
        res.redirect('/invalid')
        return
    }
    const mem_hash = await hash(mem_password, 10)
    await insertMember(mem_name, mem_hash, mem_email)
    res.redirect('/')
}

const postSignUp = [
    varchar('mem_name'),
    email('mem_email'),
    varchar('mem_password'),
    varchar('mem_confirm'),
    postSignUpLast
]

async function getVerify(req, res) {
    if (!req.user) {
        res.redirect('/invalid')
        return
    }
    res.render('verify')
}

async function postVerify(req, res) {
    if (req.body.verify !== process.env.VERIFY_PASS) {
        res.redirect('/invalid')
        return
    }
    await verifyMember(req.user.mem_id)
    res.redirect('/')
}

export default {
    postSignUp,
    getVerify,
    postVerify
}