const multer = require('multer')

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

const uploader = (req, res, next) => {
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
}

module.exports = uploader