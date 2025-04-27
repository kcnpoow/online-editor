import { FormEvent, useState } from 'react';
import cn from 'classnames';

import { Draft } from '@entities/draft';
import { useAuth } from '@shared/hooks/useAuth';
import { Button } from '@shared/ui/Button';
import { socket } from '@shared/config/socket';
import { Comment, commentApi } from '@entities/comment';

const MAX_COMMENT_LENGTH = 3000;

type Props = { draft: Draft; onCommentSend: (newComment: Comment) => void };

export const CommentInput = ({ draft, onCommentSend }: Props) => {
  const [comment, setComment] = useState('');

  const { user } = useAuth();

  const isCommentValidLength = comment.length <= MAX_COMMENT_LENGTH;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const text = comment.trim();

    if (draft.id && user?.id && text.length > 0) {
      try {
        const newComment = await commentApi.createComment(
          draft.id,
          user.id,
          text
        );

        setComment('');

        onCommentSend(newComment);

        socket.emit('new-comment', draft.id);
      } catch {}
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className='w-full p-4 bg-secondary border-2 border-[#252830] rounded-lg resize-none focus-within:outline-none'
        placeholder='Write your thoughts...'
        rows={4}
        autoComplete='off'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className='flex'>
        <span
          className={cn('ml-auto', {
            'text-white/75': isCommentValidLength,
            'text-red-500': !isCommentValidLength,
          })}
        >
          {comment.length} / {MAX_COMMENT_LENGTH} symbols
        </span>
      </div>

      <Button
        className='mb-8'
        color='primary'
        disabled={!isCommentValidLength}
        type='submit'
      >
        Send Comment
      </Button>
    </form>
  );
};
