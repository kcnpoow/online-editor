import { createContext, ReactNode, useState } from 'react';

import { User } from '@entities/user';

export type AuthContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
