const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.userLogin = async function(req, res){
    const {username , password} = req.body;
    const secret = 'sajshasg78965196AFH!&FHGJy';
    module.exports.secret = secret;
    
    const userLogin = await User.findOne({username: username});
    console.log(userLogin);
        

    if(!userLogin){
        console.log('Invalid username or password');
        res.status(400).json({message:'Invalid username or password'})
    }else{
        console.log(password);
        const isMatch = bcrypt.compareSync(password, userLogin.password); ;
        if(!isMatch){
            console.log('Invalid username or password');
            res.status(400).json({message:'Invalid username or password'})
        }else{
            jwt.sign({username,id:userLogin._id},secret , {} , (err,token)=>{
                if(err) throw new err;
                res.status(200).cookie('token',token).json({
                    id:userLogin._id,
                    username,
                    token,
            
                })
            })
            console.log('logged in successfully');
           // res.status(200).json({message:"logged in successfully"})
            
        }
    }
    
}