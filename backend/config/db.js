const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/test'


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