import { Link } from 'react-router';
import { Comment } from '../model';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@shared/ui/Avatar';

type Props = {
  comment: Comment;
};

export const CommentRow = ({ comment }: Props) => {
  const profileLink = `/users/${comment.user.id}`;

  return (
    <div className='flex flex-wrap p-4 bg-[#2C303A] rounded-lg not-last:mb-6'>
      <div>
        <Avatar className='mr-4 mb-2' username={comment.user.username} />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center mb-3'>
          <Link to={profileLink} className='font-bold hover:underline mr-2'>
            {comment.user.username}
          </Link>

          {comment.user.id === comment.project.user.id && (
            <span className='py-1 px-2 text-black text-sm bg-yellow-400 font-semibold rounded-full'>
              Owner
            </span>
          )}

          <span className='ml-auto text-white/50 text-sm'>
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        <p className='text-white break-words whitespace-pre-wrap'>
          {comment.content}
        </p>
      </div>
    </div>
  );
};
