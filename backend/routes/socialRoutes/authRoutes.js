const express = require('express');
const {
  login,
  register,
  logout,
} = require('../../controllers/socialControllers/socialAuthController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
