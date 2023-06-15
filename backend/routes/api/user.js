const express = require('express')
const router = express.Router()
const passport = require('passport')
const { getUser } = require('../../controllers/userController')

// Authentication
// GET api/users/me
// Access Private
router.get('/api/users/me',
  passport.authenticate('jwt', { session: false }),
  getUser
)

module.exports = router