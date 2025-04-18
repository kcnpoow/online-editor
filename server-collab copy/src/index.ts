import { Server } from 'socket.io';
import { Cursor, Editor, EditorField, Room } from './types/Collab';

const rooms: Record<string, Room> = {};

const io = new Server({
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('create-room', (roomId: string, editor: Editor) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        htmlCode: editor.htmlCode,
        cssCode: editor.cssCode,
        jsCode: editor.jsCode,
        users: [],
        cursors: {},
      };
    }

    socket.join(roomId);

    if (!rooms[roomId].users.includes(socket.id)) {
      rooms[roomId].users.push(socket.id);
    }

    console.log(`${socket.id} created room: ${roomId}`);
  });

  socket.on('join-room', (roomId: string) => {
    const room = rooms[roomId];

    if (room) {
      socket.join(roomId);

      if (!room.users.includes(socket.id)) {
        room.users.push(socket.id);
      }

      // Send the current editor content to the joining user
      socket.emit('join-room', {
        htmlCode: room.htmlCode,
        cssCode: room.cssCode,
        jsCode: room.jsCode,
      });

      // Send current cursor positions
      socket.emit('cursor-move', Object.values(room.cursors));

      console.log(`${socket.id} joined room: ${roomId}`);
    }
  });

  socket.on(
    'text-change',
    (roomId: string, { field, text }: { field: EditorField; text: string }) => {
      if (rooms[roomId]) {
        switch (field) {
          case 'html':
            rooms[roomId].htmlCode = text;
            break;
          case 'css':
            rooms[roomId].cssCode = text;
            break;
          case 'js':
            rooms[roomId].jsCode = text;
            break;
        }
      }

      io.to(roomId).emit('text-change', { field, text });
    }
  );

  socket.on('cursor-move', (roomId: string, cursor: Cursor) => {
    const room = rooms[roomId];

    if (!room) return;

    room.cursors[cursor.user] = cursor;

    io.to(roomId).emit('cursor-move', Object.values(room.cursors));
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    for (const roomId in rooms) {
      const room = rooms[roomId];

      // Remove user from room
      room.users = room.users.filter((id) => id !== socket.id);

      // Remove user's cursor
      delete room.cursors[socket.id];

      // Remove room if empty
      if (room.users.length === 0) {
        delete rooms[roomId];
        console.log(`Deleted empty room: ${roomId}`);
      }
    }
  });
});

const PORT = 2222;
io.listen(PORT);
console.log(`Socket.IO server running on port ${PORT}`);
