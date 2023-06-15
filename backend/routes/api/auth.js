const express = require('express')
const router = express.Router()

const { register, login } = require('../../controllers/authController')
const uploader = require('../../middlwares/uploader')
const registerValidator = require('../../validators/registerValidator')
const loginValidator = require('../../validators/loginValidator')

// Register
// POST api/register
// Access Public
router.post(
  '/api/register',
  uploader,
  ...registerValidator,
  register
)

// Login
// POST api/login
// Access Public
router.post(
  '/api/login',
  ...loginValidator,
  login
)

module.exports = router
