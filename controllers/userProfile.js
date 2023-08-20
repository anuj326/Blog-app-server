const jwt = require('jsonwebtoken');

module.exports.userProfile = function(req, res){
    const secret = 'sajshasg78965196AFH!&FHGJy';
   // console.log('inside profile page');
   const {token} = req.cookies;
   //console.log('Secret Key ' + secret + ' Token' + token);
   jwt.verify(token , secret , {}, (error , info) => {
        if(error) throw error;
        res.json(info);
   })
    
}

module.exports.userLogout = function(req, res){
    res.cookie('token','').json('ok')
}