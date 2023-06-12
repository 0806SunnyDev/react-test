const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    minlength: 2,
    maxlength: 25,
    required: true
  },
  LastName: {
    type: String,
    minlength: 2,
    maxlength: 25,
    required: true
  },
  FullName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Role: {
    type: String,
  },
  Active: {
    type: Boolean,
    default: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);