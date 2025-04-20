import { createContext, useContext, useState, ReactNode } from 'react';

import { Cursor } from './types';

type CollabState = {
  roomId: string | null;
  connectedUsers: string[];
  isCreator: boolean;
  userCursor: Cursor | null;
  cursors: Cursor[];
};

type CollabContextValue = {
  collabValues: CollabState;
  setCollabValue: <K extends keyof CollabState>(
    field: K,
    value: CollabState[K]
  ) => void;
};

const CollabContext = createContext<CollabContextValue | null>(null);

export const CollabProvider = ({ children }: { children: ReactNode }) => {
  const [collabValues, setCollabValues] = useState<CollabState>({
    roomId: null,
    connectedUsers: [],
    isCreator: false,
    userCursor: null,
    cursors: [],
  });

  const setCollabValue = <K extends keyof CollabState>(
    field: K,
    value: CollabState[K]
  ) => {
    setCollabValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <CollabContext.Provider value={{ collabValues, setCollabValue }}>
      {children}
    </CollabContext.Provider>
  );
};

export const useCollab = () => {
  const context = useContext(CollabContext);

  if (!context) {
    throw new Error('useCollab must be used within an CollabProvider');
  }

  return context;
};
