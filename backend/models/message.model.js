const mongoose = require('mongoose'); // Use require for CommonJS modules

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SocialUsers',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SocialUsers',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Timestamps for creation and update times

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
