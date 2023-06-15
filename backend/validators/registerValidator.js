const { check } = require('express-validator')

const registerValidator = [
  check('firstName', 'First Name is required').notEmpty(),
  check(
    'firstName',
    'Please enter a first name with from 2 to 25 characters'
  ).isLength({ min: 2, max: 25 }),
  check('lastName', 'Last Name is required').notEmpty(),
  check(
    'lastName',
    'Please enter a last name with from 2 to 25 characters'
  ).isLength({ min: 2, max: 25 }),
  check('email', 'email is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with from 6 to 50 characters'
  ).isLength({ min: 6, max: 50 }),
  check('password', 'The password must contain at least one number').matches(/\d/),
]

module.exports = registerValidator