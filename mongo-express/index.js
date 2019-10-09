let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const port = 8080

app.use(bodyParser.json())

let userRouter = require('./2.routers/userRouter')


app.get('/', (req,res) => {
    res.send(
        `<h1>Welcome to MONGO API</h1>`
    )
})

app.use('/users', userRouter)

app.listen(port, console.log('Listening . . . PORT : ' + port))