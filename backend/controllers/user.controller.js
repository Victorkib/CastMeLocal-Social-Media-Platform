//const ChatUser = require('../models/user.model');
const SocialUsers = require('../models/socialModels/userSocialModel.js');
const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await SocialUsers.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error('Error in getUsersForSidebar: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getUsersForSidebar };
