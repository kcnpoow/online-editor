import { useContext } from 'react';

import { EditContext, EditContextValues } from '../model/EditContext';

export const useEdit = () => {

  return useContext<EditContextValues>(EditContext);
};
