const express = require('express')

const authRouter = require('./api/auth')
const userRouter = require('./api/user')
const photoRouter = require('./photo')

const router = express.Router()

router.use(authRouter)
router.use(userRouter)
router.use(photoRouter)

module.exports = router