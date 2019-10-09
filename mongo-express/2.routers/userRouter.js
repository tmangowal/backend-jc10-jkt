let userControllers = require('../1.controllers/userController')
let router = require('express').Router()

router.get('/getall', userControllers.getAllUsers)
router.get('/getbyid', userControllers.getUserById)
router.post('/add', userControllers.insertData)

module.exports = router