const express = require('express')
const cors=require('cors')
const path=require('path')
const passport = require('passport')

const connectDB = require('./config/db')

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', require('./routes/api/auth'))
app.use('/api/register', require('./routes/api/register'))
app.use('/api/login', require('./routes/api/login'))

app.get('/uploads/photos/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const serverRootDirectory = process.cwd();
  const imagePath = path.join(serverRootDirectory, 'uploads/photos', imageName);
  res.sendFile(imagePath);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))