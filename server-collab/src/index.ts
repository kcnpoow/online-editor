import { Server } from 'socket.io';
import * as am from '@automerge/automerge';

import { AutomergeDoc, EditorField, Room } from './types/collab';

const io = new Server({
  cors: {
    origin: '*',
  },
});

const rooms: Record<string, Room> = {};

io.on('connection', (socket) => {
  socket.on('create', (roomId: string, initialDoc: AutomergeDoc) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        users: [],
        cursors: [],
        doc: am.from(initialDoc),
      };

      socket.join(roomId);
    }
  });

  socket.on('join', (roomId: string) => {
    console.log(roomId);
  });

  socket.on('update', (roomId: string, changes) => {
    const room = rooms[roomId];

    if (room) {
      const [newDoc] = am.applyChanges(room.doc, changes);

      room.doc = newDoc;

      io.to(roomId).emit('update', newDoc);
    }
  });

  console.log(`User connected: ${socket.id}`);
});

const PORT = 2222;
io.listen(PORT);
console.log(`Socket.IO server running on port ${PORT}`);
