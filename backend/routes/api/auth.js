const express = require('express')
const multer = require('multer')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Photo = require('../../models/Photo')

const upload = multer({ dest: 'uploads/' });

// Authentication
// GET api/users/me
// Access Private
router.get('/users/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Register
// POST api/register
// Access Public
router.post(
  '/register',
  check('firstName', 'First Name is required').notEmpty(),
  check('lastName', 'Last Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with from 6 to 50 characters'
  ).isLength({ min: 6, max: 50 }),
  // upload.array('photos'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, password } = req.body
    // const photos = req.files

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
      
      // photos.map( async (photo) => {
      //   let userPhoto = new Photo({
      //     name: photo.name,
      //     url: 'path',
      //     user: user.id
      //   })
      //   await userPhoto.save()
      // })

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

// Login
// POST api/login
// Access Public
router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    console.log('data: ', req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ Email: email })

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Email!' }] })
      }

      const isMatch = await bcrypt.compare(password, user.Password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Password!' }] })
      }

      const payload = {
        user: {
          id: user.id
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