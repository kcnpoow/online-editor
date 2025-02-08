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
        <Button variant='primary'>Sign Up</Button>

        <Button variant='secondary'>Sign In</Button>
      </div>
    </header>
  );
};
