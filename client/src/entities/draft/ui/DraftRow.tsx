import { Link } from 'react-router';
import { FaHeart, FaCommentAlt, FaEye } from 'react-icons/fa';
import { Avatar } from '@shared/ui/Avatar';
import { Chip } from './Chip';
import { ViewProps } from '../model';
import { VscEyeClosed } from 'react-icons/vsc';

export const DraftRow = ({ draft, deletable, onDelete }: ViewProps) => {
  return (
    <Link
      className='flex items-center p-3 bg-secondary rounded-lg hover:bg-[#25262d]'
      to={`/draft/${draft.id}`}
    >
      <div className='mr-4'>
        <Avatar
          className='!w-10 !h-10 bg-red-100 rounded-lg'
          username={draft.user.username}
        />
      </div>

      <div className='flex flex-1 items-center'>
        <div>
          <p className='font-bold'>{draft.projectName}</p>
          <p className='text-white/75 text-sm'>{draft.user.username}</p>
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

        {/* Private Flag */}
        {draft.privateFlag && (
          <div
            className='ml-2 p-2 bg-[#515564] rounded-full'
            title='Draft is private'
          >
            <VscEyeClosed size={20} />
          </div>
        )}
      </div>
    </Link>
  );
};
