const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Photo = require('../../models/Photo')
const Client = require('../../models/Client')

// Authentication
// GET api/users/me
// Access Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    const photo = await Photo.find({User: req.user.id})
    const client = await Client.find({User: req.user.id})

    res.json([user, client, photo])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router