import { Router } from 'express'
import controller from '../controllers/index.js'
import passport from '../database/passport.js'

const router = Router()

router.get('/', (req, res) => {res.render('index', { user: req.user })})
router.get('/signup', (req, res) => res.render('signup'))
router.get('/login', (req, res) => res.render('login'))
router.get('/invalid', (req, res) => res.render('invalid'))
router.get('/verify', controller.getVerify)

router.post('/signup', controller.postSignUp)
router.post('/verify', controller.postVerify)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/invalid'
}))

export default router