const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    requestTo: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialUsers' },
    requestFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialUsers' },
    requestStatus: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model('FriendRequest', requestSchema);

module.exports = FriendRequest;
