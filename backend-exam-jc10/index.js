const express = require('express')
let app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
let routers = require('./2.routers')

app.use(bodyParser.json())
app.use(cors())

app.use('/movie', routers.movRouter)
app.use('/category', routers.catRouter)
app.use('/movcat', routers.movcatRouter)

app.listen(8080, () => console.log('Listening . . .'))