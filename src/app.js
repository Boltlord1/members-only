import path from 'node:path'
import express from 'express'
import session from 'express-session'
import passport from './database/passport.js'
import indexRouter from './routes/index.js'
import messageRouter from './routes/message.js'

const app = express()
app.set('views', path.join(import.meta.dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }))
app.use(passport.session())
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/message', messageRouter)

const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`App listening on port ${port}`)
})