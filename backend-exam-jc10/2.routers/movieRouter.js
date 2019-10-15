let express = require('express')
let router = express.Router()
let controller = require('../1.controllers/moviesController')

router.post('/add', controller.addMovie)
router.get('/get', controller.getMovies)
router.delete('/delete/:id', controller.deleteMovie)
router.put('/edit', controller.editMovie)

module.exports = router