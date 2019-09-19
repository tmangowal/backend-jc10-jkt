var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 8080
const {addTodo, deleteTodo, editTodo, kochengOren, getList, getListByCompleted, getUsersByRole} = require('./1.controllers/todoControllers')
// import todoController from './1.controllers/todoControllers'

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

app.get('/getlist', getList)

app.get('/getlistcompleted', getListByCompleted)

app.post('/addtodo', addTodo)

app.put('/edittodo', editTodo)

app.put('/completeaction', kochengOren)

app.delete('/deletetodo/:terserah', deleteTodo)

app.get('/getusersbyrole', getUsersByRole)

app.listen(port, console.log('Listening in port ' + port))