import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { DraftList, SortValues } from '@widgets/draft-list';
import { Mode } from '@features/display-mode';
import { Draft, draftApi } from '@entities/draft';

export const Explore = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [mode, setMode] = useState<Mode>('card');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('search');

  useEffect(() => {
    const loadDrafts = async () => {
      let result: Draft[];
      if (query) {
        result = await draftApi.searchDrafts(query);
      } else {
        result = await draftApi.getAllDrafts();
      }

      setDrafts(result);
    };

    loadDrafts();
  }, [searchParams]);

  return (
    <div className='container py-15'>
      {query && (
        <p className='mb-6 text-xl font-bold'>
          Search results for <span className='underline'>{query}</span>:
        </p>
      )}

      <DraftList
        drafts={drafts}
        mode={mode}
        onModeChange={(mode) => setMode(mode)}
        sortValue={SortValues.CommentsCount}
        onSortChange={() => {}}
      />
    </div>
  );
};
