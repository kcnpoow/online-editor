import { DraftList } from '@widgets/draft-list';
import { draftApi } from '@entities/draft';

export const Explore = () => {
  return (
    <div className='container py-15'>
      <DraftList
        loadData={draftApi.searchDrafts} // Pass the searchDrafts API directly
      />
    </div>
  );
};
