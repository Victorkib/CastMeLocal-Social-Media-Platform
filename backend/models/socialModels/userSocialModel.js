const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is Required!'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is Required!'],
    },
    email: {
      type: String,
      required: [true, ' Email is Required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required!'],
      minlength: [6, 'Password length should be greater than 6 character'],
      select: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    location: {
      type: {
        type: String, // A special property for GeoJSON type, should always be 'Point'
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // Array of numbers for longitude and latitude
        required: true,
        default: [0, 0], // Default coordinates
      },
    },
    profilePic: { type: String },
    profession: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'SocialUsers' }],
    views: [{ type: String }],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SocialUsers = mongoose.model('SocialUsers', userSchema);

module.exports = SocialUsers;
