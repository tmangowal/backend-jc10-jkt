var express = require('express')
var router = express.Router()
const { authController } = require('../1.controllers')

router.get('/login', authController.login)

module.exports = router
