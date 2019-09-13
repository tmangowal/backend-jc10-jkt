var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 8080
const db = require('./database')

app.use(bodyParser())
app.use(cors())

/**
 * CRUD
 * 
 * Create
 * Read
 * Update
 * Delete
 * 
 */

app.get('/', (req,res) => {
    res.send(`<h1>Selamat datang di API TODO JC10 JKT</h1>`)
})

app.get('/getlist', (req,res) => {
    db.query(`select * from todo`, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.post('/addtodo', (req,res) => {
    db.query(`insert into todo values (0, '${req.body.action}', 0)`, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.put('/edittodo', (req,res) => {
    db.query(`update todo set action = '${req.body.action}' where id = ${req.body.id}`, (err, result) => {
        if(err) throw err
        res.send('Update Success!')
    })
})

app.put('/completeaction', (req,res) => {
    db.query(`update todo set isCompleted = 1 where id ${req.body.id}`, (err, result) => {
        if(err) throw err
        res.send('Update Success!')
    })
})

app.delete('/deletetodo/:terserah', (req,res) => {
    var id = req.params.terserah
    db.query(`delete from todo where id = ${id}`, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.listen(port, console.log('Listening in port ' + port))