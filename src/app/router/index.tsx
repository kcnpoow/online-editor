import { Routes, Route } from 'react-router';

import { MainLayout } from '@app/layout/MainLayout';
import { AuthLayout } from '@app/layout/AuthLayout';
import { Edit } from '@pages/edit';
import { Signin } from '@pages/signin';
import { Signup } from '@pages/signup';

export const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<>Home</>} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
      </Route>
      
      <Route path='edit' element={<Edit />} />
    </Routes>
  );
};
