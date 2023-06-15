const path=require('path')
const User = require('../models/User')
const Photo = require('../models/Photo')
const Client = require('../models/Client')

// Get User Controller
const getUser = async (req, res) => {
  let userId = req.user.id

  try {
    const user = await User.findById(userId).select('-password')
    const photo = await Photo.find({User: userId})
    const client = await Client.find({User: userId})
    const clientData = client[0]

    res.json({ message: 'Data retrieved successfully', data: {user, clientData, photo} })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
}

// Get User Photo
const getPhoto = (req, res) => {
  const imageName = req.params.imageName
  const serverRootDirectory = process.cwd()
  const imagePath = path.join(serverRootDirectory, 'uploads/photos', imageName)
  res.sendFile(imagePath)
}

module.exports = {
  getUser,
  getPhoto
}