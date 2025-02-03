import { Routes, Route } from 'react-router';

import { Layout } from '@app/layout';
import { Edit } from '@pages/edit';

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<>Home</>} />
      </Route>

      <Route path='edit' element={<Edit />} />
    </Routes>
  );
};
