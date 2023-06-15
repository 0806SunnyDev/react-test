const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const Photo = require('../models/Photo')
const Client = require('../models/Client')
const key = require('../config/key')
const getAvatar = require('../utils/getAvatar')

// Register Controller
const register = async (req, res) => {
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
    const avatar = await getAvatar(firstName)
    const photos = req.files
    let photoNameArr = photos.map((photo) => photo.filename)
    
    await user.save()

    let client = new Client({
      User: user.id,
      Avatar: avatar,
      Photo: photoNameArr
    })
    client.save()
    
    photos.map((photo) => {
      let userPhoto = new Photo({ 
        Name: photo.filename, 
        Url: photo.destination, 
        User: user.id 
      })
      userPhoto.save()
    })

    const payload = {
      user: {
        id: user.id,
      }
    }

    jwt.sign(
      payload,
      key.SECRET_KEY,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token: 'Bearer ' + token, success: true });
      }
    );
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Login Controller
const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ Email: email })
    
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Email!' }] })
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
      key.SECRET_KEY,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token: 'Bearer ' + token, success: true });
      }
    );
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
  register,
  login
}