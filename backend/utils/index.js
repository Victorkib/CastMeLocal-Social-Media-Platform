const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

exports.compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

// JSON WEBTOKEN
exports.createJWT = function (id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
};
