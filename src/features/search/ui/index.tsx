import { FaSearch } from 'react-icons/fa';

import { Input } from '@shared/ui/Input';

export const Search = () => {
  return (
    <Input
      className='max-w-72 h-full py-2 font-semibold'
      placeholder='Search Draft...'
      icon={<FaSearch color='' />}
    />
  );
};
