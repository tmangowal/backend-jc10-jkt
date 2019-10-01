var express = require('express')
var app = express()
const port = 8080
var cors = require('cors')
var bodyParser = require('body-parser')
var multer = require('multer')

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
    console.log(req)
    res.send('Success')
})

app.listen(port, console.log('Listening in port ' + port))