import cn from 'classnames';

import { Nav } from './Nav';

type Props = {
  isNavbarOpened: boolean;
};

export const Sidebar = ({ isNavbarOpened }: Props) => {
  return (
    <aside className='border-r-1 border-[#252830]'>
      <div
        className={cn(
          'absolute top-[53px] z-50 left-4 py-2 bg-secondary transition-all duration-200 ease-out origin-top-left md:hidden',
          isNavbarOpened
            ? 'scale-100 opacity-100 visible'
            : 'scale-75 opacity-0 invisible'
        )}
      >
        <Nav />
      </div>

      <div className='h-full py-2 bg-secondary max-md:hidden'>
        <Nav />
      </div>
    </aside>
  );
};
