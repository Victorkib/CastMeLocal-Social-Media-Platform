// socket.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://castmelocal-frontend.onrender.com/',
    ], // Replace with your frontend's URL
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// User socket map to track connected users
const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  // Broadcast online users to all connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', (reason) => {
    console.log(`user disconnected ${socket.id}, reason: ${reason}`);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

const getReceiverSocketId = (userId) => userSocketMap[userId];

module.exports = { app, io, server, getReceiverSocketId }; // Export the entire server setup including getReceiverSocketId
