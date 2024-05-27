const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../../models/NamModels/user');

const userController = {
  registerUser: async (req, res) => {
    try {
      const reqUser = req.body.user;
      const existingUser = await User.findOne({
        $or: [
          { email: reqUser.email },
          { phone: reqUser.phone },
          { username: reqUser.username },
        ],
      });
      if (existingUser) {
        if (existingUser.email == reqUser.email) {
          return res.status(403).json({ error: 'Email exists' });
        }
        if (existingUser.phone == reqUser.phone) {
          return res.status(403).json({ error: 'Phone exists' });
        }
        if (existingUser.username == reqUser.username) {
          return res.status(403).json({ error: 'username exists' });
        }
      }
      let uniqueID = uuidv4();
      let exists = await User.findOne({ userId: uniqueID });
      while (exists) {
        uniqueID = uuidv4();
        exists = await User.findOne({ userId: uniqueID });
      }
      const hashedPassword = await bcrypt.hash(reqUser.password, 10);

      const user = {
        userId: uniqueID,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        phone: reqUser.phone,
        email: reqUser.email,
        username: reqUser.username,
        location: reqUser.location,
        dob: reqUser.dob,
        bio: reqUser.bio,
        gender: reqUser.gender,
        ethnicity: reqUser.ethnicity,
        followers: 0,
        following: 0,
        passwordHash: hashedPassword,
      };
      const newUser = new User(user);
      await newUser.save();
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = req.body.user;
      const userData = await User.findOne({ email: user.email });
      if (!userData) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      const passMatch = await bcrypt.compare(
        user.password,
        userData.passwordHash
      );
      console.log(passMatch);
      if (!passMatch) {
        return res.status(403).json({ error: 'Password mismatch' });
      }
      return res.status(200).json({ message: 'successful' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  viewUser: async (req, res) => {
    try {
      const user = req.body.user;
      const userData = await User.findOne({ userId: user.userId });
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ user: userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  viewAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      if (!users) {
        throw new Error('Error occurred while fetching users');
      }
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = req.body.user;
      const deletedUser = await User.findOneAndDelete({ userId: user.userId });
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'success' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = req.body.user;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  },
};

module.exports = userController;
