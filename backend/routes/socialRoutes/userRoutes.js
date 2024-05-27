const express = require('express');
const path = require('path');
const socConExp = require('../../controllers/socialControllers/socialUserController.js');
const userAuth = require('../../middleware/authMiddleware.js');
const SocialUsers = require('../../models/socialModels/userSocialModel.js');

// const {
//   acceptRequest,
//   changePassword,
//   friendRequest,
//   getFriendRequest,
//   getUser,
//   profileViews,
//   requestPasswordReset,
//   resetPassword,
//   suggestedFriends,
//   updateUser,
//   verifyEmail,
// } = socialUserController;

const router = express.Router();

router.get('/verify/:userId/:token', socConExp.verifyEmail);

// PASSWORD RESET
router.post('/request-passwordreset', socConExp.requestPasswordReset);
router.get('/reset-password/:userId/:token', socConExp.resetPassword);
router.post('/reset-password', socConExp.changePassword);

// user routes
router.post('/get-user/:id?', userAuth, socConExp.getUser);
router.put('/update-user', userAuth, socConExp.updateUser);

// friend request
router.post('/friend-request', userAuth, socConExp.friendRequest);
router.post('/get-friend-request', userAuth, socConExp.getFriendRequest);

// accept / deny friend request
router.post('/accept-request', userAuth, socConExp.acceptRequest);

// view profile
router.post('/profile-view', userAuth, socConExp.profileViews);

// suggested friends
router.post('/suggested-friends', userAuth, socConExp.suggestedFriends);

router.get('/verified', async (req, res) => {
  const { _id, status, message } = req.query;
  if (status === 'success') {
    // Redirect to the home page or a success page
    const user = await SocialUsers.findById(_id).select('-password');
    console.log('after success verification: ' + user);
    if (!user) {
      res.status(400).json({
        VerificationMessage: 'Email verification failed',
        error: message,
      });
    }
    res
      .status(201)
      .json({ VerificationMessage: 'Email verification successful', user });
  } else {
    // Redirect to the registration page or display an error message
    res.status(400).json({
      VerificationMessage: 'Email verification failed',
      error: message,
    });
  }
});

router.get('/resetpassword', (req, res) => {
  const { status, message } = req.query;
  if (status === 'success') {
    // Redirect to the password reset page or a success page
    res.status(200).json({
      VerificationMessage: 'Password reset successful',
    });
  } else {
    // Redirect to the login page or display an error message
    res.status(400).json({
      VerificationMessage: 'Password reset failed',
      error: message,
    });
  }
});

module.exports = router;
