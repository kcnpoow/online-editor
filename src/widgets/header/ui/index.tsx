import { Link } from 'react-router';

import { NavbarToggler } from './NavbarToggler';
import { Search } from '@features/search';
import { Button } from '@shared/ui/Button';

type Props = {
  isNavbarOpened: boolean;
  toggleNavbar: () => void;
};

export const Header = ({ isNavbarOpened, toggleNavbar }: Props) => {
  return (
    <header className='flex items-center gap-x-2 px-4 py-2 bg-black md:py-4'>
      <NavbarToggler
        isNavbarOpened={isNavbarOpened}
        toggleNavbar={toggleNavbar}
      />

      <Search />

      <div className='flex gap-x-2 ml-auto'>
        <Button color='primary' as={Link} to='/signup'>
          Sign Up
        </Button>

        <Button color='secondary' as={Link} to='/signin'>
          Sign In
        </Button>
      </div>
    </header>
  );
};
