// backend/routes/userRoutes.js
const ChatUser = require('../models/user.model.js');
const SocialUsers = require('../models/socialModels/userSocialModel.js');
const express = require('express');
const protectRoute = require('../middleware/protectRoute.js');
const { getUsersForSidebar } = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);

// Route to get all users with their location
router.get('/users', async (req, res) => {
  try {
    const users = await SocialUsers.find().select(
      'firstName lastName profilePic location'
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update user location
router.post('/user/location', async (req, res) => {
  const { userId, coordinates } = req.body;

  try {
    const user = await SocialUsers.findByIdAndUpdate(
      userId,
      {
        location: {
          type: 'Point',
          coordinates,
        },
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
