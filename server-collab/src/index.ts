import { Server } from 'socket.io';
import automerge from 'automerge';

import { EditorField, Room } from './types/Collab';

const io = new Server({
  cors: {
    origin: '*',
  },
});

const rooms: Record<string, Room> = {};

io.on('connection', (socket) => {
  let currentRoom = '';
  let currentUser = '';

  socket.on('join', (roomId) => {
    currentRoom = roomId;
    currentUser = socket.id;

    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: [currentUser],
        cursors: [],
        editors: {
          html: automerge.init(),
          css: automerge.init(),
          js: automerge.init(),
        },
      };
    }

    socket.join(currentRoom);
  });

  socket.on(
    'update',
    (roomId: string, field: EditorField, changes: automerge.Change[]) => {
      const room = rooms[roomId];

      if (room) {
        let doc = room.editors[field];

        doc = automerge.applyChanges(doc, changes);

        room.editors[field] = doc;

        io.to(roomId).emit('update', { field, doc });
      }
    }
  );

  console.log(`User connected: ${socket.id}`);
});

const PORT = 2222;
io.listen(PORT);
console.log(`Socket.IO server running on port ${PORT}`);
