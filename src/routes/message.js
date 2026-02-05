import { Router } from 'express'
import controller from '../controllers/message.js'

const router = Router()

router.get('/', controller.getBoard)
router.get('/new', (req, res) => res.render('newMessage'))

router.post('/new', controller.postNew)
router.post('/delete/:id', controller.postDelete)

export default router