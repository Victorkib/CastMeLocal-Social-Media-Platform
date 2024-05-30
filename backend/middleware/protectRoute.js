const jwt = require('jsonwebtoken');
// const ChatUser = require('../models/user.model');
const SocialUsers = require('../models/socialModels/userSocialModel');

const protectRoute = async (req, res, next) => {
  try {
    // Check for JWT token in cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No Token Provided' });
    }

    // Verify the token using JWT secret
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    // Find the user associated with the decoded user ID
    const user = await SocialUsers.findById(decoded.userId).select('-password'); // Exclude password from user object

    if (!user) {
      return res.status(404).json({ error: 'User not foundww' });
    }

    // Attach the user object to the request object for further use
    req.user = user;

    next();
  } catch (error) {
    console.log('Error in protectRoute middleware: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = protectRoute;
