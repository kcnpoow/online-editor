import { SelectHTMLAttributes } from 'react';
import cn from 'classnames';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  mode?: 'inline' | 'placeholder';
  className?: string;
};

export const Select = ({
  label,
  mode = 'inline',
  className,
  children,
  ...props
}: Props) => {
  return (
    <div className={cn({ 'flex items-center gap-4': mode === 'inline' })}>
      {mode === 'inline' && label && (
        <label className='text-white/80 whitespace-nowrap'>{label}</label>
      )}

      <select
        {...props}
        className={cn(
          'p-1 bg-secondary border-2 border-[#252830] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
          className
        )}
      >
        {mode === 'placeholder' && label && (
          <option value='' disabled selected hidden>
            {label}
          </option>
        )}
        {children}
      </select>
    </div>
  );
};
