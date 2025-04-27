import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { User, userApi } from '@entities/user';
import { Draft, draftApi, DraftCard } from '@entities/draft';
import { useAuth } from '@shared/hooks/useAuth';
import { Avatar } from '@shared/ui/Avatar';

export const UserDetails = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const { userId } = useParams();
  const { user } = useAuth();

  const loadDrafts = async () => {
    if (userId) {
      const result = await draftApi.getDraftsByUserId(userId);

      setDrafts(result);
    }
  };

  const loadUserDetails = async () => {
    if (userId) {
      const result = await userApi.getUser(userId);

      setUserDetails(result);
    }
  };

  useEffect(() => {
    loadDrafts();
    loadUserDetails();
  }, [userId]);

  if (!userDetails) {
    return;
  }

  return (
    <>
      <section className='text-center bg-cover bg-black bg-[url(https://cpwebassets.codepen.io/assets/packs/profile-bg-optimized-a5ca8f46aca292507f629c62b09630ad.svg)]'>
        <div className='flex flex-col items-center justify-center py-12'>
          <h1 className='mb-4 text-5xl text-center'>{userDetails.username}</h1>

          <Avatar
            className='w-40 h-40 text-4xl border-4 border-[#2c303a] rounded-xl'
            username={userDetails.username}
          />
        </div>
      </section>

      <section className='max-w-7xl mx-auto px-8 pt-8'>
        <div className='mb-5 bg-[#2c303a] border-t-4 border-[#5a5f73] p-2.5 font-bold'>
          Drafts
        </div>

        <div
          className={
            'grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6'
          }
        >
          {drafts.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
              deletable={user?.id === draft.user.id}
              onDelete={loadDrafts}
            />
          ))}
        </div>
      </section>
    </>
  );
};
