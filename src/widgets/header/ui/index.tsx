import { Search } from '@features/search';
import { Button } from '@shared/ui/button';

type Props = {
  isNavbarOpened: boolean;
  setIsNavbarOpened: () => void;
};

export const Header = ({ isNavbarOpened, setIsNavbarOpened }: Props) => {
  return (
    <header className='flex items-center gap-x-2 px-4 py-2 bg-black'>
      <button className='md:hidden' onClick={setIsNavbarOpened}>{isNavbarOpened ? '-' : '+'}</button>

      <Search />

      <div className='flex gap-x-2 ml-auto'>
        <Button variant='primary'>Sign In</Button>

        <Button variant='secondary'>Sign Up</Button>
      </div>
    </header>
  );
};
