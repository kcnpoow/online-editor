import { useState } from 'react';
import cn from 'classnames';

import { DisplayMode, Mode } from '@features/display-mode';
import { DraftCard, DraftRow } from '@entities/draft';
import { data } from '../test/data';

export const Explore = () => {
  const [mode, setMode] = useState<Mode>('card');

  return (
    <div className='container'>
      <DisplayMode
        className='mb-4'
        mode={mode}
        onCardChange={() => setMode('card')}
        onRowChange={() => setMode('row')}
      />

      <div
        className={cn('grid', {
          'grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6':
            mode === 'card',
          'gap-y-6': mode === 'row',
        })}
      >
        {data.map((draft) => (mode === 'card' ? <DraftCard /> : <DraftRow />))}
      </div>
    </div>
  );
};
