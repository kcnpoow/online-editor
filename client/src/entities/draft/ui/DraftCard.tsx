import { Link } from 'react-router';
import { FaHeart, FaCommentAlt, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { VscEyeClosed } from 'react-icons/vsc';

import { Chip } from './Chip';
import { ViewProps } from '../model';
import { MouseEvent } from 'react';
import { draftApi } from '../api';
import { Avatar } from '@shared/ui/Avatar';

export const DraftCard = ({ draft, deletable, onDelete }: ViewProps) => {
  const handleDeleteClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (draft.id) await draftApi.deleteDraft(draft.id);

    onDelete?.();
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    // Fallback to a default image when the main image fails to load
    e.currentTarget.src =
      'https://assets.codepen.io/416221/internal/screenshots/pens/PlMnOq.custom.png'; // Replace with your fallback image URL
  };

  return (
    <Link
      className='relative p-4 pb-2 cursor-pointer'
      to={`/draft/${draft.id}`}
    >
      <div className='group peer relative z-10'>
        <img
          src={`http://localhost:8080${draft.screenshotUrl}`}
          onError={handleImageError} // Fallback on error
          alt='Draft screenshot'
        />

        <div className='flex items-center pt-2 mb-1'>
          <Avatar
            className='!w-10 !h-10 mr-2 bg-red-100 rounded-lg'
            username={draft.user.username}
          />

          <div>
            <p className='font-extrabold'>{draft.projectName}</p>
            <p className='text-white/75'>{draft.user.username}</p>
          </div>

          {draft.privateFlag && (
            <div
              className='absolute top-2 right-2 p-2 bg-[#515564] rounded-full'
              title='Draft is private'
            >
              <VscEyeClosed size={20} />
            </div>
          )}
        </div>

        <div className='flex gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
          <Chip>
            <FaHeart /> 0
          </Chip>
          <Chip>
            <FaCommentAlt /> {draft.commentsCount}
          </Chip>
          <Chip>
            <FaEye /> 0
          </Chip>

          {deletable && (
            <button className='ml-auto' onClick={handleDeleteClick}>
              <Chip>
                <MdDelete className='text-red-400' size={20} />
              </Chip>
            </button>
          )}
        </div>
      </div>

      <div className='absolute top-8 left-8 right-0 bottom-8 bg-[#1E1F25] rounded-lg transition-all ease-in-out peer-hover:top-0 peer-hover:bottom-0 peer-hover:left-0'></div>
    </Link>
  );
};
