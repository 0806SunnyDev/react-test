const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  Avatar: {
    type: String,
    required: true
  },
  Photo: {
    type: [String],
    required: true
  }
})

module.exports = mongoose.model('client', ClientSchema)