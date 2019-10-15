const db = require('../3.database')

module.exports = {
    getMovies : (req,res) => {
        db.query(`select * from movies`, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send(result)
        })
    },

    addMovie : (req,res) => {
        db.query(`insert into movies values (0, '${req.body.nama}', ${req.body.tahun},'${req.body.description}')`, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send('Success!')
        })
    },

    editMovie : (req,res) => {
        let sql = `update movies set nama = '${req.body.nama}', tahun = ${req.body.tahun}, description = '${req.body.description}' 
        where id = ${req.body.id}`
        
        db.query(sql, (err,result) => {
            if(err) throw err
            console.log(err)
            res.send('Success!')
        })
    },

    deleteMovie : (req,res) => {
        let sql = `delete from movies where id = ${req.params.id}`
        let sql2 = `delete from movcat where idmovie = ${req.params.id}`
        
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