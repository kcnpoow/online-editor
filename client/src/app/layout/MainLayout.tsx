import { useState } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@widgets/header';
import { Sidebar } from '@widgets/sidebar';
import { Footer } from '@widgets/footer/ui';

export const MainLayout = () => {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpened((prevState) => !prevState);
  };

  return (
    <div className='flex min-h-screen text-white'>
      <Sidebar isNavbarOpened={isNavbarOpened} />

      <div className='flex flex-col grow'>
        <Header isNavbarOpened={isNavbarOpened} toggleNavbar={toggleNavbar} />

        <main className='grow py-12 bg-primary'>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
