import { Link } from 'react-router';
import cn from 'classnames';

import { Nav } from './Nav';

type Props = {
  isNavbarOpened: boolean;
};

export const Sidebar = ({ isNavbarOpened }: Props) => {
  return (
    <aside>
      <div
        className={cn(
          'absolute top-[53px] bg-secondary transition-all duration-200 ease-out origin-top-left md:hidden',
          isNavbarOpened
            ? 'scale-100 opacity-100 visible'
            : 'scale-75 opacity-0 invisible'
        )}
      >
        <Nav />
      </div>

      <div className='h-full py-4 bg-secondary max-md:hidden'>
        <Nav />
      </div>
    </aside>
  );
};
