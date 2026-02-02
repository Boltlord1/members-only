import { validationResult, matchedData } from 'express-validator'
import { varchar, email } from '../validate.js'

async function postSignUpLast(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.redirect('/invalid')
        return
    }
    const { mem_name, mem_email, mem_password, mem_confirm } = matchedData(req)
    res.redirect('/')
}

async function postLogInLast(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.redirect('/invalid')
        return
    }
    const { mem_identity, mem_password } = matchedData(req)
    res.redirect('/')
}

const postSignUp = [
    varchar('mem_name'),
    email('mem_email'),
    varchar('mem_password'),
    varchar('mem_confirm'),
    postSignUpLast
]

const postLogIn = [
    varchar('mem_identity'),
    varchar('mem_password'),
    postLogInLast
]

export default {
    postSignUp,
    postLogIn
}