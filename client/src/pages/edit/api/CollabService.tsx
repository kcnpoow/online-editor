import { Cursor, EditorField } from '../model/types';
import { Change, Doc } from 'automerge';

import { socket } from '@shared/config/socket';

class CollabService {
  join(roomId: string) {
    socket.emit('join', roomId);
  }

  update(roomId: string, field: string, changes: Change[]) {
    socket.emit('update', roomId, field, changes);
  }

  onSync(callback: (data: { field: EditorField; update: Uint8Array }) => void) {
    socket.on('sync', callback);
  }

  onUpdate(callback: (data: { field: EditorField; doc: any }) => void) {
    socket.on('update', callback);
  }
}

export const collabService = new CollabService();
