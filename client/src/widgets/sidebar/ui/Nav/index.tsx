import { NavLink, useParams } from 'react-router';
import cn from 'classnames';

import style from './style.module.css';
import { useAuth } from '@shared/hooks/useAuth';
import { Divider } from '@shared/ui/Divider';

export const Nav = () => {
  const { userId } = useParams();

  const { user } = useAuth();

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

        {user && (
          <>
            <Divider className='my-4 text-[#252830]' />

            <li>
              <NavLink
                className={({ isActive }) =>
                  cn(style.navLink, {
                    [style.navLinkActive]: isActive && user.id == userId,
                  })
                }
                to={'/users/' + user.id}
              >
                My Drafts
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  cn(style.navLink, {
                    [style.navLinkActive]: isActive,
                  })
                }
                to={'/favorite/' + user.id}
              >
                Favorite
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
