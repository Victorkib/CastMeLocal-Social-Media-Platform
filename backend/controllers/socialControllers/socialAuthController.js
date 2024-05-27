const SocialUsers = require('../../models/socialModels/userSocialModel.js');
//const generateTokenAndSetCookie = require('../../utils/generateToken.js');
const { hashString, createJWT } = require('../../utils/index.js');
const { sendVerificationEmail } = require('../../utils/sendEmail.js');

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
      .json({ success: false, message: 'Provide Required Fields!' });
  }

  try {
    const userExist = await SocialUsers.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: 'Email Address already exists' });
    }

    const hashedPassword = await hashString(password);
    const profilePic =
      gender === 'male'
        ? `https://avatar.iran.liara.run/public/boy?username=${firstName}`
        : `https://avatar.iran.liara.run/public/girl?username=${firstName}`;

    const user = await SocialUsers.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    console.log('Registered user:', user);

    // Send verification email to the user
    // const emailResult = await sendVerificationEmail(user);
    // if (!emailResult.success) {
    //   return res.status(500).json({
    //     success: false,
    //     message: emailResult.error,
    //     emailMessage: emailResult.emailMessage,
    //   });
    // }

    // Exclude the password from the user object
    user.password = undefined;

    // success: true,
    // message: 'User registered successfully',
    // emailMessage: emailResult.emailMessage,

    const token = createJWT(user._id);

    // Generate JWT token
    // generateTokenAndSetCookie(user._id, res);
    // await user.save();
    res
      .status(201)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        //sameSite: 'none',
        //secure: true,
      })
      .json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/* Login */
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide user credentials' });
  }

  try {
    // Find user by email
    const user = await SocialUsers.findOne({ email })
      .select('+password') // Include password field
      .populate({
        path: 'friends',
        select: 'firstName lastName location profileUrl -password',
      });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message:
          'User email is not verified. Check your email account and verify your email',
      });
    }

    // Compare password
    const isMatch = await compareString(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });
    }

    user.password = undefined; // Exclude password from response

    const token = createJWT(user._id);
    //generateTokenAndSetCookie(user._id, res);

    res
      .status(200)
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        //sameSite: 'none',
        //secure: true,
      })
      .json({
        success: true,
        message: 'Login successfully',
        user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//module.exports = { register, login }; // Export both functions
