let app = require('express')()
let cors = require('cors')
let bodyParser = require('body-parser')
let mysql = require('mysql')
const port = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())

let db = mysql.createConnection({
    user : 'tmangowal123',
    password : 'password',
    host : 'db4free.net',
    database : 'train_jc10_theo'
})

app.get('/getalldata', (req, res) => {
    let sql = `select * from train`
    let {query} = req
    if(query) {
        sql += ` where`
        // Nama, agemax and agemin, gender, pclass, survived
        if(query.name) {
            sql += ` name like '%${query.name}%' and`
        }
        if(query.agemax && query.agemin) {
            sql += ` age <= ${query.agemax} and ${query.agemin} <= age and`
        }
        if(query.gender) {
            sql += ` sex = '${query.gender}' and`
        }
        if(query.pclass) {
            sql += ` pclass = ${query.pclass} and`
        }
        if(query.survived < 2) {
            sql += ` survived = ${query.survived} and`
        }
    }

    db.query(sql.slice(0, -4), (err,result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})

app.get('/getpclass', (req,res) => {
    db.query(`select pclass from train group by pclass order by pclass`, (err,result) => {
        try {
            if(err) throw err
            res.send(result)
        } catch (err) {
            console.log(err)
        }
    })
})

app.listen(port, console.log('Listening . . .'))