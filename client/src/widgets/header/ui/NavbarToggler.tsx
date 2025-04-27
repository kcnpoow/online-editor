import cn from 'classnames';

type Props = {
  isNavbarOpened: boolean;
  toggleNavbar: () => void;
};

export const NavbarToggler = ({ isNavbarOpened, toggleNavbar }: Props) => {
  return (
    <button
      className='relative pl-1.5 pr-3 h-full bg-[#5A5F73] rounded-sm md:hidden'
      onClick={toggleNavbar}
    >
      <span
        className={cn(
          'block mb-1 h-0.5 bg-white rounded-sm',
          isNavbarOpened ? 'w-2.5' : 'w-1.5'
        )}
      />
      <span
        className={cn(
          'block mb-1 h-0.5 bg-white rounded-sm',
          isNavbarOpened ? 'w-1.5' : 'w-2.5'
        )}
      />
      <span className='block w-4.5 h-0.5 bg-white rounded-sm' />

      <img
        className={cn(
          'absolute top-2.5 right-1.5 size-3.5 transition-transform',
          {
            '-scale-100': isNavbarOpened,
          }
        )}
        src='/images/arrow.svg'
      />
    </button>
  );
};
