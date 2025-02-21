import { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router';
import cn from 'classnames';

export const AuthLayout = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <div className='flex items-center justify-center h-screen bg-tertiary'>
      <div className='w-full h-full flex lg:max-w-[60rem] lg:max-h-[40rem] lg:rounded-2xl lg:overflow-hidden'>
        <div
          className={cn('h-full transition-all duration-300', {
            'grow-1 bg-white': location.pathname === '/signin',
            'grow-2 bg-secondary': location.pathname === '/signup',
          })}
        >
          <Link to='/signin'>Signin</Link>
        </div>

        <div
          className={cn('h-full transition-all duration-300', {
            'grow-2 bg-secondary': location.pathname === '/signin',
            'grow-1 bg-white': location.pathname === '/signup',
          })}
        >
          <Link to='/signup'>Signup</Link>
        </div>
      </div>
    </div>
    // <div className='flex items-center justify-center h-screen bg-tertiary'>
    //   <div className='w-full h-full lg:max-w-[60rem] lg:max-h-[40rem] lg:rounded-2xl lg:overflow-hidden'>
    //     <Outlet />
    //   </div>
    // </div>
  );
};
