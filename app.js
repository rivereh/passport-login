const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

connectDB()
const app = express()

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

// bodyparser
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
