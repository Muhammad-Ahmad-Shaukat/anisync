// ...existing imports and config
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import connectS3 from './config/aws_s3.js'; 
import path from 'path';
import removeSpoilers from './Scripts/removespoilers.js';

dotenv.config();
connectDB();
connectS3();
removeSpoilers();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const rooms = {}; // existing video sync rooms
const userSockets = {}; // NEW: userId -> socket.id

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('register-user', (userId) => {
    userSockets[userId] = socket.id;
    socket.data.userId = userId;
    console.log(`Registered socket for user: ${userId}`);
  });

  socket.on('send-message', ({ to, from, text }) => {
    const receiverSocketId = userSockets[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive-message', {
        from,
        text,
      });
    }
  });

  // WatchTogether events (unchanged)
  socket.on('join-room', ({ roomId, isHost }) => {
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.isHost = isHost;
    console.log(`User joined room: ${roomId} | Host: ${isHost}`);
  });

  socket.on('request-sync', ({ roomId }) => {
    const roomState = rooms[roomId];
    if (roomState) {
      io.to(socket.id).emit('sync-status', roomState);
    }
  });

  socket.on('video-event', ({ roomId, event }) => {
    const videoRoom = rooms[roomId] || {};
    if (event.type === 'play') {
      videoRoom.isPlaying = true;
      videoRoom.time = event.time;
    } else if (event.type === 'pause') {
      videoRoom.isPlaying = false;
      videoRoom.time = event.time;
    } else if (event.type === 'seek') {
      videoRoom.time = event.time;
    }
    rooms[roomId] = { ...videoRoom };
    socket.to(roomId).emit('sync-video', event);
  });

  socket.on('change-episode', ({ roomId, episode }) => {
    rooms[roomId] = {
      ...rooms[roomId],
      episode,
      time: 0,
      isPlaying: false
    };
    io.in(roomId).emit('sync-episode', episode);
  });

  socket.on('cancel-session', ({ roomId }) => {
    delete rooms[roomId];
    io.in(roomId).emit('session-ended');
    io.in(roomId).socketsLeave(roomId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const userId = socket.data.userId;
    if (userId) {
      delete userSockets[userId];
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
