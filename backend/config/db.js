const mongoose = require('mongoose')
const key = require('./key')
const db = key.MONGO_URL


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true
    })

    console.log('MongoDB connected...')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDB