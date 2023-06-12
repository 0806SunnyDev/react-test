const express = require('express')
const multer = require('multer')
const axios = require('axios')
const cheerio = require('cheerio')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
const Photo = require('../../models/Photo')
const Client = require('../../models/Client')

const storage = multer.diskStorage({
  destination: 'uploads/photos/',
  filename: function(req, file, cb) {
    // Generate a custom filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const originalExtension = file.originalname.split('.').pop()
    const filename = req.body.firstName + '-' + uniqueSuffix + '.' + originalExtension
    
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getAvatar = async (query) => {
  try {
    const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`)

    const $ = cheerio.load(response.data)

    const imageUrls = []
    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src')
      if (imageUrl !== '') {
        imageUrls.push(imageUrl)
      }
    })

    return imageUrls[1]
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}


// Register
// POST api/register
// Access Public
router.post(
  '/',
  (req, res, next) => {
    upload.array('photos')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer error: ' + err.message })
      } else if (err) {
        return res.status(500).json({ error: 'Internal server error' })
      }

      if (req.files.length < 4) {
        return res.status(400).json({ error: 'Please upload at least 4 images' })
      }
      next()
    })
  },
  check('firstName', 'First Name is required').notEmpty(),
  check('lastName', 'Last Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with from 6 to 50 characters'
  ).isLength({ min: 6, max: 50 }),
  
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, password } = req.body

    try {
      let user = await User.findOne({ Email: email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }

      user = new User({
        FirstName: firstName,
        LastName: lastName,
        FullName: firstName + ' ' + lastName,
        Email: email,
        Password: password,
      })

      const salt = await bcrypt.genSalt(10)
      user.Password = await bcrypt.hash(password, salt)
      await user.save()

      const avatar = await getAvatar(firstName)
      const photos = req.files
      let photoNameArr = photos.map((photo) => photo.filename)

      let client = new Client({
        User: user.id,
        Avatar: avatar,
        Photo: photoNameArr
      })
      await client.save()
      
      photos.map( async (photo) => {
        let userPhoto = new Photo({
          Name: photo.filename,
          Url: photo.path,
          User: user.id
        })
        await userPhoto.save()
      })

      const payload = {
        user: {
          id: user.id,
        }
      }

      jwt.sign(
        payload,
        'secretKey',
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
