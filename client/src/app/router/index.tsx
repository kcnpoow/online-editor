import { Routes, Route } from 'react-router';

import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '@app/layout/MainLayout';
import { AuthLayout } from '@app/layout/AuthLayout';
import { Home } from '@pages/home';
import { Edit } from '@pages/edit';
import { UserDetails } from '@pages/user-details';
import { DraftDetails } from '@pages/draft-details';
import { Explore } from '@pages/explore';
import { Signin } from '@pages/signin';
import { Signup } from '@pages/signup';

export const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='users/:userId' element={<UserDetails />} />
        <Route path='draft/:draftId' element={<DraftDetails />} />
        <Route path='explore' element={<Explore />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route
          path='signin'
          element={
            <ProtectedRoute>
              <Signin />
            </ProtectedRoute>
          }
        />
        <Route
          path='signup'
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path='edit' element={<Edit />} />
    </Routes>
  );
};
