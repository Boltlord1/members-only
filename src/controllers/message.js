import { validationResult, matchedData } from 'express-validator'
import { varchar, text } from '../validate.js'
import { getAllMessages, insertMessage, deleteMessage } from '../database/queries.js'

async function getBoard(req, res) {
    const logged = req.hasOwnProperty('user')
    const verified = logged && req.user.mem_verified
    const admin = logged && req.user.mem_admin
    const messages = await getAllMessages(verified)
    res.render('board', { messages: messages, logged: logged, admin: admin })
}

async function postNewLast(req, res) {
    console.log('asd')
    const errors = validationResult(req)
    if (!errors.isEmpty() || !req.user) {
        res.redirect('/invalid')
        return
    }
    const { msg_head, msg_text } = matchedData(req)
    await insertMessage(req.user.mem_id, msg_head, msg_text)
    res.redirect('/message')
}

const postNew = [
    varchar('msg_head'),
    text('msg_text'),
    postNewLast
]

async function postDelete(req, res) {
    if (!req.user || !req.user.mem_admin) {
        res.redirect('/invalid')
        return
    }
    const id = Number(req.params.id)
    await deleteMessage(id)
    res.redirect('/message')
}

export default {
    getBoard,
    postNew,
    postDelete
}