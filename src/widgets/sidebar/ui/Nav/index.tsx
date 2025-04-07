import { NavLink } from 'react-router';
import cn from 'classnames';

import style from './style.module.css';

export const Nav = () => {
  return (
    <nav>
      <ul className='text-nowrap'>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(style.navLink, { [style.navLinkActive]: isActive })
            }
            to='/edit'
          >
            Start Coding
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(style.navLink, { [style.navLinkActive]: isActive })
            }
            to='/'
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(style.navLink, { [style.navLinkActive]: isActive })
            }
            to='/explore'
          >
            Explore
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
