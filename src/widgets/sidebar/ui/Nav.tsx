import { Link } from 'react-router';

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li className='hover:bg-red-400'>
          <Link className='px-8 py-2 block' to='/edit'>
            Start Coding
          </Link>
        </li>
      </ul>
    </nav>
  );
};
