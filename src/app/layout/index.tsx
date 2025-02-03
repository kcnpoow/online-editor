import { useState } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@widgets/header';
import { Sidebar } from '@widgets/sidebar';
import { Footer } from '@widgets/footer/ui';

export const Layout = () => {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpened((prevState) => !prevState);
  };

  return (
    <div className='flex min-h-dvh text-white'>
      <Sidebar isNavbarOpened={isNavbarOpened} />

      <div className='flex flex-col grow'>
        <Header isNavbarOpened={isNavbarOpened} setIsNavbarOpened={toggleNavbar} />

        <main className='grow px-4 bg-primary'>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
