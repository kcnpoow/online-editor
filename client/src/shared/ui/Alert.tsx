import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  variant: 'error' | 'info';
  children?: ReactNode;
  className?: string;
};

export const Alert = ({ variant, children, className }: Props) => {
  return (
    <div
      className={cn(
        'p-4 text-center rounded',
        {
          'text-white bg-red-400/60': variant === 'error',
          'text-yellow-300 bg-yellow-500/10': variant === 'info',
        },
        className
      )}
    >
      {children}
    </div>
  );
};
