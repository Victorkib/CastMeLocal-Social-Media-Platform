const mongoose = require('mongoose');

// Replace these with the actual paths to your models
const Verification = require('../../models/socialModels/emailVerification.js');
const SocialUsers = require('../../models/socialModels/userSocialModel.js');
const {
  compareString,
  createJWT,
  hashString,
} = require('../../utils/index.js');
const PasswordReset = require('../../models/socialModels/PasswordReset.js');
const { resetPasswordLink } = require('../../utils/sendEmail.js');
const FriendRequest = require('../../models/socialModels/friendRequest.js');

// Function definitions

const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const result = await Verification.findOne({ userId });

    if (result) {
      const { expiresAt, token: hashedToken } = result;

      if (expiresAt < Date.now()) {
        await Verification.findOneAndDelete({ userId });
        await SocialUsers.findOneAndDelete({ _id: userId });
        return res.status(400).json({
          status: 'error',
          message: 'Verification token has expired.',
        });
      } else {
        const isMatch = await compareString(token, hashedToken);
        if (isMatch) {
          await SocialUsers.findOneAndUpdate(
            { _id: userId },
            { verified: true }
          );
          await Verification.findOneAndDelete({ userId });
          return res.status(200).json({
            status: 'success',
            message: 'Email verified successfully',
          });
        } else {
          return res.status(400).json({
            status: 'error',
            message: 'Verification failed or link is invalid',
          });
        }
      }
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid verification link. Try again later.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await SocialUsers.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Email address not found.',
      });
    }

    const existingRequest = await PasswordReset.findOne({ email });
    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: 'PENDING',
          message: 'Reset password link has already been sent to your email.',
        });
      }
      await PasswordReset.findOneAndDelete({ email });
    }
    await resetPasswordLink(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { userId, token } = req.params;

  try {
    // find record
    const user = await SocialUsers.findById(userId);

    if (!user) {
      const message = 'Invalid password reset link. Try again';
      res.redirect(
        `/api/socials/users/resetpassword?status=error&message=${message}`
      );
    }

    const resetPassword = await PasswordReset.findOne({ userId });

    if (!resetPassword) {
      const message = 'Invalid password reset link. Try again';
      return res.redirect(
        `/api/socials/users/resetpassword?status=error&message=${message}`
      );
    }

    const { expiresAt, token: resetToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = 'Reset Password link has expired. Please try again';
      res.redirect(
        `/api/socials/users/resetpassword?status=error&message=${message}`
      );
    } else {
      const isMatch = await compareString(token, resetToken);

      if (!isMatch) {
        const message = 'Invalid reset password link. Please try again';
        res.redirect(
          `/api/socials/users/resetpassword?status=error&message=${message}`
        );
      } else {
        res.redirect(
          `/api/socials/users/resetpassword?type=reset&id=${userId}`
        );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    const hashedpassword = await hashString(password);

    const user = await SocialUsers.findByIdAndUpdate(
      { _id: userId },
      { password: hashedpassword }
    );

    if (user) {
      await PasswordReset.findOneAndDelete({ userId });

      res.status(200).json({
        ok: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;

    const user = await SocialUsers.findById(id ?? userId).populate({
      path: 'friends',
      select: '-password',
    });

    if (!user) {
      return res.status(200).send({
        message: 'User Not Found',
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'auth error',
      success: false,
      error: error.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, location, profileUrl, profession } = req.body;

    if (!(firstName || lastName || location || profession || profileUrl)) {
      next('Please provide all required fields');
      return;
    }

    const { userId } = req.body.user;

    const updateUser = {
      firstName,
      lastName,
      location,
      profileUrl,
      profession,
      _id: userId,
    };
    const user = await SocialUsers.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    await user.populate({ path: 'friends', select: '-password' });
    const token = createJWT(user?._id);

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: 'User updated successfully',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const friendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;

    const { requestTo } = req.body;

    const requestExist = await FriendRequest.findOne({
      requestFrom: userId,
      requestTo,
    });

    if (requestExist) {
      next('Friend Request already sent.');
      return;
    }

    const accountExist = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    if (accountExist) {
      next('Friend Request already sent.');
      return;
    }

    const newRes = await FriendRequest.create({
      requestTo,
      requestFrom: userId,
    });

    res.status(201).json({
      success: true,
      message: 'Friend Request sent successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'auth error',
      success: false,
      error: error.message,
    });
  }
};

const getFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const request = await FriendRequest.find({
      requestTo: userId,
      requestStatus: 'Pending',
    })
      .populate({
        path: 'requestFrom',
        select: 'firstName lastName profileUrl profession -password',
      })
      .limit(10)
      .sort({
        _id: -1,
      });

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'auth error',
      success: false,
      error: error.message,
    });
  }
};

const acceptRequest = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const { rid, status } = req.body;

    const requestExist = await FriendRequest.findById(rid);

    if (!requestExist) {
      next('No Friend Request Found.');
      return;
    }

    const newRes = await FriendRequest.findByIdAndUpdate(
      { _id: rid },
      { requestStatus: status }
    );

    if (status === 'Accepted') {
      const user = await SocialUsers.findById(id);

      user.friends.push(newRes?.requestFrom);

      await user.save();

      const friend = await SocialUsers.findById(newRes?.requestFrom);

      friend.friends.push(newRes?.requestTo);

      await friend.save();
    }

    res.status(201).json({
      success: true,
      message: 'Friend Request ' + status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'auth error',
      success: false,
      error: error.message,
    });
  }
};

const profileViews = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;

    const user = await SocialUsers.findById(id);

    user.views.push(userId);

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'auth error',
      success: false,
      error: error.message,
    });
  }
};

const suggestedFriends = async (req, res) => {
  try {
    const { userId } = req.body.user;

    let queryObject = {};

    queryObject._id = { $ne: userId };

    queryObject.friends = { $nin: userId };

    let queryResult = SocialUsers.find(queryObject)
      .limit(15)
      .select('firstName lastName profileUrl profession -password');

    const suggestedFriends = await queryResult;

    res.status(200).json({
      success: true,
      data: suggestedFriends,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const socConExp = {
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  changePassword,
  getUser,
  updateUser,
  friendRequest,
  getFriendRequest,
  acceptRequest,
  profileViews,
  suggestedFriends,
};
module.exports = socConExp;
