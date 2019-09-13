// tmangowal
var express = require('express');
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 2019
const db = require('./database/index')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(`<h1> Welcome to my first API! </h1>`)
})

app.get('/testing', (req, res) => {
    res.send(`<h1>Ini path testing</h1>`)
})

app.get('/getusers', (req, res) => {
    db.query(`select * from users`, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.post('/postuser', (req,res) => {
    // let { username, email, role } = req.body

    db.query(`insert into users values (0, '${req.body.username}', '${req.body.email}', '${role}')`, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.listen(port, () => console.log('Listening...'))