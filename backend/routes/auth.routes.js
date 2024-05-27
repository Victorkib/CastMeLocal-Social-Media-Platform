const express = require('express');

const router = express.Router();
const { signup, login, logout } = require('../controllers/auth.controller.js');

// Define routes using imported functions
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router; // Export the router object
