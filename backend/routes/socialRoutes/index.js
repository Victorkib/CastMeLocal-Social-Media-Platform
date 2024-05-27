const express = require('express');
const authRoute = require('./authRoutes.js');
const userRoute = require('./userRoutes.js');
const postRoute = require('./postRoutes.js');

const SocialRouter = express.Router();

SocialRouter.use('/auth', authRoute); //auth/register
SocialRouter.use('/users', userRoute);
SocialRouter.use('/posts', postRoute);

module.exports = SocialRouter;
