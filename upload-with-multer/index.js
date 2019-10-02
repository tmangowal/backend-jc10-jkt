var express = require('express')
var app = express()
const port = 8080
var cors = require('cors')
var bodyParser = require('body-parser')
var multer = require('multer')
var mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'upload_image'
})

app.use(bodyParser.json())
app.use(cors())
app.use('/files', express.static('uploads'))

let multerStorageConfig = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads')
    },

    filename : (req, file, cb) => {
        cb(null, `PRD-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

let filterConfig = (req, file, cb) => {
    if(file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpeg'){
        cb(null, true)
    }else{
        req.validation = {error : true, msg : 'File must be an image'}
        cb(null, false)
    }
}

let upload = multer({
    storage: multerStorageConfig,
    fileFilter: filterConfig
})

app.post('/uploadimage', upload.single('aneh'), (req, res) => {
    // console.log(req)
    db.query(`insert into manage_product values (0, '${req.body.productName}', '${req.file.path.replace('uploads','files')}')`, (err,result) => {
        if(err) throw err
        res.send('Success')
    })
})

app.get('/get', (req,res) => {
    db.query(`select * from manage_product`, (err,result) => {
        if(err) throw err
        res.send(result)
    })
})

app.listen(port, console.log('Listening in port ' + port))