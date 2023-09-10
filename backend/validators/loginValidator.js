const { check } = require('express-validator')

const loginValidator = [
  check('email', 'Please include a valid email').isEmail(),
  check('email', 'Email is required').exists(),
  check('password', 'Password is required').exists(),
]

module.exports = loginValidator