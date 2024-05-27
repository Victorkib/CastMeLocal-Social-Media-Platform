const express = require('express');
const userController = require('../controllers/NamsControllers/userController');
const router = express.Router();

router.get('/getallusers', userController.viewAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/viewuser', userController.viewUser);
router.post('/deleteuser', userController.deleteUser);

module.exports = router;
