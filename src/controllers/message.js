import { validationResult, matchedData } from 'express-validator'
import { varchar, text } from '../validate.js'
import { getAllMessages, insertMessage } from '../database/queries.js'

async function getBoard(req, res) {
    const logged = req.hasOwnProperty('user')
    const verified = logged && req.user.mem_verified
    const messages = await getAllMessages(verified)
    res.render('board', { messages: messages, logged: logged })
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

export default {
    getBoard,
    postNew
}