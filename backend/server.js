const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/api/auth'))
app.use('/api/register', require('./routes/api/register'))
app.use('/api/login', require('./routes/api/login'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))