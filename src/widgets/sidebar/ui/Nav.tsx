import { Link } from 'react-router';

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li className='hover:bg-red-400'>
          <Link className='px-4 py-2 block' to='/edit'>Start Coding</Link>
        </li>
        <li className='px-4.5 py-1.5 hover:bg-red-400'>Search Drafts</li>
      </ul>
    </nav>
  );
};
