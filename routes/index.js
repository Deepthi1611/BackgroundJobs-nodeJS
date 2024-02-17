const express = require('express')
const router = express.Router()
const userRouter = require('./user/index')
//body parser
router.use(express.json())
router.use('/user', userRouter)

module.exports = router