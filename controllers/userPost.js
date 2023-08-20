const multer  = require('multer');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

module.exports.userPost = async function(req, res){
    
    //res.json(req.file);
    var newPath ;
    if(!req.file){   
             
         newPath = String.raw`uploads\21786bab939d6e6700d94df2bafca1ac.png`;
    }else{
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
             newPath = path +'.'+ ext;
        fs.renameSync(path, newPath);
        console.log(newPath);
    }


    const {token} = req.cookies;
    const secret = process.env.SECRET;
    jwt.verify(token , secret , {}, async(error , info) => {
        if(error) throw error;
        const {title, summary , content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author: info.id
        })
    
        res.json(postDoc);
   })


}