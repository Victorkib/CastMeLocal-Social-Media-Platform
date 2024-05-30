const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const errorMiddleware = require('./middleware/errorMiddleware.js');

// Import routes
const authRoutes = require('./routes/auth.routes.js');
const messageRoutes = require('./routes/message.routes.js');
const chatUserRoutes = require('./routes/user.routes.js');
const MapUsers = require('./routes/user.routes.js');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const mediaRoutes = require('./routes/mediaRoutes.js');
const SocialRouter = require('./routes/socialRoutes/index.js');

const connectToMongoDB = require('./db/connectToMongoDB.js');
const { app, server } = require('./socket/socket.js');

const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'https://castmelocal-frontend.onrender.com',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);
app.use(morgan('dev'));

// Route setup
// CastMelocal Route setup
app.use('/castmelocal/api/users', userRoutes);
app.use('/castmelocal/api/posts', postRoutes);
app.use('/castmelocal/api/media', mediaRoutes);

/* Chat Routes */
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', chatUserRoutes);
app.use('/api/mapUsers', MapUsers);

/* Full-Social-Media Routes */
app.use('/api/socials', SocialRouter);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Error middleware
app.use(errorMiddleware);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
