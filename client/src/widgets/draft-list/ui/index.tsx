import cn from 'classnames';

import { SortValues } from '../model';
import { DisplayMode, Mode } from '@features/display-mode';
import { Draft, DraftCard, DraftRow } from '@entities/draft';
import { Select } from '@shared/ui/Select';

type Props = {
  drafts: Draft[];
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  sortValue: SortValues;
  onSortChange: (value: string) => void;
};

export const DraftList = ({
  drafts,
  mode,
  onModeChange,
  sortValue,
  onSortChange,
}: Props) => {
  return (
    <div>
      <div className='flex items-center gap-x-4 mb-8'>
        <Select
          label='Sort by'
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value={SortValues.CommentsCount}>Amount of Comments</option>
          <option value={SortValues.LikesCount}>Amount of Likes</option>
          <option value={SortValues.ViewsCount}>Amount of Views</option>
          <option value={SortValues.CreatedDate}>Creation Date</option>
        </Select>

        <DisplayMode
          mode={mode}
          onCardChange={() => onModeChange('card')}
          onRowChange={() => onModeChange('row')}
        />
      </div>

      <div
        className={cn('grid', {
          'grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6':
            mode === 'card',
          'gap-y-6': mode === 'row',
        })}
      >
        {drafts.map((draft) =>
          mode === 'card' ? (
            <DraftCard key={draft.id} draft={draft} />
          ) : (
            <DraftRow key={draft.id} draft={draft} />
          )
        )}
      </div>
    </div>
  );
};
