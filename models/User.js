const mongoose = require('mongoose');
const {Schema, model} = mongoose; 
//const bcrypt = require('bcryptjs');

const USerSchema = new Schema({
    username:{type:String , required:true, min:4, unique:true},
    password:{type:String , required:true}
},{
    timestamps:true
});


const UserModel = model('User', USerSchema);

module.exports = UserModel;