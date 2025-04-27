import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import cn from 'classnames';

import { DisplayMode, Mode } from '@features/display-mode';
import { Pagination } from '@features/pagination';
import { Draft, DraftCard, DraftRow } from '@entities/draft';
import { Select } from '@shared/ui/Select';
import { PagedResponse } from '@shared/types/types';
import { DraftSortValues } from '@shared/types/types';

type Props = {
  loadData: (
    query: string,
    page: number,
    size: number,
    sortBy: DraftSortValues
  ) => Promise<PagedResponse<Draft>>;
};

export const DraftList = ({ loadData }: Props) => {
  const [response, setResponse] = useState<PagedResponse<Draft>>();
  const [viewMode, setViewMode] = useState<Mode>('card');
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState<DraftSortValues>(
    DraftSortValues.CommentsCount
  );

  const [searchParams] = useSearchParams();

  const query = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      const result = await loadData(query || '', currentPage, 10, sortBy);

      setResponse(result);
    };

    fetchData();
  }, [currentPage, loadData, query, sortBy]);

  return (
    <div>
      {query && (
        <p className='mb-6 text-xl font-bold'>
          Found {response?.totalElements} drafts with name{' '}
          <span className='underline'>{query}</span>:
        </p>
      )}

      <div className='flex items-center gap-x-4 mb-8'>
        <Select
          label='Sort by'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as DraftSortValues)}
        >
          <option value={DraftSortValues.CommentsCount}>Comments</option>
          <option value={DraftSortValues.LikesCount}>Likes</option>
          <option value={DraftSortValues.ViewsCount}>Views</option>
          <option value={DraftSortValues.CreatedDate}>Creation Date</option>
        </Select>

        <DisplayMode
          mode={viewMode}
          onCardChange={() => setViewMode('card')}
          onRowChange={() => setViewMode('row')}
        />
      </div>

      {response && (
        <>
          <div
            className={cn('grid mb-8', {
              'grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6':
                viewMode === 'card',
              'gap-y-6': viewMode === 'row',
            })}
          >
            {response.content.map((draft) =>
              viewMode === 'card' ? (
                <DraftCard key={draft.id} draft={draft} />
              ) : (
                <DraftRow key={draft.id} draft={draft} />
              )
            )}
          </div>

          <div className='flex justify-center'>
            <Pagination
              page={response.page}
              totalElements={response.totalElements}
              totalPages={response.totalPages}
              last={response.last}
              onPageChange={(page: number) => setCurrentPage(page)}
              size={response.size}
            />
          </div>
        </>
      )}
    </div>
  );
};
