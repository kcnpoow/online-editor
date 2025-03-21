import { Link } from 'react-router';
import { FaGithub } from 'react-icons/fa';

import { Logo } from '@shared/ui/Logo';

export const Footer = () => {
  return (
    <footer className='flex justify-between items-center px-4 py-10 bg-black'>
      <Logo className='font-bold text-2xl' />

      <div className='flex items-center'>
        <Link className='flex items-center mr-3' to='/'>
          <FaGithub className='text-2xl mr-2' /> kcnpoow
        </Link>
        
        <span className='-mb-1 text-sm text-white/50'>© 2025</span>
      </div>
    </footer>
  );
};
