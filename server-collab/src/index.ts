import { Server } from 'socket.io';
import { Cursor, Room } from './types/Collab';

const rooms: Record<string, Room> = {};

const io = new Server({
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: [],
        cursors: {},
      };
    }

    rooms[roomId].users.push(socket.id);

    console.log(`👥 ${socket.id} joined room: ${roomId}`);
  });

  socket.on('leave-room', (roomId: string) => {
    socket.leave(roomId);

    const room = rooms[roomId];
    if (room) {
      room.users = room.users.filter((id) => id !== socket.id);
      delete room.cursors[socket.id];

      if (room.users.length === 0) {
        delete rooms[roomId];
        console.log(`🧹 Room ${roomId} deleted (empty).`);
      }
    }

    console.log(`🚪 ${socket.id} left room: ${roomId}`);
  });

  socket.on('cursor-move', (roomId: string, cursor: Cursor) => {
    const room = rooms[roomId];
    if (!room) return;

    room.cursors[cursor.user] = cursor;

    // Broadcast updated cursor positions to all in the room
    io.to(roomId).emit('cursor-move', Object.values(room.cursors));
  });

  socket.on('text-change', (roomId: string, field: string, text: string) => {
    io.to(roomId).emit('text-change', field, text);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);

    // Clean up the user from all rooms
    for (const [roomId, room] of Object.entries(rooms)) {
      const wasInRoom = room.users.includes(socket.id);
      if (wasInRoom) {
        room.users = room.users.filter((id) => id !== socket.id);
        delete room.cursors[socket.id];

        io.to(roomId).emit('cursor-move', Object.values(room.cursors));

        if (room.users.length === 0) {
          delete rooms[roomId];
          console.log(`🧹 Room ${roomId} deleted (empty).`);
        }

        console.log(`👋 ${socket.id} removed from room: ${roomId}`);
      }
    }
  });
});

const PORT = 3000;
io.listen(PORT);
console.log(`🚀 Server is running on http://localhost:${PORT}`);
