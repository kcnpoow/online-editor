import { AutomergeDoc, EditorField } from '../model/types';
import { Change } from '@automerge/automerge';

import { socket } from '@shared/config/socket';

class CollabService {
  create(roomId: string, data: AutomergeDoc) {
    socket.emit('create', roomId, data);
  }

  join(roomId: string) {
    socket.emit('join', roomId);
  }

  update(roomId: string, changes: Uint8Array[]) {
    socket.emit('update', roomId, changes);
  }

  onSync(callback: (data: { field: EditorField; update: Uint8Array }) => void) {
    socket.on('sync', callback);
  }

  onUpdate(callback: (doc: any) => void) {
    socket.on('update', callback);
  }
}

export const collabService = new CollabService();
