const db = require('../database')

module.exports = {
    getList: (req,res) => {
        db.query(`select * from todo`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    addTodo: (req,res) => {
        db.query(`insert into todo values (0, '${req.body.action}', 0)`, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    },

    editTodo: (req,res) => {
        db.query(`update todo set action = '${req.body.action}' where id = ${req.body.id}`, (err, result) => {
            if(err) throw err
            res.send('Update Success!')
        })
    },

    kochengOren: (req,res) => {
        db.query(`update todo set isCompleted = 1 where id = ${req.body.id}`, (err, result) => {
            if(err) throw err
            res.send('Update Success!')
        })
    },

    deleteTodo: (req,res) => {
        var id = req.params.terserah
        db.query(`delete from todo where id = ${id}`, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    }
}