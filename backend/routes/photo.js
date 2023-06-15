const express = require('express')
const router = express.Router()
const { getPhoto } = require('../controllers/userController')

// Get Photo
// GET /uploads/photos/:imageName
// Access Private
router.get(
  '/uploads/photos/:imageName',
  getPhoto
)

module.exports = router