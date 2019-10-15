let express = require('express')
let router = express.Router()
let controller = require('../1.controllers/movcatController')

router.post('/add', controller.addMovCat)
router.get('/get', controller.getMovCat)
router.delete('/delete/:id', controller.deleteMovCat)

module.exports = router