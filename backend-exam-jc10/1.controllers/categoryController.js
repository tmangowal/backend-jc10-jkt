const db = require('../3.database')

module.exports = {
    getCategories : (req,res) => {
        db.query(`select * from categories`, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send(result)
        })
    },

    addCategory : (req,res) => {
        db.query(`insert into categories values (0, '${req.body.nama}')`, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send('Success!')
        })
    },

    editCategory : (req,res) => {
        let sql = `update categories set nama = '${req.body.nama}' where id = ${req.body.id}`
        
        db.query(sql, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send('Success!')
        })
    },

    deleteCategory : (req,res) => {
        let sql = `delete from categories where id = ${req.params.id}`
        let sql2 = `delete from movcat where idcategory = ${req.params.id}`
        
        db.query(sql, (err, result) => {
            if(err) throw err
            console.log(err)
            db.query(sql2, (err,result) => {
                if(err) throw err
                console.log(err)
                res.send('Delete Success!')
            })
        })
    }
}