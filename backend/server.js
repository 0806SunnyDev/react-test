const express = require('express')
const cors=require('cors')
const passport = require('passport')

const connectDB = require('./config/db')
const router = require('./routes')
const key = require('./config/key')

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
require('./middlwares/passport')(passport)

app.use(router)

const PORT = key.APP_PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))