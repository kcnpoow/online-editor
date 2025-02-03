import { Link } from 'react-router';

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li className='px-4 hover:bg-red-400'>
          <Link to='/edit'>START CODING</Link>
        </li>
        <li className='px-4 hover:bg-red-400'>Search Drafts</li>
      </ul>
    </nav>
  );
};
