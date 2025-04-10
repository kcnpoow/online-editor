import { FaHeart, FaCommentAlt, FaEye } from 'react-icons/fa';

import { Chip } from './Chip';
export const DraftCard = () => {
  return (
    <figure className='relative p-4 pb-2'>
      <div className='group peer relative z-10'>
        <img src='https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png' />
        <div className='flex items-center pt-2 mb-1'>
          {/* Avatar */}
          <div className='w-10 h-10 mr-2 bg-red-100 rounded-lg'></div>

          <div>
            <p className='font-extrabold'>Project Title</p>
            <p className='text-white/75'>Author Name</p>
          </div>
        </div>

        <div className='flex gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
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

      <div className='absolute top-8 left-8 right-0 bottom-8 bg-[#1E1F25] rounded-lg transition-all ease-in-out peer-hover:top-0 peer-hover:bottom-0 peer-hover:left-0'></div>
    </figure>
  );
};
