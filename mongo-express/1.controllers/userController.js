let MongoClient = require('mongodb').MongoClient
let Mongo = require('mongodb')
let {url} = require('../3.database')

module.exports = {
    getAllUsers : (req, res) => {
        MongoClient.connect(url, (err, client) => {
            let collection = client.db('latihan_mongo_jc10').collection('users')
            collection.find({}).toArray((err, result) => {
                if(err) throw err
                console.log(result)
                res.send(result)
            })
        })
    },

    getUserById : (req, res) => {
        MongoClient.connect(url, (err, client) => {
            let collection = client.db('latihan_mongo_jc10').collection('users')
            collection.findOne({_id : Mongo.ObjectID('5d9c12e62ea9b5285b9addc5')}, (err, result) => {
                if(err) throw err
                console.log(result)
                res.send(result)
            })
        })
    },

    insertData : (req,res) => {
        let data = {
            username : req.body.username,
            pwd : req.body.password
        }

        MongoClient.connect(url, (err, client) => {
            let collection = client.db('latihan_mongo_jc10').collection('users')
            collection.insertOne(data , (err, result) => {
                if(err) throw err
                res.send(result)
            })
        })
    }
}