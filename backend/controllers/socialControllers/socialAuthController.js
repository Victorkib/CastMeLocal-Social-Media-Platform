const SocialUsers = require('../../models/socialModels/userSocialModel.js');
const { isEmail, isStrongPassword } = require('validator');
const {
  hashString,
  createJWT,
  compareString,
} = require('../../utils/index.js');
const { sendVerificationEmail } = require('../../utils/sendEmail.js');
const maxAge = 3 * 24 * 60 * 60;

/* Register */
module.exports.register = async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body;
  console.log('DataFromReq.body:', {
    firstName,
    lastName,
    email,
    password,
    gender,
  });

  // Validate fields
  if (!firstName || !lastName || !email || !password || !gender) {
    return res
      .status(400)
      .json({ success: false, error: 'Provide Required Fields!' });
  }

  // Validate correct Email
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid email format' });
  }

  // Validate strong password
  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    const error =
      'Password must contain:\n - At least one lowercase letter (a-z)\n - At least one uppercase letter (A-Z)\n - At least one number (0-9)\n - At least one special character (!@#$%^&*)';
    return res.status(400).json({ success: false, error });
  }

  try {
    const userExist = await SocialUsers.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, error: 'Email address already exists' });
    }

    const hashedPassword = await hashString(password);
    const profilePic =
      gender === 'male'
        ? `https://avatar.iran.liara.run/public/boy?username=${firstName}`
        : `https://avatar.iran.liara.run/public/girl?username=${firstName}`;

    const regUser = await SocialUsers.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    console.log('Registered user:', regUser);

    // Send verification email to the user
    // const emailResult = await sendVerificationEmail(regUser);
    // if (!emailResult.success) {
    //   return res.status(500).json({
    //     success: false,
    //     message: emailResult.error,
    //     emailMessage: emailResult.emailMessage,
    //   });
    // }

    // Exclude the password from the user object
    regUser.password = undefined;

    // Generate JWT token
    const token = createJWT(regUser._id);

    res
      .status(201)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: 'none', // Allows cross-site requests
        secure: true, // Ensures the cookie is only sent over HTTPS
      })
      .json({
        success: true,
        message: 'Registered successfully',
        regUser,
        token,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

/* Login */
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: 'Please provide user credentials' });
  }

  try {
    // Find user by email
    const regUser = await SocialUsers.findOne({ email })
      .select('+password') // Include password field
      .populate({
        path: 'friends',
        select: 'firstName lastName location profileUrl -password',
      });

    if (!regUser) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid email or password' });
    }

    // if (!regUser.verified) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'User email is not verified. Check your email account and verify your email',
    //   });
    // }

    // Compare password
    const isMatch = await compareString(password, regUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid email or password' });
    }

    regUser.password = undefined; // Exclude password from response

    const token = createJWT(regUser._id);

    res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: 'none', // Allows cross-site requests
        secure: true, // Ensures the cookie is only sent over HTTPS
      })
      .json({
        success: true,
        message: 'Login successfully',
        regUser,
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Logout controller
module.exports.logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
