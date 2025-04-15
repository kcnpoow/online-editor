import { socket } from '@shared/config/socket';

class CollabApi {
  joinRoom(roomId: string) {
    socket.emit('join-room', roomId);
  }

  leaveRoom(roomId: string) {
    socket.emit('leave-room', roomId);
  }
}

export const collabApi = new CollabApi();
