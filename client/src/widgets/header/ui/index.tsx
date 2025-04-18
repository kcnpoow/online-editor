import { Link } from 'react-router';

import { NavbarToggler } from './NavbarToggler';
import { Search } from '@features/search';
import { Button } from '@shared/ui/Button';
import { useAuth } from '@shared/hooks/useAuth';

type Props = {
  isNavbarOpened: boolean;
  toggleNavbar: () => void;
};

export const Header = ({ isNavbarOpened, toggleNavbar }: Props) => {
  const { user, setUser } = useAuth();

  return (
    <header className='flex items-center gap-x-2 px-4 py-2 bg-black border-b-1 border-[#252830] md:py-4'>
      <NavbarToggler
        isNavbarOpened={isNavbarOpened}
        toggleNavbar={toggleNavbar}
      />

      <Search />

      <div className='flex gap-x-2 ml-auto whitespace-nowrap'>
        {user ? (
          <Button
            className='max-md:p-2'
            color='secondary'
            onClick={() => setUser(null)}
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button
              className='max-md:p-2'
              color='primary'
              as={Link}
              to='/signup'
            >
              Sign Up
            </Button>

            <Button
              className='max-md:p-2'
              color='secondary'
              as={Link}
              to='/signin'
            >
              Sign In
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
