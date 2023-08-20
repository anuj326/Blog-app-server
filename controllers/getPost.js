const Post = require('../models/Post');

module.exports.getPost = async function(req, res){
    const id = req.params.id;
    //console.log("ID",id);
   const postData = await Post.findById(id).populate('author',['username']);
    res.json(postData); 
}