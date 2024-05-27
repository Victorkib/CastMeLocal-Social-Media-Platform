const JWT = require('jsonwebtoken'); // Require JWT library

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    // Added space after Bearer
    return next('Authentication failed'); // Use return for cleaner error handling
  }

  const token = authHeader?.split(' ')[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.log(error);
    return next('Authentication failed'); // Use return for cleaner error handling
  }
};

module.exports = userAuth;
