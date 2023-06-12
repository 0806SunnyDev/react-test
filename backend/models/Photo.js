const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Url: {
    type: String,
    required: true
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('photo', PhotoSchema)