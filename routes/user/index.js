const router = require('express').Router()
const createUserHandler = require('./createUserHandler')

router.post('/', createUserHandler)

module.exports = router