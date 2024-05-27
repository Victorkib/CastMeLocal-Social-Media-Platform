const jwt = require('jsonwebtoken'); // Use require for CommonJS modules

const generateTokenAndSetCookie = (userId, res) => {
  // Ensure JWT secret is defined in environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // Expires in 15 days
  });

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Milliseconds for 15 days
    httpOnly: true, // Prevent client-side JavaScript access (XSS)
    // sameSite: 'strict', // Mitigate CSRF attacks
    secure: process.env.NODE_ENV !== 'development', // Only use secure for production (HTTPS)
  });
};

module.exports = generateTokenAndSetCookie; // Export the function
