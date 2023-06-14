const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const Photo = require('../../models/Photo')
const Client = require('../../models/Client')
const key = require('../../config/key')
const passport = require('passport')

// Authentication
// GET api/users/me
// Access Private
router.get('/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let userId = req.user.id

    try {
      const user = await User.findById(userId).select('-password')
      const photo = await Photo.find({User: userId})
      const client = await Client.find({User: userId})
      const clientData = client[0]

      res.json({ message: 'Data retrieved successfully', data: {user, clientData, photo} });
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server Error')
    }
})

module.exports = router