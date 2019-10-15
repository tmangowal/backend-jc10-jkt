const db = require('../3.database')

module.exports = {
    getMovCat : (req,res) => {
        let sql = `select m.nama as namaMovie, c.nama as namaCat, mc.id from movcat mc
        join movies m on m.id = mc.idmovie
        join categories c on c.id = mc.idcategory`
        db.query(sql, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send(result)
        })
    },

    addMovCat : (req,res) => {
        let sql = `insert into movcat values (0, ${req.body.idMovie}, ${req.body.idCategory})`
        
        db.query(sql, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send('Success!')
        })
    },

    deleteMovCat : (req,res) => {
        let sql = `delete from movcat where id = ${req.params.id}`

        db.query(sql, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send('Success!')
        })
    }
}