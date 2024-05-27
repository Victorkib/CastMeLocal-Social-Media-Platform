const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postId:String,
    caption:String,
    likes:String,
    comments:String
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post