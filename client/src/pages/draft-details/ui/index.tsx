import { Link, useParams, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

import { CommentInput } from './CommentInput';
import { DraftEmbed } from '@widgets/draft-embed';
import { Draft, draftApi } from '@entities/draft';
import { commentApi, Comment, CommentRow } from '@entities/comment';
import { Alert } from '@shared/ui/Alert';
import { socket } from '@shared/config/socket';
import { useAuth } from '@shared/hooks/useAuth';

export const DraftDetails = () => {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const { user } = useAuth();
  const { draftId } = useParams();
  const [searchParams] = useSearchParams();

  const loadComments = async () => {
    if (!draft || !draft.id) return;

    const result = await commentApi.getComments(draft.id);

    setComments(result);
  };

  const loadDraft = async () => {
    if (!draftId) return;

    const result = await draftApi.getDraft(draftId, searchParams.get('key'));
    setDraft(result);
  };

  useEffect(() => {
    loadDraft();
  }, [draftId]);

  useEffect(() => {
    if (draft && !draft.privateFlag) {
      socket.emit('join-comments', draft.id);
    }

    loadComments();

    socket.on('new-comment', loadComments);

    return () => {
      socket.off('new-comment', loadComments);
    };
  }, [draft]);

  if (!draft) {
    return;
  }

  return (
    <div className='container max-w-300 py-15'>
      <DraftEmbed draft={draft} />

      {draft.privateFlag && (
        <Alert className='mt-8' variant='info'>
          This is a private draft. Only you can see it
        </Alert>
      )}

      <div className='max-w-175 mx-auto mt-8'>
        {!draft.privateFlag &&
          (user ? (
            <CommentInput
              draft={draft}
              onCommentSend={(newComment) =>
                setComments((prev) => [newComment, ...prev])
              }
            />
          ) : (
            <div className='w-full p-6 mb-8 text-center bg-secondary border-2 border-[#252830] rounded-lg'>
              To leave comments, please{' '}
              <Link className='underline' to='/signin'>
                sign in
              </Link>
              .
            </div>
          ))}

        {comments.map((comment) => (
          <CommentRow key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
