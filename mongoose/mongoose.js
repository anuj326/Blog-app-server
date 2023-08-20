const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.URL;

mongoose.connect(URL);

const db = mongoose.connection;

db.on('error',function(){
    console.log("error connecting to mongo db")
})

db.once('open', function(){
    console.log('Successfully connected to MOngo Db')
})

module.exports = db;