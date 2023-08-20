const User = require('../models/User');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports.userRegister = async function(req, res){
    const {username, password} = req.body;
    //console.log(req.body);
    //console.log("Username" + username + "Password" + password)4
    if(!username || !password){
        console.log('All fields are required');
        return res.status(422).json({error:'All fields are required'})
       }
        const userExist = await User.findOne({username:username})
        if(userExist){
            return res.status(422).json({error:'Username already registered'})
        }
     const userDoc = await User.create({
        username , password:bcrypt.hashSync(password , salt)
    })

    userDoc.save();
    res.json({userDoc})
}