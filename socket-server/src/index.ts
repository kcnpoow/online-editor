import { Server } from 'socket.io';
import * as Y from 'yjs';
import puppeteer from 'puppeteer';

import { Cursor, Room } from './types/сollab';
import { getRandomColor } from './lib/getRandomColor';
import { generateRoomId } from './lib/generateRoomId';

const SERVER_URL = 'http://localhost:8080';

const io = new Server({
  cors: {
    origin: '*',
  },
});

const rooms: Record<string, Room> = {};

io.on('connection', (socket) => {
  let currentRoom = '';
  let currentUser = '';

  socket.on('create-room', (html: string, css: string, js: string) => {
    const roomId = generateRoomId();

    currentUser = socket.id;
    currentRoom = roomId;

    if (!rooms[currentRoom]) {
      const doc = new Y.Doc();

      const yHtml = doc.getText('html');
      const yCss = doc.getText('css');
      const yJs = doc.getText('js');

      yHtml.insert(0, html);
      yCss.insert(0, css);
      yJs.insert(0, js);

      rooms[roomId] = {
        creator: currentUser,
        connectedUsers: [currentUser],
        cursors: {},
        doc,
        colors: { [currentUser]: getRandomColor() },
      };
    }

    socket.join(currentRoom);

    io.to(currentRoom).emit('create-room', currentRoom);

    console.log(`${currentUser} created room: ${currentRoom}`);
  });

  socket.on('join-room', (roomId: string) => {
    const room = rooms[roomId];

    if (!room) return;

    currentUser = socket.id;
    currentRoom = roomId;

    socket.join(currentRoom);

    room.connectedUsers.push(currentUser);
    room.colors[currentUser] = getRandomColor();

    const update = Y.encodeStateAsUpdate(room.doc);
    socket.emit('join-room', roomId, update);

    console.log(`${currentUser} joined room: ${currentRoom}`);
  });

  socket.on('leave-room', () => {
    console.log(`${currentUser} left room: ${currentRoom}`);

    socket.leave(currentRoom);

    currentRoom = '';
    currentUser = '';
  });

  socket.on('update', (update: Uint8Array) => {
    const room = rooms[currentRoom];

    if (!room) return;

    Y.applyUpdate(room.doc, update);

    socket.to(currentRoom).emit('update', update);
  });

  socket.on('cursor-move', (cursor: Cursor) => {
    const room = rooms[currentRoom];

    if (!room || !cursor) return;

    if (cursor.selection) {
      room.cursors[cursor.user] = {
        ...cursor,
        color: room.colors[cursor.user],
      };
    } else {
      delete room.cursors[cursor.user];
    }

    io.to(currentRoom).emit('cursor-move', Object.values(room.cursors));
  });

  socket.on('disconnect', () => {
    const room = rooms[currentRoom];

    if (room) {
      console.log(`${currentUser} disconnected from room: ${currentRoom}`);

      room.connectedUsers = room.connectedUsers.filter(
        (id) => id !== currentUser
      );

      delete room.colors[currentUser];
      delete room.cursors[currentUser];

      io.to(currentRoom).emit('cursor-move', Object.values(room.cursors));

      if (room.connectedUsers.length === 0) {
        delete rooms[currentRoom];
        console.log(`Room ${currentRoom} deleted as it became empty`);
      }
    }

    socket.leave(currentRoom);

    currentRoom = '';
    currentUser = '';
  });

  // Comments
  socket.on('join-comments', (draftId: string) => {
    socket.join(draftId);
  });

  socket.on('new-comment', async (draftId: string) => {
    socket.to(draftId).emit('new-comment');
  });

  console.log(`User connected: ${socket.id}`);
});

const PORT = 3333;
io.listen(PORT);
console.log(`Server running on port ${PORT}`);
