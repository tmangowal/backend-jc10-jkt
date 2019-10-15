const mysql = require('mysql')

const db = mysql.createConnection({
    user : 'root',
    database : 'sinema_pwd',
    password : 'password',
    host : 'localhost'
})

module.exports = db