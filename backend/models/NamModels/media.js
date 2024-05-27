const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    mediaId:String,
    roleId:String, //users/posts and all that
    role:String, //post,profile picture
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media