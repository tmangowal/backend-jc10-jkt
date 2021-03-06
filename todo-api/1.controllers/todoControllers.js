const db = require('../database')

module.exports = {
    getList: (req, res) => {
        let sql = `select * from todo`
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                res.send(result)
                console.log(result)
            } catch (err) {
                console.log(err)
            }
        })
    },

    getListByCompleted: (req, res) => {
        let sql = `select * from todo where isCompleted = '${req.query.parameterku}'`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    addTodo: (req, res) => {
        db.query(`insert into todo values (0, '${req.body.action}', 0)`, (err, result) => {
            if (err) throw err
            res.send('Successfully Added Action')
            console.log(result)
        })
    },

    editTodo: (req, res) => {
        db.query(`update todo set action = '${req.body.action}' where id = ${req.body.id}`, (err, result) => {
            if (err) throw err
            res.send('Update Success!')
        })
    },

    kochengOren: (req, res) => {
        db.query(`update todo set isCompleted = 1 where id = ${req.body.id}`, (err, result) => {
            if (err) throw err
            res.send('Update Success!')
        })
    },

    deleteTodo: (req, res) => {
        var id = req.params.terserah
        db.query(`delete from todo where id = ${id}`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    getUsersByRole: (req, res) => {
        db.query(`select * from users where role = '${req.query.role}'`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    getTodoJoinUsers: (req, res) => {
        db.query(`select * from todo t
        join users u on t.userId = u.id
        where u.username = 'seto'`, (err,result) => {
            let data = {
                username: result[0].username,
                todo: []
            }
            
            result.forEach(val => {
                data.todo.push(val.action)
            })

            res.send(data)
        })
    },

    getUsersByUsername: (req,res) => {
        db.query(`select * from users where username = '${req.query.username}'`, (err,result) => {
            if(err) throw err
            console.log(result[0])
            let data = result[0]
            data.message = 'Get Success!'
            res.send(data)
        })
    }
}