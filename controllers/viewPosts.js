const Post = require('../models/Post');

module.exports.viewPosts = async function(req, res){
    const posts = await Post.find()
                        .populate('author',['username'])
                        .sort({createdAt: -1} || {updatedAt: -1})
                        .limit(20)
    res.json(posts);
}