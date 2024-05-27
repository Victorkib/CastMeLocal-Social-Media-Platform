const mongoose = require('mongoose'); // Use require for CommonJS modules

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SocialUsers',
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  { timestamps: true }
); // Timestamps for creation and update times

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
