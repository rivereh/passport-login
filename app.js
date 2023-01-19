const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

const app = express()

// ejs
app.use(expressLayouts)
app.set('view engine', 'ejs')

// routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
