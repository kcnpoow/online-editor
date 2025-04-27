import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { useAuth } from '@shared/hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
