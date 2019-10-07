let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')
const port = 8080
const appKey = 'secretkey'

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('<h1>Welcome to JWT API</h1>')
})



const auth = (req,res,next) => {
    if (req.method !== "OPTIONS") {
        // let success = true;
        console.log(req.headers.authorization)
        /**
         * jwt.verify
         * param 1 = token
         * param 2 = APP KEY (GABOLEH ILANG, HARUS SAMA)
         * param 3 = Callback Fn (error, hasil decrypt)
         */
        jwt.verify(req.headers.authorization, appKey, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
            }
            console.log({decoded})
            req.user = decoded;
            next(); // Lanjut ke function berikut
        });
    } else {
        next();
    }
}

app.post('/gettoken', (req,res) => {
    let {username, email} = req.body
    let token = jwt.sign({username, email}, appKey, {expiresIn : '12h'})
    console.log(token)
    res.send({
        username,
        email,
        token
    })
})

app.get('/verifytoken', auth, (req,res) => {
    res.send('Authorized')
})


app.listen(port, console.log('Listening . . .'))

