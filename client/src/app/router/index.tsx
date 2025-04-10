import { Routes, Route } from 'react-router';

import { MainLayout } from '@app/layout/MainLayout';
import { AuthLayout } from '@app/layout/AuthLayout';
import { Home } from '@pages/home';
import { Edit } from '@pages/edit';
import { Explore } from '@pages/explore';
import { Signin } from '@pages/signin';
import { Signup } from '@pages/signup';

export const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='explore' element={<Explore />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
      </Route>

      <Route path='edit' element={<Edit />} />
    </Routes>
  );
};
