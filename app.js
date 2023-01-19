const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

// passport config
require('./config/passport')(passport)

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

// bodyparser
app.use(express.urlencoded({ extended: false }))

// express session
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash())

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
