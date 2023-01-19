const express = require('express')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

const app = express()

const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
