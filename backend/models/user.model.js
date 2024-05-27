const mongoose = require('mongoose');

// Define the schema for user
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, ' Email is Required!'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    profilePic: {
      type: String,
      default: '',
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
  },
  { timestamps: true }
); // Timestamps for creation and update times

const ChatUser = mongoose.model('ChatUser', userSchema);

module.exports = ChatUser;
