import { useContext } from 'react';

import { EditContext, EditContextValues } from '../model';

export const useEdit = () => {
  return useContext<EditContextValues>(EditContext);
};
