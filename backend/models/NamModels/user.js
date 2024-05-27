const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:String,
    firstName:String,
    lastName:String,
    phone:String,
    email:String,
    username:String,
    location:String,
    dob:String,
    bio:String,
    gender:String,
    ethnicity:String,
    followers:String,
    following:String,
    passwordHash:String
});

const User = mongoose.model('User', userSchema);
module.exports = User