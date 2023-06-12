const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  Avatar: {
    type: String,
  },
  Photo: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('client', ClientSchema);