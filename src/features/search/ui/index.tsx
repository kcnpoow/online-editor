import { FaSearch } from 'react-icons/fa';

import { Input } from '@shared/ui/Input';

export const Search = () => {
  return (
    <Input
      className='h-full font-semibold text-sm'
      containerClassName='w-full h-full max-w-80'
      placeholder='Search Draft...'
      icon={<FaSearch />}
      type='text'
    />
  );
};
