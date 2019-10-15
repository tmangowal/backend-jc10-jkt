let express = require('express')
let router = express.Router()
let controller = require('../1.controllers/categoryController')

router.post('/add', controller.addCategory)
router.get('/get', controller.getCategories)
router.delete('/delete/:id', controller.deleteCategory)
router.put('/edit', controller.editCategory)

module.exports = router