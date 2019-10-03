let app = require('express')()
let cors = require('cors')
let bodyParser = require('body-parser')
let mysql = require('mysql')

app.use(bodyParser.json())
app.use(cors())

let db = mysql.createConnection({
    user : 'root',
    password : 'password',
    host : 'localhost',
    database : 'titanic_jc10'
})

app.get('/getalldata', (req, res) => {
    db.query(`select * from train`, (err,result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})

app.listen(8080, console.log('Listening . . .'))