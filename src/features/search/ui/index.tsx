import { Input } from '@shared/ui/input';

export const Search = () => {
  return (
    <Input
      className='max-w-72 py-2 font-semibold'
      placeholder='Search Draft'
      icon={<img src='images/search.svg' />}
    />
  );
};
