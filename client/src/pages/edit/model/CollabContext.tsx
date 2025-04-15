import { createContext, useContext, useState } from 'react';

import { Cursor } from './types';

export type CollabContextValue = {
  roomId: string;
  connectedUsers: string[];
  cursors: Cursor[];
  setRoomId: (id: string) => void;
  setConnectedUsers: (users: string[]) => void;
  setCursors: (cursor: Cursor[]) => void;
};

const CollabContext = createContext<CollabContextValue | null>(null);

export const CollabProvider = ({ children }: { children: React.ReactNode }) => {
  const [roomId, setRoomId] = useState('');
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [cursors, setCursors] = useState<Cursor[]>([]);

  return (
    <CollabContext.Provider
      value={{
        roomId,
        connectedUsers,
        cursors,
        setRoomId,
        setConnectedUsers,
        setCursors,
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
