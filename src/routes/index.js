import { Router } from 'express'
import controller from '../controllers/index.js'

const router = Router()

router.get('/', (req, res) => res.render('index'))
router.get('/signup', (req, res) => res.render('signup'))
router.get('/login', (req, res) => res.render('login'))
router.get('/invalid', (req, res) => res.render('invalid'))

router.post('/signup', controller.postSignUp)
router.post('/login', controller.postLogIn)

export default router