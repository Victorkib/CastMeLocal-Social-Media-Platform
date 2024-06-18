const nodemailer = require('nodemailer');
const Mailjet = require('node-mailjet');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const { hashString } = require('./index.js');
const Verification = require('../models/socialModels/emailVerification.js');
const PasswordReset = require('../models/socialModels/PasswordReset.js');

dotenv.config();

const {
  AUTH_EMAIL,
  AUTH_PASSWORD,
  CL_URL,
  MAILJET_API_KEY,
  MAILJET_SECRET_KEY,
} = process.env;

let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

const mailjet = new Mailjet({
  apiKey: MAILJET_API_KEY || 'your-api-key',
  apiSecret: MAILJET_SECRET_KEY || 'your-api-secret',
});

async function sendMailjetEmail(mailOptions) {
  try {
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: mailOptions.from,
            Name: 'CastMelocal',
          },
          To: [
            {
              Email: mailOptions.to,
              Name: mailOptions.toName || '',
            },
          ],
          Subject: mailOptions.subject,
          HTMLPart: mailOptions.html,
        },
      ],
    });
    return request.body;
  } catch (error) {
    console.error('Mailjet error:', error);
    throw new Error('Mailjet email sending failed');
  }
}

async function sendNodemailerEmail(mailOptions) {
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Nodemailer error:', error);
    throw new Error('Nodemailer email sending failed');
  }
}

exports.sendVerificationEmail = async (regUser) => {
  const { _id, email, lastName } = regUser;
  const token = _id + uuidv4();
  const link = `https://castmelocal-frontend.onrender.com/verifylink/${_id}/${token}`; //cl_URL is the hosted endpoint
  //http://localhost:5173/api/socials/users/verify/ + _id + '/' + token
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: 'Email Verification',
    html: `
      <div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
        <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
        <hr>
        <h4>Hi ${lastName},</h4>
        <p>
          Through Email Verification, we are able to know that it's really you 🧑.
          <br>
          This link <b>expires in 1 hour</b>
        </p>
        <br>
        <a href=${link} style="color: #fff; padding: 14px; text-decoration: none; background-color: #000; border-radius: 8px; font-size: 18px;">Verify Email Address</a>
        </p>
        <div style="margin-top: 20px;">
          <h5>Best Regards</h5>
          <h5>CastMELocal Team</h5>
        </div>
      </div>`,
  };

  try {
    const hashedToken = await hashString(token);

    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    if (newVerifiedEmail) {
      try {
        await sendMailjetEmail(mailOptions);
        return { success: true, emailMessage: 'Email sent' };
      } catch (error) {
        console.log('Mailjet failed, falling back to Nodemailer');
        await sendNodemailerEmail(mailOptions);
        return { success: true, emailMessage: 'Email sent' }; // Assuming Nodemailer succeeded
      }
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Failed to send verification email' };
  }
};
/*Reset Password Link */
exports.resetPasswordLink = async (user) => {
  const { _id, email } = user;
  const token = _id + uuidv4();
  const link = `${CL_URL}/api/socials/users/reset-password/${_id}/${token}`;

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: 'Password Reset',
    html: `
      <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
        Password reset link. Please click the link below to reset password.
        <br>
        <p style="font-size: 18px;"><b>This link expires in 10 minutes</b></p>
        <br>
        <a href=${link} style="color: #fff; padding: 10px; text-decoration: none; background-color: #000; border-radius: 8px; font-size: 18px;">Reset Password</a>.
      </p>`,
  };

  try {
    const hashedToken = await hashString(token);

    const resetEmail = await PasswordReset.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    if (resetEmail) {
      try {
        await sendMailjetEmail(mailOptions);
      } catch (error) {
        console.log('Mailjet failed, falling back to Nodemailer');
        await sendNodemailerEmail(mailOptions);
      }
      return { success: true };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Failed to send reset password email' };
  }
};
