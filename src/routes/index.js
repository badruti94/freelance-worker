const express = require('express')
const router = express.Router()
const authRoute = require('./auth')
const jobRoute = require('./job')
const userRoute = require('./user')

router.use('/auth', authRoute)
router.use('/job', jobRoute)
router.use('/user', userRoute)

module.exports = router