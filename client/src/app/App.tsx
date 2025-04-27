import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import './styles/global.css';

import { Router } from './router';
import { useAuth } from '@shared/hooks/useAuth';
import { authApi } from '@shared/api/AuthApi';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const { setUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const auth = async () => {
      try {
        const result = await authApi.auth();

        setUser(result);
      } finally {
        setIsLoading(false);
      }
    };

    auth();
  }, []);

  if (isLoading) {
    return 'Загрузка';
  }

  return <Router />;
};
