import { useContext } from 'react';

import { EditContext, EditContextValues } from '@pages/edit';

export const useEdit = () => {
  return useContext<EditContextValues>(EditContext);
};
