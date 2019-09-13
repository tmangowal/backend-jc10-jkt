var mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'todo_jc10',
    host: 'localhost'
})

module.exports = db