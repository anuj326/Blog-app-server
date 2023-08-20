const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();


module.exports.updatePost = async function(req, res){
    var newPath = null;
    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        newPath = path +'.'+ ext;
        fs.renameSync(path, newPath);
    }
    const {token} = req.cookies;
    const secret = process.env.SECRET;
    jwt.verify(token , secret , {}, async(error , info) => {
        if(error) throw error;
        const {id, title, summary , content} = req.body;
        console.log(id);
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author)  === JSON.stringify(info.id);
       // res.json(isAuthor)
        if(!isAuthor){
            return es.status(400).json('you are not the author');
        }
        const result  = await Post.findByIdAndUpdate(id,{
            title,
            summary,
            content,
            cover:newPath ? newPath : postDoc.cover,
        } ,
         {new:true}
        )
        // const result = await Post.updateOne({

        // })
    
         res.json(result); 
   })
}