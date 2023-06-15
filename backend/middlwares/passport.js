const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt

const  User = require('../models/User')
const key = require('../config/key')

const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = key.SECRET_KEY

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.user.id)
        .then(user => {
          if (!user) return done(null, false)
          return done(null, user)
        })
        .catch(error => {
          console.log('Error at finding user by id in passport ', error)
          done(error, false)
        })
    })
  )
}