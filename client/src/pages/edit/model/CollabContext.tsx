import { createContext, useContext, useRef, useState } from 'react';
import * as am from '@automerge/automerge';

import { AutomergeDoc, Cursor } from './types';

export type CollabContextValue = {
  roomId: string;
  cursors: Cursor[];
  connectedUsers: string[];
  setRoomId: (id: string) => void;
  setCursors: (cursor: Cursor[]) => void;
  setConnectedUsers: (users: string[]) => void;
  docRef: React.MutableRefObject<am.Doc<AutomergeDoc> | null>;
};

const CollabContext = createContext<CollabContextValue | null>(null);

export const CollabProvider = ({ children }: { children: React.ReactNode }) => {
  const [roomId, setRoomId] = useState('');
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

  const docRef = useRef<am.Doc<AutomergeDoc> | null>(null);

  return (
    <CollabContext.Provider
      value={{
        roomId,
        cursors,
        connectedUsers,
        setRoomId,
        setCursors,
        setConnectedUsers,
        docRef,
      }}
    >
      {children}
    </CollabContext.Provider>
  );
};

export const useCollab = () => {
  const context = useContext(CollabContext);

  if (!context)
    throw new Error('useCollab must be used within a CollabProvider');

  return context;
};
