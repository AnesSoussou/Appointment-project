const mongoose = require('mongoose')
require ('dotenv').config()
const ConnectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true} ,(err) => {
        if (err) {
            throw err
        }
        console.log("Your Database is connected...")
    })
}

module.exports = ConnectDB;