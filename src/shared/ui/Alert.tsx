import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
  variant: 'error';
  children?: ReactNode;
  className?: string;
};

export const Alert = ({ variant, children, className }: Props) => {
  return (
    <div
      className={cn(
        'p-4 text-center rounded',
        {
          'text-white bg-red-400': variant === 'error',
        },
        className
      )}
    >
      {children}
    </div>
  );
};
