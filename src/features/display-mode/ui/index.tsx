import { FaBars, FaBorderAll } from 'react-icons/fa6';
import cn from 'classnames';

import { Mode } from '../model';

type Props = {
  mode: Mode;
  onCardChange: () => void;
  onRowChange: () => void;
  className?: string;
};

export const DisplayMode = ({
  mode,
  onCardChange,
  onRowChange,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'inline-flex align-middle bg-secondary rounded-md overflow-hidden',
        className
      )}
    >
      <div className={cn({ 'bg-tertiary': mode === 'card' })}>
        <input
          className='hidden'
          id='card'
          type='radio'
          name='mode'
          checked={mode === 'card'}
          onChange={onCardChange}
        />
        <label className='block p-2 cursor-pointer' htmlFor='card'>
          <FaBorderAll />
        </label>
      </div>

      <div className={cn({ 'bg-tertiary': mode === 'row' })}>
        <input
          className='hidden'
          id='row'
          type='radio'
          name='mode'
          checked={mode === 'row'}
          onChange={onRowChange}
        />
        <label className='block p-2 cursor-pointer' htmlFor='row'>
          <FaBars />
        </label>
      </div>
    </div>
  );
};
