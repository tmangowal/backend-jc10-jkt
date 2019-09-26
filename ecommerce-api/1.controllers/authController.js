const db = require('../database')
var nodemailer = require('nodemailer')
var { pdfcreate } = require('../3.helpers/html-pdf')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pwdknmtheo@gmail.com',
        pass: 'bqzlisjmfxqjpabl'
    },
    tls : {
        rejectUnauthorized: false
    }
})

module.exports = {
    login: (req, res) => {
        db.query(`select * from users where username = '${req.query.username}'`, (err, result) => {
            if (err) throw err
            if(result.length > 0){
                if(req.query.password === result[0].password){
                    res.send({
                        status: '200',
                        result: result[0]
                    })
                }else{
                    res.send({
                        status: '401',
                        message: 'Wrong Password!'
                    })
                }
            }else{
                let hasil = {
                    status: '404',
                    message: 'User not found!'
                }
                res.send(hasil)
            }
        })
    },

    register: (req, res) => {
        let sql = `select * from users where username = '${req.body.username}' or email = '${req.body.email}'`
        let sql2 = `insert into users value (0, '${req.body.username}', '${req.body.password}', '${req.body.email}', 'free', 0)`
        // let sql2 = `insert into users value (0, '${req.body.username}', '${req.body.password}', 'free', 0, ${req.body.email})`

        db.query(sql, (err,result) => {
            if(err) throw err
            if(result.length > 0){
                res.send({
                    status: '400',
                    message: 'Username has been taken!'
                })
            }else {
                db.query(sql2, (err2, result2) => {
                    if(err2) throw err2
                    let mailOptions = {
                        from: 'Bukatoko',
                        to: req.body.email,
                        subject: 'Verify your account',
                        html: `<p> <a href="http://localhost:9000/auth/verify?username=${req.body.username}&email=${req.body.email}">Click here</a> 
                        to verify your account </p>`
                    }

                    transporter.sendMail(mailOptions, (err3, info) => {
                        if(err3) throw err3
                    })
                    res.send({
                        status: '201',
                        message: 'Your account has been created, please check your email to verify your account!'
                    })
                })
            }
        })
    },

    verify: (req,res) => {
        let sql = `update users set isVerified = 1 where username = '${req.query.username}' and email = '${req.query.email}'`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send('Your account has been verified!')
        })
    },

    testEmail: (req,res) => {
        let options = {
            format: 'A4', 
            orientation: "landscape",
            border : {
                top: "0.5in",
                left: "0.15in",
                right: "0.15in",
                bottom: "0.25in"
            }
        }

        let d = new Date()

        let replacements = {
            username: req.query.username,
            today: `${d.getDate()}-${d.getMonth()+1}`,
            data: ['Wahai', 'Kalian', 'Kaum', 'JOMBLO']
        }

        pdfcreate('./4.pdfTemplates/firstTemplate.html', replacements, options, (hasil) => {
            res.attachment('testingPDF.pdf')
            hasil.pipe(res)
        })

        /**
         * (stream) => {
         *      
         * }
         */
    }
}