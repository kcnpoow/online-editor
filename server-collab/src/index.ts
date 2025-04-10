import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room: ${roomId}`);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`${socket.id} left room: ${roomId}`);
  });

  socket.on('text-change', ({ roomId, text, field }) => {
    io.to(roomId).emit('text-change', { text, field });
  });
});

const PORT = 3000;
io.listen(PORT);
