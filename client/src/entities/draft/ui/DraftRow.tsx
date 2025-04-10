import { Link } from 'react-router';
import { FaHeart, FaCommentAlt, FaEye } from 'react-icons/fa';

import { Chip } from './Chip';

export const DraftRow = () => {
  return (
    <Link
      className='flex items-center p-3 bg-secondary rounded-lg hover:bg-[#25262d]'
      to='#'
    >
      {/* Avatar */}
      <div>
        <div className='w-10 h-10 mr-4 bg-red-100 rounded-lg'></div>
      </div>
      <div className='flex flex-1 items-center'>
        <div>
          <p>Title</p>
          <p className='text-white/75 text-sm'>Username</p>
        </div>

        <div className='flex gap-x-2 ml-auto'>
          <Chip>
            <FaHeart /> 0
          </Chip>
          <Chip>
            <FaCommentAlt /> 0
          </Chip>
          <Chip>
            <FaEye /> 0
          </Chip>
        </div>
      </div>
    </Link>
  );
};
