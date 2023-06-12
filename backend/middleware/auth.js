const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    jwt.verify(token, 'secretKey', (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' })
      } else {
        req.user = decoded.user
        next()
      }
    })
  } catch (err) {
    console.error('something wrong with auth middleware')
    res.status(500).json({ msg: 'Server Error' })
  }
}
